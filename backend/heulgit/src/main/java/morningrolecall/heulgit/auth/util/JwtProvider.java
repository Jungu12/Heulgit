package morningrolecall.heulgit.auth.util;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import morningrolecall.heulgit.util.AppProperties;

@Component
public class JwtProvider {
	private final AppProperties appProperties;
	private final Key key;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	public JwtProvider(@Value("${jwt.secret-key}") String secretKey, AppProperties appProperties) {
		this.appProperties = appProperties;
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public String generateAccessToken(String id) {
		return generate(id,
			getExpiryDate((int)appProperties.getAuth().getAccessExpiry()));
	}

	public String generateRefreshToken(String id) {
		return generate(id,
			getExpiryDate((int)appProperties.getAuth().getRefreshExpiry()));
	}

	public String generate(String subject, Date expiredAt) {
		return Jwts.builder()
			.setSubject(subject)
			.setExpiration(expiredAt)
			.signWith(key, SignatureAlgorithm.HS512)
			.compact();
	}

	// JWT 유효성 검사
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

	// JWT에서 사용자 ID 추출
	public String getUserId(String token) {
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
		} catch (ExpiredJwtException ex) {
			// 토큰이 만료된 경우
			// 토큰 갱신 또는 로그아웃 등 수행
			return null;
		}
	}

	// 요청 헤더에서 JWT 추출
	// public String resolveToken(HttpServletRequest request) {
	// 	String bearerToken = request.getHeader("Authorization");
	// 	if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
	// 		return bearerToken.substring(7);
	// 	}
	// 	return null;
	// }

	// 요청 헤더에서 JWT 추출
	public String resolveToken(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();

		// logger.debug("cookie size = {}", cookies.length);
		for (Cookie cookie : cookies) {
			// logger.debug("cookie name = {}", cookie.getName());
			if (cookie.getName().equals("refreshToken")) {
				// logger.debug("cookie name = {}, value = {}", cookie.getName(), cookie.getValue());
				return cookie.getValue();
			}
		}
		return null;
	}

	// 유효 기간을 받아, 만료 날짜를 반환
	private Date getExpiryDate(int expiry) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.MILLISECOND, expiry);

		return calendar.getTime();
	}
}
