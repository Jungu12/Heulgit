package morningrolecall.heulgit.auth.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.auth.util.JwtProvider;
import morningrolecall.heulgit.auth.util.JwtRedisManager;

@Component
@NoArgsConstructor
@AllArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

	private JwtRedisManager jwtRedisManager;
	private JwtProvider jwtProvider;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
		Exception {
		try {
			logger.debug("interceptor 호출==============");
			String refreshToken = jwtProvider.resolveToken(request);
			logger.debug("============interceptor 호출 후 token = {}", refreshToken);

			if (refreshToken == null) {
				logger.debug("토큰 없음");
				return false;
			}

			if (!jwtRedisManager.isJwtExists(jwtProvider.getUserId(refreshToken))) {
				logger.debug("redis에 토큰 없음 cookie안 토큰 = {}", jwtProvider.getUserId(refreshToken));
				return false;
			}

			return true;
		} catch (Exception e) {
			logger.error("Interceptor 예외 발생: {}", e.getMessage());
			// 예외 처리 방식에 따라 처리
			// 예를 들어, 예외를 던지거나 특정 응답을 보낼 수 있습니다.
			return false;
		}
	}
}
