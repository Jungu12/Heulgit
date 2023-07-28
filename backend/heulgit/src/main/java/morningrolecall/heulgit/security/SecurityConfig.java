package morningrolecall.heulgit.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.auth.filter.JwtAuthenticationFilter;
import morningrolecall.heulgit.auth.util.JwtProvider;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtProvider jwtProvider;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.httpBasic().disable()
			.formLogin().disable()
			// JWT, OAuth 2.0을 사용하는 REST API의 경우는 CSRF에 대한 보호가 불필요
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

			.and()

			.authorizeHttpRequests()
			// "/"에 대한 요청은 모두 허용
			.antMatchers("/oauth/**").permitAll()
			// 그 외의 요청은 "USER" 권한이 있으면 가능
			.anyRequest().hasRole("USER")

			.and()

			.addFilterBefore(new JwtAuthenticationFilter(jwtProvider),
				UsernamePasswordAuthenticationFilter.class)
			// 로그아웃은 모두 허용
			.logout(LogoutConfigurer::permitAll);

		return http.build();
	}
}
