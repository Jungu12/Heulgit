package morningrolecall.heulgit.auth.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
		Exception {
		String refreshToken = jwtProvider.resolveToken(request);
		if (refreshToken == null) {
			return false;
		}

		if (!jwtRedisManager.isJwtExists(jwtProvider.getUserId(refreshToken))) {
			return false;
		}
		
		return true;
	}
}
