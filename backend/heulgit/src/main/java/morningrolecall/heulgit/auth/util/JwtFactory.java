package morningrolecall.heulgit.auth.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.util.AppProperties;

@Component
@RequiredArgsConstructor
public class JwtFactory {
	private final JwtProvider jwtProvider;
	private final AppProperties appProperties;
	private static final String BEARER = "Bearer ";

	public String generateAccessToken(String id) {
		return jwtProvider.generate(id,
			new Date(System.currentTimeMillis() + appProperties.getAuth().getAccessExpiry()));
	}

	public String generateRefreshToken(String id) {
		return jwtProvider.generate(id,
			new Date(System.currentTimeMillis() + appProperties.getAuth().getRefreshExpiry()));
	}
}
