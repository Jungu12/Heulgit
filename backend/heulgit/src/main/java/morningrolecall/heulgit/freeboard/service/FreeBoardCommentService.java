package morningrolecall.heulgit.freeboard.service;

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
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.FreeBoardException;
import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardCommentRequest;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardCommentResponse;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardParentCommentDto;
import morningrolecall.heulgit.freeboard.repository.FreeBoardCommentRepository;
import morningrolecall.heulgit.freeboard.repository.FreeBoardRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class FreeBoardCommentService {
	private final FreeBoardCommentRepository freeBoardCommentRepository;
	private final FreeBoardRepository freeBoardRepository;
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
	public void addComment(String githubId, FreeBoardCommentRequest freeBoardCommentRequest) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.USER_NOT_FOUND));

		FreeBoard freeBoard = freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardCommentRequest.getFreeBoardId())
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.POST_NOT_FOUND));

		FreeBoardComment parentComment = null;
		if (freeBoardCommentRequest.getParentId() != null) {
			parentComment = freeBoardCommentRepository.findFreeBoardCommentByCommentId(
					freeBoardCommentRequest.getParentId())
				.orElseThrow(() -> new FreeBoardException(ExceptionCode.PARENT_COMMENT_NOT_FOUND));
		}

		FreeBoardComment freeBoardComment = FreeBoardComment.builder()
			.freeBoard(freeBoard)
			.user(user)
			.content(freeBoardCommentRequest.getContent())
			.parentComment(parentComment)
			.build();

		freeBoardCommentRepository.saveAndFlush(freeBoardComment);

		freeBoard.addComment(freeBoardComment);

		freeBoardRepository.save(freeBoard);
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
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.USER_NOT_FOUND));

		FreeBoardComment freeBoardComment = freeBoardCommentRepository.findFreeBoardCommentByCommentId(commentId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.COMMENT_NOT_FOUND));

		if (!user.getGithubId().equals(freeBoardComment.getUser().getGithubId())) {
			throw new FreeBoardException(ExceptionCode.WRITER_USER_MISMATCH);
		}

		freeBoardCommentRepository.delete(freeBoardComment);
	}

	public List<FreeBoardComment> findComments(Long freeBoardId) {
		return freeBoardCommentRepository.findFreeBoardCommentsByFreeBoardOrderByUpdatedDateDesc(
			freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardId)
				.orElseThrow(() -> new FreeBoardException(ExceptionCode.POST_NOT_FOUND)));
	}

	/**
	 * 1.내가 freeBoard에 단 댓글 조회
	 * 2. 페이지네이션 처리
	 * */
	public Slice<FreeBoardComment> findByComments(String githubId, int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 존재하지 않습니다."));
		Slice<FreeBoardComment> comments = freeBoardCommentRepository.findFreeBoardCommentByUserOrderByUpdatedDateDesc(
			user, PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return comments;
	}

	/**
	 * 부모 댓글 조회
	 * */
	public Slice<FreeBoardParentCommentDto> findParentComments(Long freeBoardId, int pages) {
		FreeBoard freeBoard = freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardId)
			.orElseThrow(() -> new NoResultException("헤당 게시물이 존재 하지 않습니다"));

		Slice<Object[]> comments = freeBoardCommentRepository.findParentCommentsWithChildCountByFreeBoard(freeBoard,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(comments), comments.getPageable(), comments.hasNext());

	}

	/**
	 * 자식 댓글 조회
	 * */
	public Slice<FreeBoardCommentResponse> findChildComments(Long freeBoardId, Long parentId, int pages) {
		FreeBoard freeBoard = freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardId)
			.orElseThrow(() -> new NoResultException("헤당 게시물이 존재 하지 않습니다"));

		FreeBoardComment parent = freeBoardCommentRepository.findFreeBoardCommentByCommentId(parentId)
			.orElseThrow(() -> new NoResultException("헤당 댓글이 존재 하지 않습니다"));
		Slice<FreeBoardComment> comments = freeBoardCommentRepository.findChildCommentsByParentComment(parent,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toCommentResponse(comments), comments.getPageable(), comments.hasNext());
	}

	private List<FreeBoardParentCommentDto> toResponse(Slice<Object[]> comments) {
		return comments.getContent().stream().map(comment -> {
			FreeBoardComment fc = (FreeBoardComment)comment[0];
			Long childCount = (Long)comment[1];
			return FreeBoardParentCommentDto.builder()
				.rootComment(fc)
				.childCount(childCount)
				.build();
		}).collect(Collectors.toList());
	}

	private List<FreeBoardCommentResponse> toCommentResponse(Slice<FreeBoardComment> comments) {
		return comments.getContent().stream().map(comment -> {
			return FreeBoardCommentResponse.builder()
				.comment_id(comment.getCommentId())
				.freeBoardId(comment.getFreeBoard().getFreeBoardId())
				.parentId(comment.getParentComment().getCommentId())
				.updatedDate(comment.getUpdatedDate())
				.content(comment.getContent())
				.user(comment.getUser())
				.build();
		}).collect(Collectors.toList());
	}
}
