package morningrolecall.heulgit.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import morningrolecall.heulgit.auth.service.AuthService;
import morningrolecall.heulgit.user.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;
	private final AuthService authService;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@GetMapping("/{githubId}")
	public ResponseEntity<?> userDetail(@RequestParam String githubId) {
		logger.debug("userDetail(), githubId = {}", githubId);

		return ResponseEntity.ok().body(userService.findUser(githubId));
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logout(@CookieValue(name = "refreshToken") String refreshToken) {
		if (refreshToken != null) {
			String userId = authService.getUserId(refreshToken).getGithubId();
			userService.logout(userId);
		}
		return ResponseEntity.ok().build();
	}
}
