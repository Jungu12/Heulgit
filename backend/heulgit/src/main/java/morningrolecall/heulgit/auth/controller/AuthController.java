package morningrolecall.heulgit.auth.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.auth.dto.OAuthToken;
import morningrolecall.heulgit.auth.service.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class AuthController {
	private Logger logger = LoggerFactory.getLogger(getClass());
	private final AuthService authService;

	/**
	 * 인가 코드를 받아 사용자 여부를 확인
	 * 사용자가 아닌 경우, DB에 github_id, avatar_url, name, bio, company, location을 저장
	 * 이후 github_id를 가지고 JWT 생성 후 반환
	 * */
	@PostMapping("/github")
	public ResponseEntity<?> getCode(@RequestParam("code") String code) {
		logger.debug("getCode(), code = {}", code);
		return ResponseEntity.ok().body(authService.createTokens(code));
	}

	@GetMapping("/refresh-token")
	public ResponseEntity<?> getToken(HttpServletRequest request) {
		logger.debug("getToken(), Token 재발급");

		OAuthToken authToken = authService.reGenerateAuthToken(request);

		if (authToken == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		return ResponseEntity.ok().body(authToken);
	}
}
