package morningrolecall.heulgit.heulgit.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.NoResultException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.heulgit.domain.Heulgit;
// import morningrolecall.heulgit.heulgit.domain.HeulgitSpecification;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;
import morningrolecall.heulgit.heulgit.domain.HeulgitSpecification;
import morningrolecall.heulgit.heulgit.domain.dto.HeulgitDetailResponse;
import morningrolecall.heulgit.heulgit.repository.HeulgitCommentRepository;
import morningrolecall.heulgit.heulgit.repository.HeulgitRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class HeulgitService {

	private final int SIZE = 20;
	private final String GITHUB_API_URL = "https://api.github.com/search/repositories";
	private final RestTemplate restTemplate;
	private final HeulgitRepository heulgitRepository;
	private final HeulgitCommentRepository heulgitCommentRepository;
	private final UserRepository userRepository;
	private final Logger logger = LoggerFactory.getLogger(getClass());
	/**
	 * 흘깃 목록 조회
	 * 1. 어떻게 할까요...?
	 * 2. 정렬 후 페이지네이션 반환
	 */
	public Slice<HeulgitDetailResponse> findHeulgits(int pages){
		System.out.println("findHeulgits");
		Slice<Heulgit> heulgits = heulgitRepository.findSliceBy(PageRequest.of(pages - 1, 20));
		return new SliceImpl<>(toResponse(heulgits),heulgits.getPageable(), heulgits.hasNext());
	}



	/**
	 * 흘깃 정렬 조회
	 * 1.language: 언어 선택 => 없으면 모든 언어
	 * 2.정렬조건: 좋아요, 스타 수 =>
	 * 3.시작 년, 시작 월 =>
	 * 4.종료 년 , 종료 월 =>
	 * 5.들을 정렬하여 페이지네이션 반환
	 */

	public Page<Heulgit> searchHeulgits(String sort, String language,
		LocalDateTime startDate, LocalDateTime endDate,
		Pageable pageable) {
		Specification<Heulgit> spec = Specification.where(null);

		if(sort != null){
			spec = spec.and(HeulgitSpecification.hasSort(sort));
		}
		if (language != null) {
			spec = spec.and(HeulgitSpecification.hasLanguage(language));
		}

		if (startDate != null && endDate != null) {
			spec = spec.and(HeulgitSpecification.isUpdatedDateBetween(startDate, endDate));
		}

		return heulgitRepository.findAll(spec, pageable);
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
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

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
			.likedUsers(heulgit.getLikedUsers())
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
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(()-> new NoResultException("해당 사용자를 찾을 수 없습니다."));

		if(heulgit.getLikedUsers().contains(user)){
			System.out.println("이미 좋아요를 눌렀음");
			return;
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
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(()-> new NoResultException("해당 사용자를 찾을 수 없습니다."));

		if(!heulgit.getLikedUsers().contains(user)){
			System.out.println("좋아요를 누르지 않았음");
			return;
		}

		heulgit.removeLikeUser(user);

		heulgitRepository.save(heulgit);


	}
	/**
	 * 게시물을 제목으로 검색
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 * */




	/**
	 * 게시물을 작성자 github ID로 검색
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 */


	/**
	 * 사용자 본인의 게시물 반환
	 * 1. 사용자 조회
	 * 2. 사용자의 게시물 반환
	 * */

	/**
	 * 단일 게시물의 좋아요 사용자 목록 반환
	 * */


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