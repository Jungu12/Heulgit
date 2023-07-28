package morningrolecall.heulgit.eureka.service;

import java.time.LocalDateTime;

import javax.persistence.NoResultException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.dto.EurekaDto;
import morningrolecall.heulgit.eureka.repository.EurekaImageRepository;
import morningrolecall.heulgit.eureka.repository.EurekaRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class EurekaService {

	private final int SIZE = 20;
	private final EurekaRepository eurekaRepository;
	private final EurekaImageService eurekaImageService;
	private final EurekaImageRepository eurekaImageRepository;
	private final UserRepository userRepository;

	public Slice<Eureka> findEurekas(String sort, int pages) {
		if (sort.equals("likes")) {

		}

		if (sort.equals("comments")) {

		}

		if (sort.equals("views")) {
			return eurekaRepository.findSliceBy(PageRequest.of(pages - 1, SIZE, Sort.by("view").descending()));
		}

		return eurekaRepository.findSliceBy(PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
	}

	public Eureka findEureka(Long eurekaId) {
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		eureka.increaseView();

		eurekaRepository.saveAndFlush(eureka);

		return eureka;
	}

	/**
	 * 유레카 게시물 등록
	 * 이미지 파일이 있다면 EurekaImage 등록
	 * */
	@Transactional
	public void addEureka(String githubId, EurekaDto eurekaDto) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 등록되어 있지 않습니다."));
		Eureka eureka = Eureka.of(user, eurekaDto);

		eurekaRepository.saveAndFlush(eureka);

		if (eurekaDto.getFileUri() != null) {
			eurekaImageService.addEurekaImage(eurekaDto.getFileUri(), eureka);
		}
	}

	/**
	 * 유레카 게시물 수정
	 * 1. 게시물 ID로 게시물 조회
	 * 2. 작성자와 현재 사용자 비교
	 * 3. 게시물 수정 (작성자 제외 수정 가능)
	 * */
	@Transactional
	public void updateEureka(String githubId, Long eurekaId, EurekaDto eurekaDto) {
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		if (!githubId.equals(eureka.getUser().getGithubId())) {
			System.out.println("작성자가 아님!!!");
			return;
			// throw new IllegalAccessException("작성자와 사용자가 일치하지 않습니다.");
		}

		eureka.setTitle(eurekaDto.getTitle());
		eureka.setContent(eurekaDto.getContent());
		eureka.setUpdatedDate(LocalDateTime.now());
		eureka.setLink(eurekaDto.getLink());

		eurekaRepository.saveAndFlush(eureka);

		eurekaImageService.updateEurekaImage(eurekaDto.getFileUri(), eureka);
	}

	/**
	 * 유레카 게시물 삭제
	 * 1. 게시물 ID로 게시물 조회
	 * 2. 작성자와 현재 사용자 비교
	 * 3. 게시물 삭제 (EurekaImage도 삭제되어야 함)
	 * */
	@Transactional
	public void removeEureka(String githubId, Long eurekaId) {
		Eureka findEureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		if (!githubId.equals(findEureka.getUser().getGithubId())) {
			System.out.println("작성자가 아님!!!");
			return;
			// throw new IllegalAccessException("작성자와 사용자가 일치하지 않습니다.");
		}

		eurekaRepository.delete(findEureka);
	}

	/**
	 * 전체 게시물 수 반환
	 * */
	public long countEurekas() {
		return eurekaRepository.count();
	}

	/**
	 * 게시물 좋아요
	 * 이미 좋아요를 누른 경우 처리 X
	 * */
	public void likeEureka(String githubId, Long eurekaId) {
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자를 찾을 수 업습니다."));

		if (eureka.getLikedUsers().contains(user)) {
			System.out.println("이미 좋아요를 눌렀음");
			return;
			// throw new IllegalAccessException("사용자가 좋아요를 이미 눌렀습니다.");
		}

		eureka.addLikeUser(user);

		eurekaRepository.save(eureka);
	}

	/**
	 * 게시물 좋아요 취소
	 * 좋아요를 누르지 않은 경우 처리 X
	 * */
	public void unlikeEureka(String githubId, Long eurekaId) {
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자를 찾을 수 업습니다."));

		if (!eureka.getLikedUsers().contains(user)) {
			System.out.println("좋아요를 누르지 않았음");
			return;
			// throw new IllegalAccessException("사용자가 좋아요를 이미 눌렀습니다.");
		}

		eureka.deleteLikeUser(user);

		eurekaRepository.save(eureka);
	}
}
