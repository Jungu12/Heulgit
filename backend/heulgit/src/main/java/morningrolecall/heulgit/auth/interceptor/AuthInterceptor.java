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
		String refreshToken = jwtProvider.resolveToken(request);
		logger.debug("interceptor 호출 후 token = {}", refreshToken);

		//토큰이 없는 경우
		if (refreshToken.equals("")) {
			return false;
		}

		//토큰이 로그아웃(redis에서 삭제)처리 된 경우
		if (!jwtRedisManager.isJwtExists(jwtProvider.getUserId(refreshToken))) {
			return false;
		}

		return true;
	}
}
