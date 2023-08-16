package morningrolecall.heulgit.user.service;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
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
import morningrolecall.heulgit.auth.util.JwtRedisManager;
import morningrolecall.heulgit.exception.AuthException;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.UserException;
import morningrolecall.heulgit.heulgit.domain.Heulgit;
import morningrolecall.heulgit.heulgit.repository.HeulgitRepository;
import morningrolecall.heulgit.relation.domain.Relation;
import morningrolecall.heulgit.relation.repository.RelationRepository;
import morningrolecall.heulgit.relation.service.RelationService;
import morningrolecall.heulgit.user.domain.CommitAnalyze;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.domain.dto.UserCommentResponse;
import morningrolecall.heulgit.user.domain.dto.UserCommitInfoResponse;
import morningrolecall.heulgit.user.domain.dto.UserCommitTypeRequest;
import morningrolecall.heulgit.user.domain.dto.UserDetail;
import morningrolecall.heulgit.user.domain.dto.UserRankingResponse;
import morningrolecall.heulgit.user.domain.dto.UserRepositoryResponse;
import morningrolecall.heulgit.user.repository.CommitAnalyzeRepository;
import morningrolecall.heulgit.user.repository.UserCommentRepository;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

	private final RelationService relationService;
	private final UserRepository userRepository;
	private final JwtRedisManager jwtRedisManager;
	private final CommitAnalyzeRepository commitAnalyzeRepository;
	private final RelationRepository relationRepository;
	private final UserCommentRepository userCommentRepository;
	private final RestTemplate restTemplate;
	private final int SIZE = 20;
	private final HeulgitRepository heulgitRepository;

	@Value("${github.user.repo-url}")
	private String userInfoUrl;
	@Value("${github.user.repo.commit-url}")
	private String commitUrl;
	@Value("${github.api.token}")
	private String githubApiToken;

	public void logout(String userId) {
		int deleteCount = jwtRedisManager.deleteJwt(userId);

		if (deleteCount == 0) {
			throw new AuthException(ExceptionCode.TOKEN_DELETE_FAILED);
		}
	}

	public User findUser(String githubId) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new UserException(ExceptionCode.USER_NOT_FOUND));
		return user;
	}
	public List<User> findContainUser(String githubId) {

		return userRepository.findByGithubIdContaining(githubId);
	}

	public List<UserCommitInfoResponse> findCommitInfo(String githubId) {
		// 해당 사용자의 1달 내 update된 repo를 긁어 온다(공식 api)
		List<UserRepositoryResponse> repos = getRepoInfo(githubId);

		//  db에 저장 된 commitTypes들을 들고 온다.
		List<CommitAnalyze> commits = getMyCommitType(githubId);

		// 모든 레포를 돌면서 commit type이 일치하는게 있는지 확인하고 있다면 value + 1
		Map<String, Integer> commitInfo = new HashMap<>();
		commitInfo.put("etc", 0);

		for (CommitAnalyze commit : commits) {
			commitInfo.put(commit.getType(), 0);
		}

		// 해당 사용자의 commit message를 긁어 온다(공식 api)
		List<String> commitMessages = getCommitMessageInfo(githubId, repos);

		//commit message List에서 commit type 파싱
		for (String commitMessage : commitMessages) {
			String[] commit = commitMessage.split("\\(");
			String commitType = commit[0];

			if (commitInfo.containsKey(commitType)) {
				commitInfo.put(commitType, commitInfo.get(commitType) + 1);
			} else {
				commitInfo.put("etc", commitInfo.get("etc") + 1);
			}
		}

		List<UserCommitInfoResponse> commitInfos = new ArrayList<>();
		for (Map.Entry<String, Integer> entry : commitInfo.entrySet()) {
			commitInfos.add(UserCommitInfoResponse.builder()
				.type(entry.getKey())
				.count(entry.getValue())
				.build());
		}

		return commitInfos;
	}

	public List<CommitAnalyze> getMyCommitType(String githubId) {
		return commitAnalyzeRepository.findAllByGithubId(githubId);
	}

	public List<UserRepositoryResponse> getRepoInfo(String githubId) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", "application/json");
		headers.set("Authorization", "Bearer " + githubApiToken);
		headers.set("X-GitHub-Api-Version", "2022-11-28");

		HttpEntity<String> requestEntity = new HttpEntity<>(headers);

		// 해당 사용자의 모든 repo를 긁어 온다(공식 api)
		ResponseEntity<String> response = restTemplate.exchange(
			userInfoUrl + "/" + githubId + "/repos",
			HttpMethod.GET,
			requestEntity,
			String.class
		);

		//사용자의 모든 repo 저장하는 List
		List<UserRepositoryResponse> tmpRepos = extractRepos(response.getBody());
		//사용자의 한달 내로 업데이트 된 repo 저장하는 List
		List<UserRepositoryResponse> repos = findUpdatedRepoInOneMonth(tmpRepos);

		return repos;
	}

	public List<String> getCommitMessageInfo(String githubId, List<UserRepositoryResponse> repos) {
		List<String> commitMessages = new ArrayList<>();
		for (UserRepositoryResponse repo : repos) {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Accept", "application/json");
			headers.set("Authorization", "Bearer " + githubApiToken);
			headers.set("X-GitHub-Api-Version", "2022-11-28");

			HttpEntity<String> requestEntity = new HttpEntity<>(headers);

			ResponseEntity<String> response = restTemplate.exchange(
				commitUrl + "/" + githubId + "/" + repo.getName() + "/commits",
				HttpMethod.GET,
				requestEntity,
				String.class
			);

			commitMessages.addAll(extractCommits(response.getBody()));
		}
		return commitMessages;
	}

	public List<UserRankingResponse> getRankingInfo(String githubId, String type) {
		List<UserRankingResponse> userRankingResponses = new ArrayList<>();

		//내가 팔로우 한 유저 가져오기 (DB)
		List<Relation> relations = relationRepository.findByFromId(githubId);
		List<String> followings;

		if (relations.isEmpty()) {
			followings = new ArrayList<>();
		} else {
			//내가 팔로우 하는 유저 목록
			followings = relations.stream().map(Relation::getToId).collect(Collectors.toList());
		}
		followings.add(githubId);

		for (String following : followings) {
			// 유저의 한달 내 repo 긁어오기 (github API)
			List<UserRepositoryResponse> repos = getRepoInfo(following);
			// 유저의 한달 내 repo 안의 커밋 긁어오기 (github API)
			List<String> commitMessages = getCommitMessageInfo(following, repos);

			int count = 0;

			for (String commitMessage : commitMessages) {
				String[] commit = commitMessage.split(":");
				String commitType = commit[0];

				if (commitType.contains(type)) {
					count++;
				}
			}

			userRankingResponses.add(new UserRankingResponse(following, count));
		}
		Collections.sort(userRankingResponses, ((o1, o2) -> o2.getCount() - o1.getCount()));

		// type과 일치하는 commit message 개수 count
		return userRankingResponses;
	}

	public List<String> extractCommits(String data) {
		List<String> commits = new ArrayList<>();

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(data);

			for (JsonNode commit : jsonNode) {
				String commitMessage = commit.get("commit").get("message").asText();
				commits.add(commitMessage);
			}
		} catch (Exception e) {
			throw new UserException(ExceptionCode.COMMIT_MESSAGE_NOT_FOUND);
		}

		return commits;
	}

	public List<UserRepositoryResponse> extractRepos(String data) {
		List<UserRepositoryResponse> gitRepositories = new ArrayList<>();

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(data);

			for (JsonNode repo : jsonNode) {
				UserRepositoryResponse userRepositoryResponse = new UserRepositoryResponse(repo.get("name").asText(),
					repo.get("updated_at").asText());
				gitRepositories.add(userRepositoryResponse);
			}
		} catch (Exception e) {
			throw new AuthException(ExceptionCode.REPOSITORY_NOT_FOUND);
		}
		return gitRepositories;
	}

	public List<UserRepositoryResponse> findUpdatedRepoInOneMonth(List<UserRepositoryResponse> tmpRepos) {
		List<UserRepositoryResponse> repos = new ArrayList<>();

		for (UserRepositoryResponse tmpRepo : tmpRepos) {
			// 현재 시간 가져오기
			Instant now = Instant.now();

			// updated_at 값을 파싱하여 LocalDateTime으로 변환
			LocalDateTime updatedAtDateTime = LocalDateTime.parse(tmpRepo.getUpdatedAt(),
				DateTimeFormatter.ISO_DATE_TIME);

			// updated_at 시간을 인스턴트로 변환
			Instant updatedAtInstant = updatedAtDateTime.atZone(ZoneId.of("UTC")).toInstant();

			// 현재 시간과 updated_at 시간 사이의 Duration 계산
			Duration duration = Duration.between(updatedAtInstant, now);

			// 1달 이내인지 확인
			if (duration.toDays() <= 30) {
				repos.add(tmpRepo);
			}
		}

		return repos;
	}

	@Transactional
	public void modifyCommitType(String githubId, List<UserCommitTypeRequest> userCommitTypeRespons) {
		//나의 커밋 타입 모두 삭제
		commitAnalyzeRepository.deleteAllByGithubId(githubId);

		//새로 커스텀한 커밋 타입 저장
		for (UserCommitTypeRequest userCommitTypeRequest : userCommitTypeRespons) {
			CommitAnalyze commitAnalyze = CommitAnalyze.builder()
				.githubId(githubId)
				.type(userCommitTypeRequest.getType())
				.description(userCommitTypeRequest.getDescription())
				.build();

			commitAnalyzeRepository.save(commitAnalyze);
		}
	}

	public List<UserDetail> findFollowingsByKeyword(String githubId, String keyword) {
		return relationService.getFollowingsByKeyword(githubId, keyword);
	}

	public Slice<UserCommentResponse> findMyLikesComments(String githubId, int page) {
		Slice<UserCommentResponse> myLikesComments = userCommentRepository.fetchCommentsByUser(githubId,
			PageRequest.of(page - 1, SIZE, Sort.by("updatedDate").descending()));

		return myLikesComments;
	}

	public void fetchAndSaveUserRespositories(String githubId) {
		List<Heulgit> heulgitList = new ArrayList<>();

		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", "application/json");
		headers.set("Authorization", "Bearer " + githubApiToken);
		headers.set("X-GitHub-Api-Version", "2022-11-28");

		HttpEntity<String> requestEntity = new HttpEntity<>(headers);

		// 해당 사용자의 모든 repo를 긁어 온다(공식 api)
		ResponseEntity<String> response = restTemplate.exchange(
			userInfoUrl + "/" + githubId + "/repos",
			HttpMethod.GET,
			requestEntity,
			String.class
		);
		System.out.print("정보 불러오기 실행!!!");

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode rootNode = objectMapper.readTree(response.getBody());
			if (rootNode.isArray()) {
				for (JsonNode repositoryNode : rootNode) {
					String owner = repositoryNode.get("owner").get("login").asText();
					String repoName = repositoryNode.get("name").asText();
					String readmeContent = fetchReadmeContent(owner, repoName);
					ZonedDateTime updatedDate = ZonedDateTime.parse(repositoryNode.get("updated_at").asText());

					Heulgit heulgit = Heulgit.builder()
						.githubId(owner)
						.heulgitName(repoName)
						.content(readmeContent)
						.star(repositoryNode.get("stargazers_count").asInt())
						.updatedDate(updatedDate.toLocalDateTime())
						.language(repositoryNode.get("language").asText())
						.view(0)
						.avatarUrl(repositoryNode.get("owner").get("avatar_url").asText())
						.build();

					heulgitList.add(heulgit);
				}

			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 이건 전체 저장.
		// heulgitRepository.saveAll(heulgitList);
		for (Heulgit heulgit : heulgitList) {
			Optional<Heulgit> existingHeulgit = heulgitRepository.findByGithubIdAndHeulgitName(heulgit.getGithubId(),
				heulgit.getHeulgitName());
			if (existingHeulgit.isPresent()) {
				Heulgit storedHeulgit = existingHeulgit.get();
				// DB에 저장된 정보의 업데이트 날짜와 현재 가져온 정보의 업데이트 날짜를 비교하여 최신화 여부 판단
				if (storedHeulgit.getUpdatedDate().isBefore(heulgit.getUpdatedDate())) {
					// 업데이트 날짜가 최신화 되었으면 기존 정보 업데이트
					Heulgit updatedHeulgit = Heulgit.builder()
						.githubId(storedHeulgit.getGithubId())
						.heulgitName(storedHeulgit.getHeulgitName())
						.content(heulgit.getContent())
						.star(heulgit.getStar())
						.updatedDate(heulgit.getUpdatedDate())
						.language(heulgit.getLanguage())
						.view(heulgit.getView())
						.avatarUrl(storedHeulgit.getAvatarUrl())
						.build();

					// 나머지 필요한 정보도 업데이트하거나 추가 가능
					heulgitRepository.save(updatedHeulgit);
				}
			} else {
				// DB에 저장된 정보가 없으면 새로 저장
				heulgitRepository.save(heulgit);
			}
		}

	}

	public String fetchReadmeContent(String owner, String repoName) {
		String url = "https://api.github.com/repos/" + owner + "/" + repoName + "/readme";

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + githubApiToken);
		headers.set("X-GitHub-Api-Version", "2022-11-28");

		try {
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
				String.class);

			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode rootNode = objectMapper.readTree(response.getBody());
			String content = rootNode.get("content").asText();
			return content;
		} catch (HttpClientErrorException.NotFound notFoundException) {
			return null;
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

}
