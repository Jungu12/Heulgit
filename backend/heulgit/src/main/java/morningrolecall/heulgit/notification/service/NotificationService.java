package morningrolecall.heulgit.notification.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.NoResultException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
// import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.notification.domain.Notification;
import morningrolecall.heulgit.notification.domain.NotificationType;
import morningrolecall.heulgit.notification.domain.dto.NotificationFollowRequest;
import morningrolecall.heulgit.notification.domain.dto.NotificationLikeRequest;
import morningrolecall.heulgit.notification.domain.dto.NotificationMapper;
import morningrolecall.heulgit.notification.domain.dto.NotificationCommentRequest;
import morningrolecall.heulgit.notification.repository.EmitterRepositoryImpl;
import morningrolecall.heulgit.notification.domain.dto.NotificationResponse;
import morningrolecall.heulgit.notification.repository.NotificationRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class NotificationService {

	private final NotificationRepository notificationRepository;
	private final UserRepository userRepository;
	private final NotificationMapper notificationMapper;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 컨트롤러에서 팔로우 정보를 받아 DB에 저장
	 * @param notificationFollowRequest
	 *
	 * */
	public void addFollowNotification(NotificationFollowRequest notificationFollowRequest){
		logger.debug("addFollowNotification(), notificationFollowRequest = {}, ", notificationFollowRequest);
		User receiver = userRepository.findUserByGithubId(notificationFollowRequest.getReceiverId())
			.orElseThrow(()-> new NoResultException());

		User sender = userRepository.findUserByGithubId(notificationFollowRequest.getSenderId())
			.orElseThrow(() -> new NoResultException());

		Notification notification = Notification.builder()
			.sender(sender)
			.receiver(receiver)
			.createdDate(LocalDateTime.now())
			.hasRead(false)
			.type(NotificationType.FOLLOW)
			.build();
		notificationRepository.saveAndFlush(notification);

	}

	/**
	 * 컨트롤러에서 좋아요 알림 정보를 받아 DB에 저장
	 * @param notificationLikeRequest
	 * */
	public void addLikeNotification(NotificationLikeRequest notificationLikeRequest){

		logger.debug("addLikeNotification(), notificationLikeRequest = {}, ", notificationLikeRequest);
		//게시글 작성자가 없으면 끝
		User receiver = userRepository.findUserByGithubId(notificationLikeRequest.getWriterId())
			.orElseThrow(()-> new NoResultException());

		User sender = userRepository.findUserByGithubId(notificationLikeRequest.getSenderId())
			.orElseThrow(() -> new NoResultException());

		Notification notification = Notification.builder()
			.sender(sender).receiver(receiver)
			.createdDate(LocalDateTime.now())
			.hasRead(false)
			.type(NotificationType.LIKE)
			.relatedLink(notificationLikeRequest.getRelatedLink())
			.build();
		notificationRepository.saveAndFlush(notification);
	}

	/**
	 * 컨트롤러에서 댓글 정보를 받아 멘션,댓글 관련 알림 DB저장
	 * @param notificationCommentRequest
	 * */
	public void addCommentNotification(NotificationCommentRequest notificationCommentRequest){
		logger.debug("addCommentNotification(), notificationCommentRequest = {}, ", notificationCommentRequest);
		// 댓글 사용자 찾기
		User sender = userRepository.findUserByGithubId(notificationCommentRequest.getSenderId())
			.orElseThrow(() -> new NoResultException());

		// 멘션 처리 @뒤에 있는 문자열 띄어쓰기 전까지를 githubId로 인식
		String text = notificationCommentRequest.getContent();
		Pattern pattern = Pattern.compile("@(\\w+)");
		Matcher matcher = pattern.matcher(text);

		
		//멘션된 사용자에게 보낼 알림을 모두 저장
		while(matcher.find()){
			String receiverId = matcher.group().replaceAll("@", "");
			// 멘션된 사용자가 우리 서비스 사용자가 아니면 예외처리
			// 사용자이면 알림 저장
			try{
				User receiver = userRepository.findUserByGithubId(receiverId)
					.orElseThrow(() -> new NoResultException());
				Notification notification = Notification.builder()
					.sender(sender)
					.receiver(receiver)
					.createdDate(LocalDateTime.now())
					.hasRead(false)
					.type(NotificationType.COMMENT)
					.content(notificationCommentRequest.getContent())
					.relatedLink(notificationCommentRequest.getRelatedLink())
					.build();
				notificationRepository.saveAndFlush(notification);
			} catch (NoResultException e) {
				logger.debug("멘션된 사용자가 서비스 사용자가 아님");

			}

		}
		// 게시글 작성자가 우리 서비스 사용자일 때 알림 전송
		User receiver = userRepository.findUserByGithubId(notificationCommentRequest.getWriterId())
			.orElseThrow(() -> new NoResultException());
		Notification notification = Notification.builder()
			.sender(sender)
			.receiver(receiver)
			.createdDate(LocalDateTime.now())
			.hasRead(false)
			.type(NotificationType.COMMENT)
			.content(notificationCommentRequest.getContent())
			.relatedLink(notificationCommentRequest.getRelatedLink())
			.build();
		notificationRepository.saveAndFlush(notification);
	}

	/**
	 * 컨트롤러에서 댓글 정보를 받아 멘션,댓글 관련 알림 DB저장
	 * @param githubId
	 * @return notificationresponse 추상 클래스
	 * */
	public List<NotificationResponse> findNotification(String githubId){
		logger.debug("findNotification(), githubId = {}, ", githubId);
		User receiver = userRepository.findUserByGithubId(githubId)
			.orElseThrow(()-> new NoResultException());
		List<Notification> notifications = notificationRepository.findByReceiverOrderByCreatedDateDesc(receiver);

		List<NotificationResponse> notificationResponses = new ArrayList<>();
		for (Notification notification : notifications) {
			if(notification.getType()==NotificationType.COMMENT){
				notificationResponses.add(notificationMapper.toCommentResponse(notification));
			} else if(notification.getType()==NotificationType.FOLLOW){
				/*TODO: senderId를 가지고
				   팔로우 여부를 확인하여 실제 값 넣기 */
				notificationResponses.add(notificationMapper.toFollowResponse(notification,false));
			} else if(notification.getType()==NotificationType.LIKE){
				notificationResponses.add(notificationMapper.toLikeResponse(notification));
			} else if(notification.getType()==NotificationType.MENTION){
				notificationResponses.add(notificationMapper.toMentionResponse(notification));
			}
		}
		return notificationResponses;
	}

	/**
	 * notificationId를 받아 읽지 않은 알림 읽음 처리
	 * @param notificationId
	 * */
	@Transactional
	public void changeNotificationState(Long notificationId){
		logger.debug("changeNotificationState(), notificationId = {}, ", notificationId);
		notificationRepository.updateHasReadById(notificationId);
	}
	/**
	 * 사용자의 githubId를 받아 읽지 않은 알림 개수 반환
	 * @param githubId
	 * @return Long 읽지 않은 알림 개수
	 * */
	public Long getUnreadNotificationCount(String githubId) {
		logger.debug("getUnreadNotificationCount(), githubId = {}, ", githubId);
		User receiver = userRepository.findUserByGithubId(githubId)
			.orElseThrow(()-> new NoResultException());
		return notificationRepository.countByReceiverAndHasReadFalse(receiver);
	}

}
