package morningrolecall.heulgit.auth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
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
		logger.debug("code : " + code);
		return ResponseEntity.ok().body(authService.createTokens(code));
	}
}
