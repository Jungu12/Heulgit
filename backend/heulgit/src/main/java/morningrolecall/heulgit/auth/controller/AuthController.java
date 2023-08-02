package morningrolecall.heulgit.auth.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.auth.dto.AccessTokenResponse;
import morningrolecall.heulgit.auth.dto.CodeDto;
import morningrolecall.heulgit.auth.dto.OAuthToken;
import morningrolecall.heulgit.auth.service.AuthService;
import morningrolecall.heulgit.auth.util.CookieProvider;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class AuthController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final AuthService authService;

	/**
	 * 인가 코드를 받아 사용자 여부를 확인
	 * 사용자가 아닌 경우, DB에 github_id, avatar_url, name, bio, company, location을 저장
	 * 이후 github_id를 가지고 JWT 생성 후 반환
	 * Access Token : AccessTokenResponse
	 * Refresh Token : httpOnly Cookie
	 * */
	@PostMapping("/github")
	public ResponseEntity<?> getCode(@RequestBody CodeDto codeDto, HttpServletResponse response) {
		logger.debug("getCode(), code = {}", codeDto.getCode());

		OAuthToken oAuthToken = authService.createTokens(codeDto.getCode());
		response.addCookie(CookieProvider.createCookie(oAuthToken.getRefreshToken()));

		return ResponseEntity.ok().body(new AccessTokenResponse(oAuthToken.getAccessToken()));
	}

	/**
	 * 사용자의 Refresh Token을 받아 OAuthToken 재발급
	 * 유효한 경우, 재발급
	 * Access Token : AccessTokenResponse
	 * Refresh Token : httpOnly Cookie
	 * */
	@GetMapping("/refresh-token")
	public ResponseEntity<?> getToken(HttpServletRequest request, HttpServletResponse response) {
		logger.debug("getToken(), Token 재발급");

		OAuthToken oAuthToken = authService.reGenerateAuthToken(request);

		if (oAuthToken == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		response.addCookie(CookieProvider.createCookie(oAuthToken.getRefreshToken()));

		return ResponseEntity.ok().body(new AccessTokenResponse(oAuthToken.getAccessToken()));
	}
}
