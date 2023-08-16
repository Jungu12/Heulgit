package morningrolecall.heulgit.notification.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.NoResultException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.NotificationException;
import morningrolecall.heulgit.notification.domain.Notification;
import morningrolecall.heulgit.notification.domain.NotificationType;
import morningrolecall.heulgit.notification.domain.dto.NotificationFollowRequest;
import morningrolecall.heulgit.notification.domain.dto.NotificationLikeRequest;
import morningrolecall.heulgit.notification.domain.dto.NotificationMapper;
import morningrolecall.heulgit.notification.domain.dto.NotificationCommentRequest;
import morningrolecall.heulgit.notification.repository.EmitterRepositoryImpl;
import morningrolecall.heulgit.notification.domain.dto.NotificationResponse;
import morningrolecall.heulgit.notification.repository.NotificationRepository;
import morningrolecall.heulgit.relation.repository.RelationRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class NotificationService {

	private final NotificationRepository notificationRepository;
	private final UserRepository userRepository;
	private final NotificationMapper notificationMapper;
	private final EmitterRepositoryImpl emitterRepository;
	private final RelationRepository relationRepository;
	private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	public SseEmitter connect(String githubId, String lastEventId) {

		String emitterId = githubId + "_" + System.currentTimeMillis();
		SseEmitter emitter;
		// 버그 방지용 코드
		if (emitterRepository.findAllEmitterStartWithByGithubId(githubId) != null) {
			emitterRepository.deleteAllEmitterStartWithGithubId(githubId);
			emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
		} else {
			emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
		}
		//요청 종류별 연결 취소 처리
		//네트워크 오류
		emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
		//시간 초과
		emitter.onTimeout(()-> emitterRepository.deleteById(emitterId));
		//오류
		emitter.onError((e)-> emitterRepository.deleteById(emitterId));

		//503에러를 방지하기 위한 더미 이벤트 전송
		String eventId = githubId + "_" + System.currentTimeMillis();
		sendNotification(emitter, eventId, emitterId, "EventStream Created. [gitHubId=" +githubId + "]");

		// 클라이언트가 미수신한 Event 목록이 존재할 경우 전송하여 Event 유실을 예방
		if(hasLostData(lastEventId)) {
			sendLostData(lastEventId,githubId,emitterId,emitter);
		}
		return emitter;
	}



	//단순 알림 전송
	private void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data) {

		try{
			emitter.send(SseEmitter.event()
				.id(eventId)
				.name("sse")
				.data(data, MediaType.APPLICATION_JSON));
		} catch (IOException e){
			emitterRepository.deleteById(emitterId);
			emitter.completeWithError(e);
		}
	}

	private boolean hasLostData(String lastEventId) {
		return !lastEventId.isEmpty();
	}

	// 유실된 데이터 다시 전송
	private void sendLostData(String lastEventId, String githubId, String emitterId, SseEmitter emitter) {

		Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByGithubId(githubId);
		eventCaches.entrySet().stream()
			.filter(entry -> lastEventId.compareTo(entry.getKey())<0)
			.forEach(entry -> sendNotification(emitter, entry.getKey(), emitterId, entry.getValue()));
	}

	// 서버에서 클라이언트로 일방적인 데이터 보내기

	//특정 유저에게 알림 전송
	public void send(NotificationResponse notificationResponse){
		Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByGithubId(notificationResponse.getReceiver().getGithubId());
		sseEmitters.forEach(
			(key, emitter) ->{
				// 데이터 캐시 저장(유실된 데이터 처리하기 위함)
				emitterRepository.saveEventCache(key,notificationResponse);
				sendToClient(emitter,key, notificationResponse);
			}
		);
		logger.debug("알림 전송");
	}

	// public void sendList(){
	//
	// }
	//알림 전송
	private void sendToClient(SseEmitter emitter, String id, Object data) {
		try{
			emitter.send(SseEmitter.event()
				.id(id)
				.name("sse")
				.data(data, MediaType.APPLICATION_JSON)
				.reconnectTime(0));
		} catch (Exception exception) {
			emitterRepository.deleteById(id);
			emitter.completeWithError(exception);
		}
	}


	/**
	 * 컨트롤러에서 팔로우 정보를 받아 DB에 저장
	 * @param notificationFollowRequest
	 *
	 * */
	public void addFollowNotification(NotificationFollowRequest notificationFollowRequest) {
		logger.debug("addFollowNotification(), notificationFollowRequest = {}, ", notificationFollowRequest);
		User receiver = userRepository.findUserByGithubId(notificationFollowRequest.getReceiverId())
			.orElseThrow(() -> new NotificationException(ExceptionCode.USER_NOT_FOUND));

		User sender = userRepository.findUserByGithubId(notificationFollowRequest.getSenderId())
			.orElseThrow(() -> new NotificationException(ExceptionCode.USER_NOT_FOUND));
		if(!receiver.getGithubId().equals(sender.getGithubId())){
			Notification notification = Notification.builder()
				.sender(sender)
				.receiver(receiver)
				.createdDate(LocalDateTime.now())
				.hasRead(false)
				.type(NotificationType.FOLLOW)
				.build();
			notificationRepository.saveAndFlush(notification);
			send(notificationMapper.toFollowResponse(notification, false));

		}

	}

	/**
	 * 컨트롤러에서 좋아요 알림 정보를 받아 DB에 저장
	 * @param notificationLikeRequest
	 * */
	public void addLikeNotification(NotificationLikeRequest notificationLikeRequest) {
		try{
			logger.debug("addLikeNotification(), notificationLikeRequest = {}, ", notificationLikeRequest);
			User receiver = userRepository.findUserByGithubId(notificationLikeRequest.getWriterId())
				.orElseThrow(() -> new NotificationException(ExceptionCode.USER_NOT_FOUND));

			User sender = userRepository.findUserByGithubId(notificationLikeRequest.getSenderId())
				.orElseThrow(() -> new NotificationException(ExceptionCode.USER_NOT_FOUND));
			if(!receiver.getGithubId().equals(sender.getGithubId())){
				Notification notification = Notification.builder()
					.sender(sender).receiver(receiver)
					.createdDate(LocalDateTime.now())
					.hasRead(false)
					.type(NotificationType.LIKE)
					.relatedLink(notificationLikeRequest.getRelatedLink())
					.build();
				notificationRepository.saveAndFlush(notification);
				send(notificationMapper.toLikeResponse(notification));
			}

		} catch(NotificationException e){
			logger.debug("사용자가 우리서비스 사용자가 아님");

		}

		
	}

	/**
	 * 컨트롤러에서 댓글 정보를 받아 멘션,댓글 관련 알림 DB저장
	 * @param notificationCommentRequest
	 * */
	public void addCommentNotification(NotificationCommentRequest notificationCommentRequest) {
		logger.debug("addCommentNotification(),  ", notificationCommentRequest);
		// 댓글 사용자 찾기
		User sender = userRepository.findUserByGithubId(notificationCommentRequest.getSenderId())
			.orElseThrow(() -> new NotificationException(ExceptionCode.USER_NOT_FOUND));

		// // 멘션 처리 @뒤에 있는 문자열 띄어쓰기 전까지를 githubId로 인식
		// String text = notificationCommentRequest.getContent();
		// Pattern pattern = Pattern.compile("@(\\w+)");
		// Matcher matcher = pattern.matcher(text);
		logger.debug("mentionSize={}",notificationCommentRequest.getMentionedFollowers().size());
		for(String receiverId :notificationCommentRequest.getMentionedFollowers()){
			try{
				User reciever = userRepository.findUserByGithubId(receiverId)
					.orElseThrow(() -> new NotificationException(ExceptionCode.USER_NOT_FOUND));
				Notification notification = Notification.builder()
					.sender(sender)
					.receiver(reciever)
					.createdDate(LocalDateTime.now())
					.hasRead(false)
					.type(NotificationType.MENTION)
					.content(notificationCommentRequest.getContent())
					.relatedLink(notificationCommentRequest.getRelatedLink())
					.build();
				notificationRepository.saveAndFlush(notification);
				send(notificationMapper.toMentionResponse(notification));
			} catch (NotificationException e){
				logger.debug("멘션된 사용자가 서비스 사용자가 아님");
			}
		}
		//멘션된 사용자에게 보낼 알림을 모두 저장
		// while (matcher.find()) {
		// 	String receiverId = matcher.group().replaceAll("@", "");
			// 멘션된 사용자가 우리 서비스 사용자가 아니면 예외처리
			// 사용자이면 알림 저장
			// try {
			// 	User receiver = userRepository.findUserByGithubId(receiverId)
			// 		.orElseThrow(() -> new NotificationException(ExceptionCode.USER_NOT_FOUND));
			// 	Notification notification = Notification.builder()
			// 		.sender(sender)
			// 		.receiver(receiver)
			// 		.createdDate(LocalDateTime.now())
			// 		.hasRead(false)
			// 		.type(NotificationType.COMMENT)
			// 		.content(notificationCommentRequest.getContent())
			// 		.relatedLink(notificationCommentRequest.getRelatedLink())
			// 		.build();
			// 	notificationRepository.saveAndFlush(notification);
			// 	send(notificationMapper.toMentionResponse(notification));
			// } catch (NotificationException e) {
			// 	logger.debug("멘션된 사용자가 서비스 사용자가 아님");
			//
			// }

		// }
		try{
			// 게시글 작성자가 우리 서비스 사용자일 때 알림 전송
			User receiver = userRepository.findUserByGithubId(notificationCommentRequest.getWriterId())
				.orElseThrow(() -> new NoResultException());
			//댓글작성자가 게시글 작성자가 아닐 경우에 알림 전송
			if(!receiver.getGithubId().equals(sender.getGithubId())){
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
				send(notificationMapper.toCommentResponse(notification));

			}

		} catch (NoResultException e) {
			logger.debug("작성자가 서비스 사용자가 아님");

		}

	}

	/**
	 * 컨트롤러에서 댓글 정보를 받아 멘션,댓글 관련 알림 DB저장
	 * @param githubId
	 * @return notificationresponse 추상 클래스
	 * */
	public List<NotificationResponse> findNotification(String githubId) {
		logger.debug("findNotification(), githubId = {}, ", githubId);
		User receiver = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NotificationException(ExceptionCode.USER_NOT_FOUND));
		List<Notification> notifications = notificationRepository.findByReceiverOrderByCreatedDateDesc(receiver);

		List<NotificationResponse> notificationResponses = new ArrayList<>();
		for (Notification notification : notifications) {
			if (notification.getType() == NotificationType.COMMENT) {
				notificationResponses.add(notificationMapper.toCommentResponse(notification));
			} else if (notification.getType() == NotificationType.FOLLOW) {
				notificationResponses.add(notificationMapper.toFollowResponse(notification, relationRepository.existsByFromIdAndToId(receiver.getGithubId(),notification.getSender().getGithubId())));
			} else if (notification.getType() == NotificationType.LIKE) {
				notificationResponses.add(notificationMapper.toLikeResponse(notification));
			} else if (notification.getType() == NotificationType.MENTION) {
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
	public void changeNotificationState(Long notificationId,String githubId) {
		logger.debug("changeNotificationState(), notificationId = {}, ", notificationId);
		User user = userRepository.findUserByGithubId(githubId)
				.orElseThrow(()->new NotificationException(ExceptionCode.USER_NOT_FOUND));
		Notification notification = notificationRepository.findById(notificationId)
			.orElseThrow(()-> new NotificationException(ExceptionCode.NOTIFICATION_NOT_FOUND));
		if(!user.getGithubId().equals(notification.getReceiver().getGithubId())){
			throw new NotificationException(ExceptionCode.RECEIVER_USER_MISMATCH);
		}

		// if(user.getGithubId())
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
			.orElseThrow(() -> new NoResultException());
		return notificationRepository.countByReceiverAndHasReadFalse(receiver);
	}

}
