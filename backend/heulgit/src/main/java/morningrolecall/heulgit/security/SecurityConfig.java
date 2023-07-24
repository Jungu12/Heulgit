package morningrolecall.heulgit.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			// CORS 설정
			.cors()
			.and()
			// JWT, OAuth 2.0을 사용하는 REST API의 경우는 CSRF에 대한 보호가 불필요
			.csrf().disable()
			.authorizeHttpRequests((requests) -> requests
				// "/", "/oauth/**"에 대한 요청은 모두 허용
				.antMatchers("/", "/oauth/**").permitAll()
				// 그 외의 요청은 모두 인증 필요
				.anyRequest().authenticated()
			)
			// 로그아웃은 모두 허용
			.logout((logout) -> logout.permitAll());

		return http.build();
	}
}
