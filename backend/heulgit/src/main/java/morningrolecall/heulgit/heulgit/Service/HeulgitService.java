package morningrolecall.heulgit.heulgit.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.NoResultException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.HeulgitException;
import morningrolecall.heulgit.heulgit.domain.Heulgit;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;
import morningrolecall.heulgit.heulgit.domain.dto.HeulgitDetailResponse;
import morningrolecall.heulgit.heulgit.domain.dto.HeulgitLikeUserResponse;
import morningrolecall.heulgit.heulgit.repository.HeulgitCommentRepository;
import morningrolecall.heulgit.heulgit.repository.HeulgitRepository;
import morningrolecall.heulgit.relation.domain.Relation;
import morningrolecall.heulgit.relation.repository.RelationRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class HeulgitService {

	private final int SIZE = 10;
	private final String GITHUB_API_URL = "https://api.github.com/search/repositories";
	private final RestTemplate restTemplate;
	private final HeulgitRepository heulgitRepository;
	private final HeulgitCommentRepository heulgitCommentRepository;
	private final UserRepository userRepository;
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final RelationRepository relationRepository;



	/**
	 * 흘깃 정렬 조회
	 * 1.language: 언어 선택 => 없으면 모든 언어
	 * 2.정렬조건: 좋아요, 스타 수 =>
	 * 3.시작 년, 시작 월 =>
	 * 4.종료 년 , 종료 월 =>
	 * 5.들을 정렬하여 페이지네이션 반환
	 */

	public Slice<HeulgitDetailResponse> searchHeulgits(String githubId, String sort, String language,
		LocalDateTime startDate, LocalDateTime endDate,
		int pages) {
		Slice<Heulgit> heulgits;
		Pageable pageable = PageRequest.of(pages - 1, 20);

		if ("likes".equals(sort)) {
			if (language != null && startDate != null && endDate != null) {
				heulgits = heulgitRepository.findSortedByLikesSearchByLanguageAndDateHeulgits(language, startDate, endDate, pageable);
			} else if (language != null) {
				heulgits = heulgitRepository.findSortedByLikesSearchByLanguageHeulgits(language, pageable);
			} else if (startDate != null && endDate != null){
				heulgits = heulgitRepository.findSortedByLikesSearchByDate(startDate,endDate,pageable);
			}  else {
				heulgits = heulgitRepository.findSortedByLikesHeulgits(pageable);
			}
		} else if ("stars".equals(sort)) {
			if (language != null && startDate != null && endDate != null) {
				heulgits = heulgitRepository.findSortedByStarsSearchByLanguageAndDateHeulgits(language, startDate, endDate, pageable);

			} else if (language != null) {
				heulgits = heulgitRepository.findSortedByStarsSearchByLanguageHeulgits(language, pageable);
			} else if( startDate != null && endDate != null) {
				heulgits = heulgitRepository.findSortedByStarsSearchByDateHeulgits(startDate,endDate,pageable);
			} else {
				heulgits = heulgitRepository.findSortedByStarsHeulgits(pageable);
			}
		} else if (language != null && startDate != null && endDate != null) {
			heulgits = heulgitRepository.findSearchByLanguageAndDateHeulgits(language, startDate, endDate, pageable);

		} else if (language != null) {
			heulgits = heulgitRepository.findSearchByLanguageHeulgits(language, pageable);
		} else if (startDate != null && endDate != null) {
			heulgits = heulgitRepository.findSearchByDateHeulgits(startDate, endDate, pageable);
		} else {
			heulgits = heulgitRepository.findRandomHeulgits(pageable);

		}

		return new SliceImpl<>(toResponse(heulgits), heulgits.getPageable(), heulgits.hasNext());


	}


	/**
	 * 단일 흘깃 조회
	 * 1. 흘깃 조회
	 * 2. 조회 수 증가
	 * 3. 댓글 조회
	 * 4. 저장 및 반환
	 */
	public HeulgitDetailResponse findHeulgit(Long heulgitId){
		Heulgit heulgit = heulgitRepository.findHeulgitAndHeulgitCommentsByHeulgitId(heulgitId)
			.orElseThrow(() -> new HeulgitException(ExceptionCode.POST_NOT_FOUND));

		heulgit.increaseView();

		List<HeulgitComment> heulgitComments = heulgitCommentRepository.findHeulgitCommentsByHeulgitOrderByUpdatedDateDesc(heulgit);
		heulgit.setHeulgitComments(heulgitComments);
		heulgitRepository.save(heulgit);

		boolean isRegistered = userRepository.existsById(heulgit.getGithubId());

		return HeulgitDetailResponse.builder()
			.heulgitId(heulgit.getHeulgitId())
			.githubId(heulgit.getGithubId())
			.avatarUrl(heulgit.getAvatarUrl())
			.heulgitName(heulgit.getHeulgitName())
			.content(heulgit.getContent())
			.star(heulgit.getStar())
			.updatedDate(heulgit.getUpdatedDate())
			.language(heulgit.getLanguage())
			.view(heulgit.getView())
			.isRegistered(isRegistered)
			// .likedUsers(heulgit.getLikedUsers())
			.heulgitComments(heulgit.getHeulgitComments())
			.build();

	}

	/**
	 * 전제 흘깃 게시물 수 반환
	 */
	public long countHeulgit(){
		return heulgitRepository.count();
	}


	/**
	 * 게시물 좋아요
	 * 1. 게시물, 사용자 조회
	 * 2. 좋아요 여부 확인
	 * 3. 좋아요 후, 저장
	 */
	public void likeHeulgit(String githubId, Long heulgitId) {
		Heulgit heulgit = heulgitRepository.findHeulgitByHeulgitId(heulgitId)
			.orElseThrow(() -> new HeulgitException(ExceptionCode.POST_NOT_FOUND));

		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(()-> new HeulgitException(ExceptionCode.USER_NOT_FOUND));

		if(heulgit.getLikedUsers().contains(user)){
			throw new HeulgitException(ExceptionCode.LIKE_ALREADY_EXIST);
		}
		heulgit.addLikeUser(user);

		heulgitRepository.save(heulgit);

	}


	/**
	 * 게시물 좋아요 취소
	 * 1. 게시물, 사용자 조회
	 * 2. 좋아요 여부 확인
	 * 3. 좋아요 취소 후, 저장
	 * */
	public void unlikeHeulgit(String githubId, Long heulgitId){
		Heulgit heulgit = heulgitRepository.findHeulgitByHeulgitId(heulgitId)
			.orElseThrow(() -> new HeulgitException(ExceptionCode.POST_NOT_FOUND));

		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(()-> new HeulgitException(ExceptionCode.USER_NOT_FOUND));

		if(!heulgit.getLikedUsers().contains(user)){
			new HeulgitException(ExceptionCode.LIKE_NOT_EXIST);
		}

		heulgit.removeLikeUser(user);

		heulgitRepository.save(heulgit);


	}
	/**
	 * 게시물을 제목으로 검색
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 * */
	public Slice<HeulgitDetailResponse> searchTitleHueglits(String keyword,int pages){
		Slice<Heulgit> heulgits = heulgitRepository.findSliceByHeulgitNameContains(keyword,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(heulgits), heulgits.getPageable(), heulgits.hasNext());

	}


	/**
	 * 게시물을 작성자 github ID로 검색
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 */
	public Slice<HeulgitDetailResponse> searchUserHeulgits(String githubId,int pages){

		Slice<Heulgit> heulgits = heulgitRepository.findSliceByGithubId(githubId,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(heulgits), heulgits.getPageable(), heulgits.hasNext());

	}



	/**
	 * 사용자 본인의 github 게시물 반환
	 * 1. 사용자 조회
	 * 2. 사용자의 게시물 반환
	 * */
	public Slice<HeulgitDetailResponse> findMyHeulgits(String githubId, int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new HeulgitException(ExceptionCode.POST_NOT_FOUND));

		Slice<Heulgit> heulgits = heulgitRepository.findSliceByGithubId(githubId,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(heulgits), heulgits.getPageable(), heulgits.hasNext());
	}

	/**
	 * 단일 게시물의 좋아요 사용자 목록 반환
	 * */
	// public Set<User> findLikedUsers(Long heulgitId) {
	// 	return heulgitRepository.findHeulgitByHeulgitId(heulgitId)
	// 		.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다.")).getLikedUsers();
	// }
	public Slice<HeulgitLikeUserResponse> findLikedUser(Long heulgitId,String githubId,int pages){
		Slice<User> likedUsers = heulgitRepository.findLikedUsersByHeulgitId(heulgitId,PageRequest.of(pages - 1, SIZE));
		return  new SliceImpl<>(toLikeUserResponse(likedUsers,githubId),likedUsers.getPageable(), likedUsers.hasNext());
	}


	/**
	 * 내가 좋아요한 레포 목록 반환*/
	public Slice<HeulgitDetailResponse> findMyLikeHeulgits(String githubId, int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new HeulgitException(ExceptionCode.USER_NOT_FOUND));
		Slice<Heulgit> heulgits = heulgitRepository.findByLikedUsersContains(user,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(heulgits), heulgits.getPageable(), heulgits.hasNext());
	}

	/** 피드 추천 테스트*/
	public Slice<HeulgitDetailResponse> feedList(String githubId,int pages){
		List<Heulgit> heulgits = new ArrayList<>();
		List<Heulgit> randoms = heulgitRepository.findAll();
		Collections.shuffle(randoms);

		List<Heulgit> followHuelgit = new ArrayList<>();
		List<Relation> relations = relationRepository.findByFromId(githubId);
		for(Relation relation: relations){
			List<Heulgit> relationHeulgits = heulgitRepository.findHeulgitsByGithubId(relation.getToId());
			if(relationHeulgits.size()==0){
				continue;
			}
			followHuelgit.addAll(relationHeulgits);
		}
		Collections.shuffle(followHuelgit);
		int followIdx=0;
		int randomIdx=0;
		for(int i=0;i<1000;i++){
			if(i%5==0){
				if(followIdx <followHuelgit.size()){
					heulgits.add(followHuelgit.get(followIdx++));
				} else{
					heulgits.add(randoms.get(randomIdx++));
				}
			} else{
				heulgits.add(randoms.get(randomIdx++));

			}

		}

		int pageSize = 10; // 페이지당 아이템 수
		int currentPage = 0; // 현재 페이지 (0부터 시작)

		int startItem = currentPage * pageSize; // 시작 아이템 인덱스
		int toIndex = Math.min(startItem + pageSize, heulgits.size()); // 종료 아이템 인덱스

		List<Heulgit> paginatedHeulgits = heulgits.subList(startItem, toIndex); // 현재 페이지에 해당하는 데이터 추출

		boolean hasNextPage = heulgits.size() > startItem + pageSize; // 다음 페이지 여부 확인

		Slice<Heulgit> heulgitSlice = new SliceImpl<>(paginatedHeulgits, Pageable.ofSize(pageSize), hasNextPage);
		return new SliceImpl<>(toResponse(heulgitSlice),heulgitSlice.getPageable(),heulgitSlice.hasNext());

	}







	/**
	 * Slice<Heulgit>를 List<HeulgitDetailResponse>로 변환
	 * */
	private List<HeulgitDetailResponse> toResponse(Slice<Heulgit> heulgits) {
		return heulgits.getContent().stream().map(heulgit ->{
			boolean isRegistered = userRepository.existsById(heulgit.getGithubId());

			return HeulgitDetailResponse.builder()
				.heulgitId(heulgit.getHeulgitId())
				.githubId(heulgit.getGithubId())
				.avatarUrl(heulgit.getAvatarUrl())
				.heulgitName(heulgit.getHeulgitName())
				.content(heulgit.getContent())
				.star(heulgit.getStar())
				.updatedDate(heulgit.getUpdatedDate())
				.language(heulgit.getLanguage())
				.view(heulgit.getView())
				.isRegistered(isRegistered)
				.likedUsers(heulgit.getLikedUsers())
				.heulgitComments(heulgit.getHeulgitComments())
				.build();
		}).collect(Collectors.toList());

	}

	/**
	 * Slice<User>를 List<HeulgitLikeUserResponse>로 변환
	 */
	private List<HeulgitLikeUserResponse> toLikeUserResponse(Slice<User> likedUsers,String githubId){
		return likedUsers.getContent().stream().map(likedUser ->{
			boolean isFollow = relationRepository.existsByFromIdAndToId(githubId,likedUser.getGithubId());

			return HeulgitLikeUserResponse.builder()
				.user(likedUser)
				.follow(isFollow)
				.build();
		}).collect(Collectors.toList());
	}


	// public void fetchAndSaveTopRepositories() {
	// 	int itemsPerPage = 100;
	// 	int totalItemsToFetch = 10;
	//
	// 	List<Heulgit> heulgitList = new ArrayList<>();
	// 	for (int currentPage = 1; currentPage <= totalItemsToFetch; currentPage++) {
	// 		String url = GITHUB_API_URL + "?q=stars:>500+language:shell&sort=stars&order=desc&per_page=" + itemsPerPage + "&page=" + currentPage;
	//
	// 		HttpHeaders headers = new HttpHeaders();
	// 		headers.set("Authorization", "Bearer " + githubApiToken);
	// 		headers.set("X-GitHub-Api-Version", "2022-11-28");
	//
	// 		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);
	//
	// 		try {
	// 			ObjectMapper objectMapper = new ObjectMapper();
	// 			JsonNode rootNode = objectMapper.readTree(response.getBody());
	// 			JsonNode itemsNode = rootNode.get("items");
	//
	// 			if (itemsNode != null && itemsNode.isArray()) {
	// 				for (JsonNode itemNode : itemsNode) {
	// 					String owner = itemNode.get("owner").get("login").asText();
	// 					String repoName = itemNode.get("name").asText();
	// 					String readmeContent = fetchReadmeContent(owner, repoName);
	// 					ZonedDateTime updatedDate = ZonedDateTime.parse(itemNode.get("updated_at").asText());
	// 					Heulgit heulgit = Heulgit.builder()
	// 						.githubId(owner)
	// 						.heulgitName(repoName)
	// 						.content(readmeContent)
	// 						.star(itemNode.get("stargazers_count").asInt())
	// 						.updatedDate(updatedDate)
	// 						.language(itemNode.get("language").asText())
	// 						.view(0)
	// 						.avatarUrl(itemNode.get("owner").get("avatar_url").asText())
	// 						.build();
	//
	// 					heulgitList.add(heulgit);
	// 				}
	// 			}
	// 		} catch (IOException e) {
	// 			e.printStackTrace();
	// 		}
	// 	}
	//
	// 	heulgitRepository.saveAll(heulgitList);
	// }

	// public String fetchReadmeContent(String owner, String repoName) {
	// 	String url = "https://api.github.com/repos/" + owner + "/" + repoName + "/readme";
	//
	// 	HttpHeaders headers = new HttpHeaders();
	// 	headers.set("Authorization", "Bearer " + githubApiToken);
	// 	headers.set("X-GitHub-Api-Version", "2022-11-28");
	//
	//
	// 	try {
	// 		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);
	//
	// 		ObjectMapper objectMapper = new ObjectMapper();
	// 		JsonNode rootNode = objectMapper.readTree(response.getBody());
	// 		String content = rootNode.get("content").asText();
	// 		return content;
	// 	} catch (HttpClientErrorException.NotFound notFoundException) {
	// 		// README 파일이 없는 경우에 대한 처리
	// 		// 예: content 변수에 기본 내용을 설정하거나 null로 설정
	// 		return null;
	// 	} catch (IOException e) {
	// 		e.printStackTrace();
	// 	}
	//
	// 	return null;
	// }



}