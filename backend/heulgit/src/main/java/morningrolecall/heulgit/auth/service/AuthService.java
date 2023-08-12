package morningrolecall.heulgit.auth.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import morningrolecall.heulgit.auth.dto.OAuthToken;
import morningrolecall.heulgit.auth.dto.TokenInfoResponse;
import morningrolecall.heulgit.auth.util.JwtProvider;
import morningrolecall.heulgit.exception.AuthException;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
public class AuthService {
	private final RestTemplate restTemplate;

	private final String clientId;

	private final String clientSecret;

	private final String accessTokenUrl;

	private final String userInfoUrl;

	private final UserRepository userRepository;

	private final JwtProvider jwtProvider;

	public AuthService(RestTemplate restTemplate,
		@Value("${spring.security.oauth2.client.registration.github.client-id}") String clientId,
		@Value("${spring.security.oauth2.client.registration.github.client-secret}") String clientSecret,
		@Value("${github.accesstoken-url}") String accessTokenUrl,
		@Value("${github.userinfo-url}") String userInfoUrl, UserRepository userRepository, JwtProvider jwtProvider) {
		this.restTemplate = restTemplate;
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.accessTokenUrl = accessTokenUrl;
		this.userInfoUrl = userInfoUrl;
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
	}

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

		ResponseEntity<String> response = restTemplate.exchange(
			userInfoUrl,
			HttpMethod.GET,
			requestEntity,
			String.class
		);

		User user = extractUser(response.getBody());

		String githubId = user.getGithubId();
		// 사용자가 처음 서비스를 이용하는 경우
		if (userRepository.findUserByGithubId(githubId).isEmpty()) {
			userRepository.save(user);
		}

		//JWT생성하고, Redis에 Token 저장하는 로직 추가 필요

		// JWT 생성!(수정 예정)
		return new OAuthToken(jwtProvider.generateAccessToken(githubId), jwtProvider.generateRefreshToken(githubId));
	}

	/**
	 * 토큰으로부터 사용자 ID 추출 후 반환
	 * */
	public TokenInfoResponse getUserId(String token) {
		return new TokenInfoResponse(jwtProvider.getUserId(token));
	}

	/**
	 * Refresh Token을 받아 유효성을 검사하고, 유효한 경우는 Access Token과 Refresh Token을 재발급
	 */
	public OAuthToken reGenerateAuthToken(HttpServletRequest request) {
		String refreshToken = jwtProvider.resolveToken(request);

		if (refreshToken == null || !jwtProvider.validateToken(refreshToken)) {
			return null;
		}

		String id = jwtProvider.getUserId(refreshToken);

		return new OAuthToken(jwtProvider.generateAccessToken(id), jwtProvider.generateRefreshToken(id));
	}

	/**
	 * 인가 코드를 통해 Github로부터 액세스 토큰을 발급받아 반환
	 * @param code 인가 코드
	 * @return String 액세스 토큰
	 * */
	private String getAccessToken(String code) {
		return extractAccessToken(requestAccessToken(code).getBody());
	}

	/**
	 * 주어진 정보로부터 User 객체를 생성해 반환
	 * @param data
	 * @return User
	 * */
	private User extractUser(String data) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(data);

			return new User(jsonNode.get("login").asText(), jsonNode.get("avatar_url").asText(),
				jsonNode.get("name").asText(),
				jsonNode.get("bio").asText(), jsonNode.get("company").asText(), jsonNode.get("location").asText(),
				jsonNode.get("blog").asText());
		} catch (Exception e) {
			throw new AuthException(ExceptionCode.USER_CREATED_FAILED);
		}
	}

	/**
	 * 주어진 응답으로부터 Access Token을 추출해 반환
	 * @param response 데이터
	 * @return String Access Token 또는 null
	 * */
	private String extractAccessToken(String response) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(response);

			return jsonNode.get("access_token").asText();
		} catch (Exception e) {
			throw new AuthException(ExceptionCode.GITHUB_TOKEN_RESPONSE_FAILED);
		}
	}

	private ResponseEntity<String> requestAccessToken(String code) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Accept", "application/json");

			HttpEntity<String> requestEntity = new HttpEntity<>(headers);

			return restTemplate.exchange(
				accessTokenUrl + "?client_id=" + clientId + "&client_secret=" + clientSecret + "&code=" + code,
				HttpMethod.POST,
				requestEntity,
				String.class
			);
		} catch (Exception e) {
			throw new AuthException(ExceptionCode.GITHUB_ACCESS_TOKEN_FETCH_FAILED);
		}
	}
}
