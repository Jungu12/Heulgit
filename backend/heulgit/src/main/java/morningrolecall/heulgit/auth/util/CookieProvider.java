package morningrolecall.heulgit.auth.util;

import org.springframework.http.ResponseCookie;

public class CookieProvider {
	public static ResponseCookie createCookie(String token) {
		return ResponseCookie.from("refreshToken", token)
			.path("/")
			.httpOnly(true)
			.maxAge(60 * 60 * 24 * 7)
			.secure(true)
			.sameSite("None")
			.build();
	}
}
