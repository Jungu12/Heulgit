package morningrolecall.heulgit.user.controller;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import morningrolecall.heulgit.auth.service.AuthService;
import morningrolecall.heulgit.auth.util.CookieManager;
import morningrolecall.heulgit.user.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;
	private final AuthService authService;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 사용자를 logout시킨다.
	 * Redis에 저장된 토큰을 삭제하고, 쿠키에 실린 토큰을 지운다.
	 * @param refreshToken
	 * @param response
	 * @return
	 */
	@GetMapping("/logout")
	public ResponseEntity<?> logout(@CookieValue(name = "refreshToken") String refreshToken,
		HttpServletResponse response) {
		if (refreshToken != null) {
			String userId = authService.getUserId(refreshToken).getGithubId();
			//Redis 저장소에 저장 된 토큰 삭제
			userService.logout(userId);

			response.addHeader("Set-Cookie", CookieManager.expireCookie(userId).toString());

		}
		return ResponseEntity.ok().build();
	}

	/**
	 * 유저에 대한 정보를 반환한다.
	 * @param githubId
	 * @return
	 */
	@GetMapping("")
	public ResponseEntity<?> userDetail(@AuthenticationPrincipal String githubId) {
		logger.debug("userDetail(), githubId = {}", githubId);

		return ResponseEntity.ok().body(userService.findUser(githubId));
	}

	// @GetMapping("/commit-analyze/{githubId}")
	// public ResponseEntity commitInfoList(@PathVariable String githubId) {
	// 	logger.debug("commitList(), githubId = {}", githubId);
	//
	// 	return ResponseEntity.ok().body(userService.findCommitInfo());
	// }
}
