package morningrolecall.heulgit.eureka.service;

import java.util.List;

import javax.persistence.NoResultException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.eureka.domain.dto.EurekaCommentDto;
import morningrolecall.heulgit.eureka.repository.EurekaCommentRepository;
import morningrolecall.heulgit.eureka.repository.EurekaRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class EurekaCommentService {
	private final EurekaCommentRepository eurekaCommentRepository;
	private final EurekaRepository eurekaRepository;
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
	public void addComment(String githubId, EurekaCommentDto eurekaCommentDto) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 등록되어 있지 않습니다."));

		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaCommentDto.getEurekaId())
			.orElseThrow(() -> new NoResultException("해당 게시물이 존재하지 않습니다."));

		EurekaComment parentComment = null;
		if (eurekaCommentDto.getParentId() != null) {
			parentComment = eurekaCommentRepository.findEurekaCommentByCommentId(eurekaCommentDto.getParentId())
				.orElseThrow(() -> new NoResultException("해당 부모 댓글이 존재하지 않습니다."));
		}

		EurekaComment eurekaComment = EurekaComment.builder()
			.eureka(eureka)
			.user(user)
			.content(eurekaCommentDto.getContent())
			.parentComment(parentComment)
			.build();

		eurekaCommentRepository.saveAndFlush(eurekaComment);
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
			.orElseThrow(() -> new NoResultException("해당 사용자가 등록되어 있지 않습니다."));

		EurekaComment eurekaComment = eurekaCommentRepository.findEurekaCommentByCommentId(commentId)
			.orElseThrow(() -> new NoResultException("해당 댓글은 존재하지 않습니다."));

		if (!user.getGithubId().equals(eurekaComment.getUser().getGithubId())) {
			System.out.println("작성자와 사용자가 일치하지 않습니다.");
			return;
		}

		eurekaCommentRepository.delete(eurekaComment);
	}

	public List<EurekaComment> findComments(Long eurekaId) {
		return eurekaCommentRepository.findEurekaCommentsByEurekaOrderByUpdatedDateDesc(
			eurekaRepository.findEurekaByEurekaId(eurekaId)
				.orElseThrow(() -> new NoResultException("해당 게시물은 존재하지 않습니다.")));
	}
}
