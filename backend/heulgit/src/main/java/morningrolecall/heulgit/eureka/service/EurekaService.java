package morningrolecall.heulgit.eureka.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.NoResultException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.eureka.domain.EurekaGithubInfo;
import morningrolecall.heulgit.eureka.domain.EurekaImage;
import morningrolecall.heulgit.eureka.domain.EurekaLabel;
import morningrolecall.heulgit.eureka.domain.dto.EurekaDetailResponse;
import morningrolecall.heulgit.eureka.domain.dto.EurekaRequest;
import morningrolecall.heulgit.eureka.domain.dto.EurekaUpdateRequest;
import morningrolecall.heulgit.eureka.repository.EurekaCommentRepository;
import morningrolecall.heulgit.eureka.repository.EurekaGithubInfoRepository;
import morningrolecall.heulgit.eureka.repository.EurekaImageRepository;
import morningrolecall.heulgit.eureka.repository.EurekaLabelRepository;
import morningrolecall.heulgit.eureka.repository.EurekaRepository;
import morningrolecall.heulgit.image.Service.ImageService;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;
import morningrolecall.heulgit.util.GithubApiClient;

@Service
@RequiredArgsConstructor
public class EurekaService {

	private final int SIZE = 20;
	private final EurekaRepository eurekaRepository;
	private final EurekaImageRepository eurekaImageRepository;
	private final EurekaCommentRepository eurekaCommentRepository;
	private final EurekaGithubInfoRepository eurekaGithubInfoRepository;
	private final EurekaLabelRepository eurekaLabelRepository;
	private final UserRepository userRepository;
	private final GithubApiClient githubApiClient;
	private final ImageService imageService;

