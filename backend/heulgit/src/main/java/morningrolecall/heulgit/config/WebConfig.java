package morningrolecall.heulgit.config;

import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.AllArgsConstructor;
import morningrolecall.heulgit.auth.interceptor.AuthInterceptor;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
@AllArgsConstructor
public class WebConfig implements WebMvcConfigurer {

	private final AuthInterceptor authInterceptor;

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.OAS_30)
			.apiInfo(apiInfo())
			.securityContexts(Collections.singletonList(securityContext()))
			.securitySchemes(List.of(apiKey()))
			.useDefaultResponseMessages(false)
			.select()
			.apis(RequestHandlerSelectors.basePackage("morningrolecall.heulgit"))
			.paths(PathSelectors.any())
			.build()
			.host("http://i9d211.p.ssafy.io");
	}

	// @Override
	// public void addInterceptors(InterceptorRegistry registry) {
	// 	registry.addInterceptor(authInterceptor)
	// 		.addPathPatterns("/**") // 모든 경로에 대해 인터셉터 적용
	// 		.excludePathPatterns("/api/oauth/**", // oauth 관련 경로 제외
	// 			"/v3/api-docs/**",
	// 			"/swagger-ui/**",
	// 			"/favicon.ico",
	// 			"/swagger-resources/**");
	// }

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
			.title("HeulGit APIs")
			.description("HeulGit 서비스를 위한 API 명세입니다.")
			.version("1.0.0")
			.build();
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder()
			.securityReferences(defaultAuth())
			.build();
	}

	private List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return List.of(new SecurityReference("Authorization", authorizationScopes));
	}

	private ApiKey apiKey() {
		return new ApiKey("Authorization", "Authorization", "header");
	}
}