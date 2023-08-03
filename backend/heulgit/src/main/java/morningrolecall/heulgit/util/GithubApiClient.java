package morningrolecall.heulgit.util;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GithubApiClient {
	private final RestTemplate restTemplate;

	/**
	 * Github로부터 이슈 또는 풀리퀘스트의 정보 요청
	 * */
	public String requestGithubInfo(String url) {
		String githubInfoUrl = "https://api.github.com/repos/" + parseInfo(url);
		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", "application/json");

		HttpEntity<String> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<String> response = restTemplate.exchange(
			githubInfoUrl,
			HttpMethod.GET,
			requestEntity,
			String.class
		);

		return response.getBody();
	}

	/**
	 * 이슈(풀리퀘스트) 링크로부터 사용자, 레포명, 이슈(풀리퀘스트) 번호 추출
	 * */
	public String parseInfo(String url) {
		if (!url.contains(".com/")) {
			System.out.println("URL이 잘못되었습니다.");
			return null;
		}

		String[] afterDotCom = url.substring(url.indexOf(".com/") + 5).split("/");
		StringBuilder result = new StringBuilder();

		for (int index = 0; index < afterDotCom.length; index++) {
			if (index == afterDotCom.length - 2 && afterDotCom[index].equals("pull")) {
				result.append("pulls/");
				continue;
			}
			result.append(afterDotCom[index]);

			if (index != afterDotCom.length - 1) {
				result.append("/");
			}
		}

		return result.toString();
	}
}
