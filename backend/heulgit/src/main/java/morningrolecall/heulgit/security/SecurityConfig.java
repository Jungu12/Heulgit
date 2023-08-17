package morningrolecall.heulgit.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.auth.filter.JwtAuthenticationFilter;
import morningrolecall.heulgit.auth.util.JwtProvider;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtProvider jwtProvider;
	private static final String[] PERMIT_URLS = {
		/* swagger v3 */
		"/v3/**",
		"/swagger-ui/**",
		"/swagger-resources/**",
		/* OAuth */
		"/oauth/**",
		/* SockJS */
		"/gm/info"
	};

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		config.setAllowedOrigins(
			List.of("http://localhost:3000", "https://i9d211.p.ssafy.io", "http://192.168.100.58:3000"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setExposedHeaders(List.of("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.cors()
			.and()
			.httpBasic().disable()
			.formLogin().disable()
			// JWT, OAuth 2.0을 사용하는 REST API의 경우는 CSRF에 대한 보호가 불필요
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

			.and()

			.authorizeHttpRequests()
			// "/oauth/**"에 대한 요청은 모두 허용
			.antMatchers(PERMIT_URLS).permitAll()
			// 그 외의 요청은 "USER" 권한이 있으면 가능
			// .anyRequest().hasRole("USER")
			.anyRequest().permitAll()

			.and()

			.addFilterBefore(new JwtAuthenticationFilter(jwtProvider),
				UsernamePasswordAuthenticationFilter.class)
			// 로그아웃은 모두 허용
			.logout(LogoutConfigurer::permitAll);

		return http.build();
	}
}
