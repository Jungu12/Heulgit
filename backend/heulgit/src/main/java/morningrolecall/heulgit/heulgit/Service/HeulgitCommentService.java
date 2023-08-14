package morningrolecall.heulgit.heulgit.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.NoResultException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.heulgit.domain.Heulgit;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;
import morningrolecall.heulgit.heulgit.domain.dto.HeulgitCommentDto;
import morningrolecall.heulgit.heulgit.domain.dto.HeulgitCommentResponse;
import morningrolecall.heulgit.heulgit.domain.dto.ParentCommentDto;
import morningrolecall.heulgit.heulgit.repository.HeulgitCommentRepository;
import morningrolecall.heulgit.heulgit.repository.HeulgitRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class HeulgitCommentService {

	private final HeulgitCommentRepository heulgitCommentRepository;
	private final HeulgitRepository heulgitRepository;
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
	public void addComment(String githubId, HeulgitCommentDto heulgitCommentDto){
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(()-> new NoResultException("해당 사용자가 등록되어 있지 않습니다"));

		Heulgit heulgit = heulgitRepository.findHeulgitByHeulgitId(heulgitCommentDto.getHeulgitId())
			.orElseThrow(() -> new NoResultException("해당 게시물이 존재하지 않습니다."));

		HeulgitComment parentComment = null;
		if( heulgitCommentDto.getParentId() != null) {
			parentComment = heulgitCommentRepository.findHeulgitCommentByCommentId(heulgitCommentDto.getParentId())
				.orElseThrow(() -> new NoResultException("해당 부모 댓글이 존재하지 않습니다."));
		}

		HeulgitComment heulgitComment = HeulgitComment.builder()
			.heulgit(heulgit)
			.user(user)
			.content(heulgitCommentDto.getContent())
			.parentComment(parentComment)
			.build();

		heulgitCommentRepository.saveAndFlush(heulgitComment);

		heulgit.addComment(heulgitComment);

		heulgitRepository.save(heulgit);
	}

	/**
	 * 댓글 삭제
	 * 1. 사용자 및 댓글 조회
	 * 2. 사용자와 댓글 작성자 비교
	 * 3. 삭제
	 */
	@Transactional
	public void removeComment(String githubId, Long commentId) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(()-> new NoResultException("해당 사용자가 등록되어 있지 않습니다"));

		HeulgitComment heulgitComment = heulgitCommentRepository.findHeulgitCommentByCommentId(commentId)
			.orElseThrow(() -> new NoResultException("해당 댓글은 존재하지 않습니다."));

		if (!user.getGithubId().equals(heulgitComment.getUser().getGithubId())) {
			System.out.println("작성자와 사용자가 일치하지 않습니다.");
			return;
		}

		heulgitCommentRepository.delete(heulgitComment);
	}

	public List<HeulgitComment> findComments(Long heulgitId){
		return heulgitCommentRepository.findHeulgitCommentsByHeulgitOrderByUpdatedDateDesc(
			heulgitRepository.findHeulgitByHeulgitId(heulgitId)
				.orElseThrow(()-> new NoResultException("헤당 게시물이 존재 하지 않습니다")));
	}

	/**
	 * 부모 댓글 조회*/
	public Slice<ParentCommentDto> findParentComments(Long heulgitId,int pages){
		Heulgit heulgit =heulgitRepository.findHeulgitByHeulgitId(heulgitId)
			.orElseThrow(()-> new NoResultException("헤당 게시물이 존재 하지 않습니다"));

		Slice<Object []> comments= heulgitCommentRepository.findByHeulgitAndParentCommentIsNull(heulgit,PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));

		return new SliceImpl<>(toResponse(comments),comments.getPageable(), comments.hasNext());
	}
	/** 자식 댓글 조회*/
	public Slice<HeulgitCommentResponse> findChildComments(Long heulgitId, Long parentId, int pages){
		Heulgit heulgit =heulgitRepository.findHeulgitByHeulgitId(heulgitId)
			.orElseThrow(()-> new NoResultException("헤당 게시물이 존재 하지 않습니다"));
		HeulgitComment parent = heulgitCommentRepository.findHeulgitCommentByCommentId(parentId)
			.orElseThrow(()-> new NoResultException("헤당 댓글이 존재 하지 않습니다"));

		Slice<HeulgitComment> comments = heulgitCommentRepository.findChildCommentsByParentComment(parent,PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toCommentResponse(comments),comments.getPageable(),comments.hasNext());
	}


	/**
	 * 1. 내가 흘깃에 단 댓글 조회
	 * 2. 페이지네이션 처리*/
	public Slice<HeulgitComment> findMyComments(String githubId, int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 존재하지 않습니다."));
		Slice<HeulgitComment> comments = heulgitCommentRepository.findHeulgitCommentsByUserOrderByUpdatedDateDesc(user, PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return  comments;
	}

	private List<ParentCommentDto> toResponse(Slice<Object []> comments){
		return comments.getContent().stream().map(comment ->{
			HeulgitComment hc = (HeulgitComment) comment[0];
			Long childCount = (Long) comment[1];
			return ParentCommentDto.builder()
				.rootComment(hc)
				.childCount(childCount)
				.build();
		}).collect(Collectors.toList());
	}

	private List<HeulgitCommentResponse> toCommentResponse(Slice<HeulgitComment> comments){
		return comments.getContent().stream().map(comment ->{
			return HeulgitCommentResponse.builder()
				.comment_id(comment.getCommentId())
				.heulgitId(comment.getHeulgit().getHeulgitId())
				.parentId(comment.getParentComment().getCommentId())
				.updatedDate(comment.getUpdatedDate())
				.content(comment.getContent())
				.user(comment.getUser())
				.build();
		}).collect(Collectors.toList());
	}

}
