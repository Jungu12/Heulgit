package morningrolecall.heulgit.eureka.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.NoResultException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.eureka.domain.dto.EurekaCommentDto;
import morningrolecall.heulgit.eureka.domain.dto.EurekaCommentResponse;
import morningrolecall.heulgit.eureka.domain.dto.EurekaParentCommentDto;
import morningrolecall.heulgit.eureka.repository.EurekaCommentRepository;
import morningrolecall.heulgit.eureka.repository.EurekaRepository;
import morningrolecall.heulgit.exception.EurekaCommentException;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.heulgit.domain.dto.ParentCommentDto;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class EurekaCommentService {
	private final EurekaCommentRepository eurekaCommentRepository;
	private final EurekaRepository eurekaRepository;
	private final UserRepository userRepository;
	private final int SIZE = 20;

	/**
	 * 댓글 등록
	 * 1. 사용자 조회
	 * 2. 게시물 조회
	 * 3. 부모 댓글 조회
	 * 4. 댓글 생성
	 * 5. 댓글 저장
	 * */
	@Transactional
	public void addComment(String githubId, EurekaCommentDto eurekaCommentDto) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new EurekaCommentException(ExceptionCode.USER_NOT_FOUND));

		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaCommentDto.getEurekaId())
			.orElseThrow(() -> new EurekaCommentException(ExceptionCode.POST_NOT_FOUND));

		EurekaComment parentComment = null;
		if (eurekaCommentDto.getParentId() != null) {
			parentComment = eurekaCommentRepository.findEurekaCommentByCommentId(eurekaCommentDto.getParentId())
				.orElseThrow(() -> new EurekaCommentException(ExceptionCode.PARENT_COMMENT_NOT_FOUND));
		}

		EurekaComment eurekaComment = EurekaComment.builder()
			.eureka(eureka)
			.user(user)
			.content(eurekaCommentDto.getContent())
			.parentComment(parentComment)
			.build();

		eurekaCommentRepository.saveAndFlush(eurekaComment);

		eureka.addComment(eurekaComment);

		eurekaRepository.save(eureka);
	}

	/**
	 * 댓글 삭제
	 * 1. 사용자 및 댓글 조회
	 * 2. 사용자와 댓글 작성자 비교
	 * 3. 삭제
	 * */
	@Transactional
	public void removeComment(String githubId, Long commentId) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new EurekaCommentException(ExceptionCode.USER_NOT_FOUND));

		EurekaComment eurekaComment = eurekaCommentRepository.findEurekaCommentByCommentId(commentId)
			.orElseThrow(() -> new EurekaCommentException(ExceptionCode.PARENT_COMMENT_NOT_FOUND));

		if (!user.getGithubId().equals(eurekaComment.getUser().getGithubId())) {
			throw new EurekaCommentException(ExceptionCode.WRITER_USER_MISMATCH);
		}

		eurekaCommentRepository.delete(eurekaComment);
	}

	public List<EurekaComment> findComments(Long eurekaId) {
		return eurekaCommentRepository.findEurekaCommentsByEurekaOrderByUpdatedDateDesc(
			eurekaRepository.findEurekaByEurekaId(eurekaId)
				.orElseThrow(() -> new EurekaCommentException(ExceptionCode.POST_NOT_FOUND)));
	}
	/**
	 * 부모 댓글 조회
	 * */
	public Slice<EurekaParentCommentDto> findParentComments(Long eurekaId,int pages){
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(()-> new EurekaCommentException(ExceptionCode.POST_NOT_FOUND));

		Slice<Object []> comments = eurekaCommentRepository.findByEurekaAndParentCommentIsNull(eureka,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(comments),comments.getPageable(),comments.hasNext());

	}
	/**
	 * 자식 댓글 조회
	 * */
	public Slice<EurekaCommentResponse> findChildComments(Long eurekaId, Long parentId, int pages) {
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new EurekaCommentException(ExceptionCode.POST_NOT_FOUND));

		EurekaComment parent = eurekaCommentRepository.findEurekaCommentByCommentId(parentId)
			.orElseThrow(() -> new EurekaCommentException(ExceptionCode.PARENT_COMMENT_NOT_FOUND));

		Slice<EurekaComment> comments = eurekaCommentRepository.findChildCommentsByParentComment(parent,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));

		return new SliceImpl<>(toCommentResponse(comments), comments.getPageable(), comments.hasNext());
	}

	/**
	 * 1. 내가 Eureka에 단 댓글 조회
	 * 2. 페이지네이션 처리*/
	public Slice<EurekaComment> findMyComments(String githubId, int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new EurekaCommentException(ExceptionCode.USER_NOT_FOUND));
		Slice<EurekaComment> eurekaComments = eurekaCommentRepository.findEurekaCommentsByUserOrderByUpdatedDateDesc(user,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return  eurekaComments;
	}
	private List<EurekaParentCommentDto> toResponse(Slice< Object []> comments){
		return comments.getContent().stream().map(comment ->{
			EurekaComment ec = (EurekaComment) comment[0];
			Long childCount = (Long) comment[1];
			return EurekaParentCommentDto.builder()
				.rootComment(ec)
				.childCount(childCount)
				.build();
		}).collect(Collectors.toList());
	}

	private List<EurekaCommentResponse> toCommentResponse(Slice<EurekaComment> comments){
		return comments.getContent().stream().map(comment ->{
			return EurekaCommentResponse.builder()
				.comment_id(comment.getCommentId())
				.eurekaId(comment.getEureka().getEurekaId())
				.parentId(comment.getParentComment().getCommentId())
				.updatedDate(comment.getUpdatedDate())
				.content(comment.getContent())
				.user(comment.getUser())
				.build();
		}).collect(Collectors.toList());
	}
}
