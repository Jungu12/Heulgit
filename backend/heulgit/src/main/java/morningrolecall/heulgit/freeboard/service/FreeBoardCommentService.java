package morningrolecall.heulgit.freeboard.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.FreeBoardException;
import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardCommentRequest;
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
}
