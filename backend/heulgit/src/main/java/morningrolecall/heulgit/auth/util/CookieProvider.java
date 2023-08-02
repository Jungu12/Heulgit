package morningrolecall.heulgit.auth.util;

import javax.servlet.http.Cookie;

public class CookieProvider {
	public static Cookie createCookie(String token) {
		Cookie cookie = new Cookie("refreshToken", token);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		// https 설정
		cookie.setSecure(true);
		cookie.setMaxAge(60 * 60 * 24 * 7); // 7일 유지
		return cookie;
	}
}