	private final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 유레카 목록 조회
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 * */
	public Slice<EurekaDetailResponse> findEurekas(String sort, int pages) {
		if (sort.equals("like"
			+ "s")) {
			Slice<Eureka> eurekas = eurekaRepository.findSortedByLikesEurekas(PageRequest.of(pages - 1, SIZE));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		if (sort.equals("comments")) {
			Slice<Eureka> eurekas = eurekaRepository.findSortedByCommentsEurekas(PageRequest.of(pages - 1, SIZE));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		if (sort.equals("views")) {
			Slice<Eureka> eurekas = eurekaRepository.findSliceBy(
				PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		Slice<Eureka> eurekas = eurekaRepository.findSliceBy(
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		logger.debug("{}");


		return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
	}

	/**
	 * 단일 유레카 조회
	 * 1. 유레카 조회
	 * 2. 조회 수 증가
	 * 3. 댓글 조회
	 * 4. 저장 및 반환
	 * */
	public EurekaDetailResponse findEureka(Long eurekaId) {
		Eureka eureka = eurekaRepository.findEurekaAndEurekaCommentsByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		eureka.increaseView();

		List<EurekaComment> eurekaComments = eurekaCommentRepository.findEurekaCommentsByEurekaOrderByUpdatedDateDesc(
			eureka);
		eureka.setEurekaComments(eurekaComments);

		EurekaGithubInfo eurekaGithubInfo = eurekaGithubInfoRepository.findEurekaGithubInfoByEureka(eureka)
			.orElseThrow(() -> new NoResultException("이슈나 풀리퀘스트의 내용이 존재하지 않습니다."));
		List<EurekaLabel> eurekaLabels = eurekaLabelRepository.findEurekaLabelsByEurekaGithubInfo(eurekaGithubInfo);

		eurekaRepository.save(eureka);

		return EurekaDetailResponse.builder()
			.eurekaId(eurekaId)
			.user(eureka.getUser())
			.title(eureka.getTitle())
			.content(eureka.getContent())
			.updatedDate(eureka.getUpdatedDate())
			.view(eureka.getView())
			.link(eureka.getLink())
			.eurekaImages(eureka.getEurekaImages())
			.likedUsers(eureka.getLikedUsers())
			.eurekaComments(eurekaComments)
			.eurekaGithubInfo(eurekaGithubInfo)
			.eurekaLabels(eurekaLabels)
			.build();
	}

	/**
	 * 유레카 게시물 등록
	 * 이미지 파일이 있다면 EurekaImage 등록
	 * 1. 사용자 조회
	 * 2. 유레카 생성 및 저장
	 * 3. 이슈(풀리퀘스트) 정보 생성 및 저장
	 * 4. 이미지 파일 리스트 생성 및 유레카 연결, 저장
	 * */
	@Transactional
	public void addEureka(String githubId, EurekaRequest eurekaRequest,List<MultipartFile> multipartFiles) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 등록되어 있지 않습니다."));
		Eureka eureka = Eureka.builder()
			.user(user)
			.title(eurekaRequest.getTitle())
			.content(eurekaRequest.getContent())
			.updatedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
			.link(eurekaRequest.getLink())
			.build();

		eurekaRepository.save(eureka);

		// 이슈(풀리퀘스트) 정보 조회
		if (eurekaRequest.getLink() != null) {
			String githubInfo = githubApiClient.requestGithubInfo(eurekaRequest.getLink());
			EurekaGithubInfo eurekaGithubInfo = parseGithubInfo(githubInfo, eureka);
			eurekaGithubInfoRepository.save(eurekaGithubInfo);

			List<EurekaLabel> eurekaLabels = parseLabel(githubInfo, eurekaGithubInfo);
			eurekaLabelRepository.saveAll(eurekaLabels);
		}
		// 이미지 S3에 업로드
		List<String> imageUrls = imageService.uploadFile(githubId,"eureka",multipartFiles);
		List<EurekaImage> eurekaImages = makeEurekaImages(eureka, imageUrls);
		eurekaImageRepository.saveAll(eurekaImages);

		eureka.addAllImage(eurekaImages);
		eurekaRepository.save(eureka);
	}

	/**
	 * 유레카 게시물 수정
	 * 1. 게시물 ID로 게시물 조회
	 * 2. 작성자와 현재 사용자 비교
	 * 3. 게시물 수정 (작성자 제외 수정 가능)
	 * 4. 기존 이미지 파일은 모두 제거, 새로운 이미지 파일 저장
	 * */
	@Transactional
	public void updateEureka(Long eurekaId,String githubId, EurekaUpdateRequest eurekaUpdateRequest,List<MultipartFile> multipartFiles) {
		Eureka eureka = eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		if (!githubId.equals(eureka.getUser().getGithubId())) {
			System.out.println("작성자가 아님!!!");
			return;
			// throw new IllegalAccessException("작성자와 사용자가 일치하지 않습니다.");
		}

		eureka.setTitle(eurekaUpdateRequest.getTitle());
		eureka.setContent(eurekaUpdateRequest.getContent());
		eureka.setUpdatedDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")));

		// Link가 변경되었다면, 이슈(풀리퀘스트) 정보 갱신
		// 기존의 EurekaGithubInfo, EurekaLabel을 변경해야 함
		if (!eureka.getLink().equals(eurekaUpdateRequest.getLink())) {
			String githubInfo = githubApiClient.requestGithubInfo(eurekaUpdateRequest.getLink());

			EurekaGithubInfo eurekaGithubInfo = eurekaGithubInfoRepository.findEurekaGithubInfoByEureka(eureka)
				.orElseThrow(() -> new NoResultException("해당 이슈(풀리퀘스트) 정보가 존재하지 않습니다."));
			List<EurekaLabel> eurekaLabels = eurekaLabelRepository.findEurekaLabelsByEurekaGithubInfo(eurekaGithubInfo);

			EurekaGithubInfo newEurekaGithubInfo = parseGithubInfo(githubInfo, eureka);

			eurekaGithubInfo.updateTitle(newEurekaGithubInfo.getTitle());
			eurekaGithubInfo.updateBody(newEurekaGithubInfo.getBody());
			eurekaGithubInfo.updateState(newEurekaGithubInfo.isState());
			eurekaGithubInfo.updateUpdatedDate(newEurekaGithubInfo.getUpdatedDate());

			eurekaGithubInfoRepository.save(eurekaGithubInfo);
			
			eurekaLabelRepository.deleteAll(eurekaLabels);
			eurekaLabelRepository.saveAll(parseLabel(githubInfo, eurekaGithubInfo));
		}

		eureka.setLink(eurekaUpdateRequest.getLink());

		// S3에서 이미지 삭제
		List<EurekaImage> deleteEurekaImages = eurekaImageRepository.findEurekaImagesByEureka(eureka);
		if (deleteEurekaImages != null || !deleteEurekaImages.isEmpty()) {
			List<String> imageUrls = new ArrayList<>();
			for(EurekaImage eurekaImage : deleteEurekaImages){
				imageUrls.add(eurekaImage.getFileUri());
			}
			imageService.deleteFile(imageUrls);
		}

		eurekaImageRepository.deleteAllByEureka(eureka);
		eureka.removeAllImage();

		// 현재 받은 이미지 S3에 업로드
		List<String> imageUrls = imageService.uploadFile(githubId,"eureka",multipartFiles);
		List<EurekaImage> eurekaImages = makeEurekaImages(eureka,imageUrls);

		//DB에 다시 저장
		eurekaImageRepository.saveAll(eurekaImages);
		eureka.addAllImage(eurekaImages);
		eurekaRepository.save(eureka);
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
		List<EurekaImage> eurekaImages= eurekaImageRepository.findEurekaImagesByEureka(findEureka);

		if (eurekaImages != null || !eurekaImages.isEmpty()) {
			List<String> imageUrls = new ArrayList<>();
			for(EurekaImage eurekaImage:eurekaImages){
				imageUrls.add(eurekaImage.getFileUri());
			}
			imageService.deleteFile(imageUrls);
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
	 * 1. 게시물, 사용자 조회
	 * 2. 좋아요 여부 확인
	 * 3. 좋아요 후, 저장
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
	 * 1. 게시물, 사용자 조회
	 * 2. 좋아요 여부 확인
	 * 3. 좋아요 취소 후, 저장
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

		eureka.removeLikeUser(user);

		eurekaRepository.save(eureka);
	}

	/**
	 * 게시물을 제목으로 검색
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 * */
	public Slice<EurekaDetailResponse> searchTitleEurekas(String keyword, String sort, int pages) {
		if (sort.equals("likes")) {
			Slice<Eureka> eurekas = eurekaRepository.findContainsTitleSortedByLikesEurekas(keyword,
				PageRequest.of(pages - 1, SIZE));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		if (sort.equals("comments")) {
			Slice<Eureka> eurekas = eurekaRepository.findContainsTitleSortedByCommentsEurekas(keyword,
				PageRequest.of(pages - 1, SIZE));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		if (sort.equals("views")) {
			Slice<Eureka> eurekas = eurekaRepository.findSliceByTitleContains(keyword,
				PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		// 최신 순
		Slice<Eureka> eurekas = eurekaRepository.findSliceByTitleContains(keyword,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
	}

	/**
	 * 게시물을 작성자 github ID로 검색
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 * */
	public Slice<EurekaDetailResponse> searchUserEurekas(String keyword, String sort, int pages) {
		if (sort.equals("likes")) {
			Slice<Eureka> eurekas = eurekaRepository.findByUserNameSortedByLikesEurekas(keyword,
				PageRequest.of(pages - 1, SIZE));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		if (sort.equals("comments")) {
			Slice<Eureka> eurekas = eurekaRepository.findByUserNameSortedByCommentsEurekas(keyword,
				PageRequest.of(pages - 1, SIZE));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		if (sort.equals("views")) {
			Slice<Eureka> eurekas = eurekaRepository.findSliceByUser_GithubId(keyword,
				PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
			return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
		}

		// 최신 순
		Slice<Eureka> eurekas = eurekaRepository.findSliceByUser_GithubId(keyword,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
	}

	/**
	 * 사용자 본인의 게시물 반환
	 * 1. 사용자 조회
	 * 2. 사용자의 게시물 반환
	 * */
	public Slice<EurekaDetailResponse> findMyEurekas(String githubId, int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 존재하지 않습니다."));

		Slice<Eureka> eurekas = eurekaRepository.findSliceByUser_GithubId(githubId,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(eurekas), eurekas.getPageable(), eurekas.hasNext());
	}

	/**
	 * 단일 게시물의 좋아요 사용자 목록 반환
	 * */
	public Set<User> findLikedUsers(Long eurekaId) {
		return eurekaRepository.findEurekaByEurekaId(eurekaId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다.")).getLikedUsers();
	}

	/**
	 * EurekaImages를 List에 담아 반환
	 * 1. 이미지 파일 정보를 EurekaImage로 변환
	 * 2. List 저장 및 반환
	 * */
	private List<EurekaImage> makeEurekaImages(Eureka eureka, List<String> eurekaFileUris) {
		List<EurekaImage> eurekaImages = new ArrayList<>();

		for (String eurekaFileUri : eurekaFileUris) {
			EurekaImage eurekaImage = EurekaImage.builder()
				.fileUri(eurekaFileUri)
				.eureka(eureka)
				.build();
			eurekaImages.add(eurekaImage);
		}

		return eurekaImages;
	}

	/**
	 * Slice<Eureka>를 List<EurekasResponse>로 변환
	 * */
	private List<EurekaDetailResponse> toResponse(Slice<Eureka> eurekas) {
		return eurekas.getContent().stream().map(eureka -> {
			EurekaGithubInfo eurekaGithubInfo = eurekaGithubInfoRepository.findEurekaGithubInfoByEureka(eureka)
				.orElseThrow(() -> new NoResultException("이슈나 풀리퀘스트에 대한 정보가 존재하지 않습니다."));
			List<EurekaLabel> eurekaLabels = eurekaLabelRepository.findEurekaLabelsByEurekaGithubInfo(eurekaGithubInfo);

			return EurekaDetailResponse.builder()
				.eurekaId(eureka.getEurekaId())
				.user(eureka.getUser())
				.title(eureka.getTitle())
				.content(eureka.getContent())
				.updatedDate(eureka.getUpdatedDate())
				.link(eureka.getLink())
				.view(eureka.getView())
				.eurekaImages(eureka.getEurekaImages())
				.likedUsers(eureka.getLikedUsers())
				.eurekaComments(eureka.getEurekaComments())
				.eurekaGithubInfo(eurekaGithubInfo)
				.eurekaLabels(eurekaLabels)
				.build();
		}).collect(Collectors.toList());
	}

	private EurekaGithubInfo parseGithubInfo(String info, Eureka eureka) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(info);

			return EurekaGithubInfo.builder()
				.title(jsonNode.get("title").asText())
				.state(jsonNode.get("state").asBoolean())
				.updatedDate(convertToLocalDateTime(jsonNode.get("updated_at").asText()))
				.body(jsonNode.get("body").asText())
				.comments(jsonNode.get("comments").asInt())
				.eureka(eureka)
				.build();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	private List<EurekaLabel> parseLabel(String info, EurekaGithubInfo eurekaGithubInfo) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode labelsNode = objectMapper.readTree(info).get("labels");

			List<EurekaLabel> labels = new ArrayList<>();

			if (labelsNode != null && labelsNode.isArray()) {
				for (JsonNode labelNode : labelsNode) {
					EurekaLabel eurekaLabel = EurekaLabel.builder()
						.name(labelNode.get("name").asText())
						.description(labelNode.get("description").asText())
						.eurekaGithubInfo(eurekaGithubInfo)
						.build();

					labels.add(eurekaLabel);
				}
			}

			return labels;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	private LocalDateTime convertToLocalDateTime(String date) {
		DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

		// String을 ZonedDateTime으로 변환
		ZonedDateTime zonedDateTime = ZonedDateTime.parse(date, formatter);

		// ZonedDateTime을 LocalDateTime으로 변환
		return zonedDateTime.toLocalDateTime();

	}
}
