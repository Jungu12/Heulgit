package morningrolecall.heulgit.eureka.service;

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

	@Transactional
	public void addComment(String githubId, EurekaCommentDto eurekaCommentDto) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 등록되어 있지 않습니다."));

		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaCommentDto.getEurekaId())
			.orElseThrow(() -> new NoResultException("해당 게시물이 존재하지 않습니다."));

		EurekaComment eurekaComment = EurekaComment.of(eureka, user, eurekaCommentDto);

		System.out.println(
			"eurekaComment.getCommentId(), eurekaComment.getContent() = " + eurekaComment.getCommentId() + " "
				+ eurekaComment.getContent());

		eurekaCommentRepository.saveAndFlush(eurekaComment);

		eureka.addComment(eurekaComment);
	}

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
}
