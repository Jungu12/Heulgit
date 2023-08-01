package morningrolecall.heulgit.eureka.service;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.NoResultException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.dto.EurekaDetailResponse;
import morningrolecall.heulgit.eureka.domain.dto.EurekaDto;
import morningrolecall.heulgit.eureka.domain.dto.EurekaUpdateRequest;
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
			return eurekaRepository.findSortedByLikesEurekas(PageRequest.of(pages - 1, SIZE));
		}

		if (sort.equals("comments")) {
			return eurekaRepository.findSortedByCommentsEurekas(PageRequest.of(pages - 1, SIZE));
		}

		if (sort.equals("views")) {
			return eurekaRepository.findSliceBy(
				PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
		}

		return eurekaRepository.findSliceBy(PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
	}

	public EurekaDetailResponse findEureka(Long eurekaId) {
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		eureka.increaseView();

		System.out.println("eureka.getEurekaComments().get(0) = " + eureka.getEurekaComments().get(0));

		eurekaRepository.save(eureka);

		return EurekaDetailResponse.of(eureka);
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
	public void updateEureka(String githubId, EurekaUpdateRequest eurekaUpdateRequest) {
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaUpdateRequest.getEurekaId())
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		if (!githubId.equals(eureka.getUser().getGithubId())) {
			System.out.println("작성자가 아님!!!");
			return;
			// throw new IllegalAccessException("작성자와 사용자가 일치하지 않습니다.");
		}

		eureka.setTitle(eurekaUpdateRequest.getTitle());
		eureka.setContent(eurekaUpdateRequest.getContent());
		eureka.setUpdatedDate(LocalDateTime.now());
		eureka.setLink(eurekaUpdateRequest.getLink());

		eurekaRepository.saveAndFlush(eureka);

		eurekaImageService.updateEurekaImage(eurekaUpdateRequest.getFileUri(), eureka);
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

	/**
	 * 게시물을 제목으로 검색
	 * */
	public Slice<Eureka> searchTitleEurekas(String keyword, String sort, int pages) {
		if (sort.equals("likes")) {
			return eurekaRepository.findContainsTitleSortedByLikesEurekas(keyword, PageRequest.of(pages - 1, SIZE));
		}

		if (sort.equals("comments")) {
			return eurekaRepository.findContainsTitleSortedByCommentsEurekas(keyword, PageRequest.of(pages - 1, SIZE));
		}

		if (sort.equals("views")) {
			return eurekaRepository.findSliceByTitleContains(keyword,
				PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
		}

		// 최신 순
		return eurekaRepository.findSliceByTitleContains(keyword,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
	}

	/**
	 * 게시물을 작성자 github ID로 검색
	 * */
	public Slice<Eureka> searchUserEurekas(String keyword, String sort, int pages) {
		if (sort.equals("likes")) {
			return eurekaRepository.findByUserNameSortedByLikesEurekas(keyword, PageRequest.of(pages - 1, SIZE));
		}

		if (sort.equals("comments")) {
			return eurekaRepository.findByUserNameSortedByCommentsEurekas(keyword, PageRequest.of(pages - 1, SIZE));
		}

		if (sort.equals("views")) {
			return eurekaRepository.findSliceByUser_GithubId(keyword,
				PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
		}

		// 최신 순
		return eurekaRepository.findSliceByUser_GithubId(keyword,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
	}

	/**
	 * 사용자 본인의 게시물 반환
	 * */
	public Slice<Eureka> findMyEurekas(String githubId, int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 존재하지 않습니다."));

		return eurekaRepository.findSliceByUser_GithubId(githubId,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
	}

	/**
	 * 단일 게시물의 좋아요 사용자 목록 반환
	 * */
	public Set<User> findLikedUsers(Long eurekaId) {
		return eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다.")).getLikedUsers();
	}
}
