package morningrolecall.heulgit.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.auth.dto.OAuthToken;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final RestTemplate restTemplate;

	@Value("${spring.security.oauth2.client.registration.github.client-id}")
	private final String clientId;

	@Value("${spring.security.oauth2.client.registration.github.client-secret}")
	private final String clientSecret;

	@Value("${github.accesstoken-url}")
	private final String accessTokenUrl;

	@Value("${github.userinfo-url}")
	private final String userInfoUrl;

	/**
	 * 인가 코드를 받아 액세스 토큰을 발급 받고, 이를 통해 사용자의 정보를 조회해 JWT 생성 및 반환
	 * @param code 인가 코드
	 * @return Map Access Token, Refresh Token
	 * */
	public OAuthToken createTokens(String code) {
		String accessToken = getAccessToken(code);

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		headers.set("Accept", "application/json");

		HttpEntity<String> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<OAuthToken> response = restTemplate.exchange(
			userInfoUrl,
			HttpMethod.GET,
			requestEntity,
			OAuthToken.class
		);

		// TODO 사용자 정보 추출해서, DB 확인, JWT 생성 필요
		System.out.println(response.getBody());

		OAuthToken tokens = new OAuthToken();

		return tokens;
	}

	/**
	 * 인가 코드를 통해 Github로부터 액세스 토큰을 발급받아 반환
	 * @param code 인가 코드
	 * @return String 액세스 토큰
	 * */
	private String getAccessToken(String code) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", "application/json");

		HttpEntity<String> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<String> response = restTemplate.exchange(
			accessTokenUrl + "?client_id=" + clientId + "&client_secret=" + clientSecret + "&code=" + code,
			HttpMethod.POST,
			requestEntity,
			String.class
		);

		String accessTokenResponse = response.getBody();
		if (accessTokenResponse != null) {
			return accessTokenResponse;
		} else {
			throw new RuntimeException("[Exception] Access Token을 얻는데 실패했습니다.");
		}
	}
}
