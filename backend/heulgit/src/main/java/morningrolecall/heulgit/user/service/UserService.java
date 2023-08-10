package morningrolecall.heulgit.user.service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.auth.repository.AuthRepository;
import morningrolecall.heulgit.exception.AuthException;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.UserException;
import morningrolecall.heulgit.user.domain.CommitAnalyze;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.domain.dto.CommitType;
import morningrolecall.heulgit.user.domain.dto.GitRepository;
import morningrolecall.heulgit.user.domain.dto.RankingInfo;
import morningrolecall.heulgit.user.repository.CommitAnalyzeRepository;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final AuthRepository authRepository;
	private final CommitAnalyzeRepository commitAnalyzeRepository;
	private final RestTemplate restTemplate;
	@Value("${github.user.repo-url}")
	private String userInfoUrl;
	@Value("${github.user.repo.commit-url}")
	private String commitUrl;
	@Value("${github.api.token}")
	private final String githubApiToken = "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";

	public void logout(String userId) {
		int deleteCount = authRepository.deleteJwt(userId);

		if (deleteCount == 0) {
			throw new AuthException(ExceptionCode.TOKEN_DELETE_FAILED);
		}
	}

	public User findUser(String githubId) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new UserException(ExceptionCode.USER_NOT_FOUND));
		return user;
	}

	public Object findCommitInfo(String githubId) {
		// 해당 사용자의 모든 repo를 긁어 온다(공식 api)
		ResponseEntity<String> response = getRepoInfo(githubId);

		//사용자의 모든 repo 저장하는 List
		List<GitRepository> tmpRepos = extractRepos(response.getBody());
		//사용자의 한달 내로 업데이트 된 repo 저장하는 List
		List<GitRepository> repos = findUpdatedRepoInOneMonth(tmpRepos);

		//  db에 저장 된 commitTypes들을 들고 온다.
		List<CommitAnalyze> commits = commitAnalyzeRepository.findAllByGithubId(githubId);

		// 모든 레포를 돌면서 commit type이 일치하는게 있는지 확인하고 있다면 value + 1
		Map<String, Integer> commitInfo = new HashMap<>();
		commitInfo.put("etc", 0);
		for (CommitAnalyze commit : commits) {
			commitInfo.put(commit.getType(), 0);
		}

		// 해당 사용자의 commit message를 긁어 온다(공식 api)
		List<String> commitMessages = new ArrayList<>();
		for (GitRepository repo : repos) {
			response = getCommitMessageInfo(githubId, repo.getName());
			commitMessages.addAll(extractCommits(response.getBody()));
		}

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

		return commitInfo;
	}

	public ResponseEntity<String> getRepoInfo(String githubId) {
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

		return response;
	}

	public ResponseEntity<String> getCommitMessageInfo(String githubId, String repoName) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", "application/json");
		headers.set("Authorization", "Bearer " + githubApiToken);
		headers.set("X-GitHub-Api-Version", "2022-11-28");

		HttpEntity<String> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<String> response = restTemplate.exchange(
			commitUrl + "/" + githubId + "/" + repoName + "/commits",
			HttpMethod.GET,
			requestEntity,
			String.class
		);

		return response;
	}

	public List<RankingInfo> getRankingInfo(String githubId, String type) {
		List<RankingInfo> rankingInfos = new ArrayList<>();

		return null;
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
			throw new AuthException(ExceptionCode.COMMIT_MESSAGE_NOT_FOUND);
		}

		return commits;
	}

	public List<GitRepository> extractRepos(String data) {
		List<GitRepository> gitRepositories = new ArrayList<>();

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(data);

			for (JsonNode repo : jsonNode) {
				GitRepository gitRepository = new GitRepository(repo.get("name").asText(),
					repo.get("updated_at").asText());
				gitRepositories.add(gitRepository);
			}
		} catch (Exception e) {
			throw new AuthException(ExceptionCode.REPOSITORY_NOT_FOUND);
		}
		return gitRepositories;
	}

	public List<GitRepository> findUpdatedRepoInOneMonth(List<GitRepository> tmpRepos) {
		List<GitRepository> repos = new ArrayList<>();

		for (GitRepository tmpRepo : tmpRepos) {
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
	public void modifyCommitType(String githubId, List<CommitType> commitTypes) {
		//나의 커밋 타입 모두 삭제
		commitAnalyzeRepository.deleteAllByGithubId(githubId);

		//새로 커스텀한 커밋 타입 저장
		for (CommitType commitType : commitTypes) {
			CommitAnalyze commitAnalyze = CommitAnalyze.builder()
				.githubId(githubId)
				.type(commitType.getType())
				.description(commitType.getDescription())
				.build();

			commitAnalyzeRepository.save(commitAnalyze);
		}
	}
}