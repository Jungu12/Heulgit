package morningrolecall.heulgit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

// import springfox.documentation.builders.ApiInfoBuilder;
// import springfox.documentation.builders.PathSelectors;
// import springfox.documentation.builders.RequestHandlerSelectors;
// import springfox.documentation.service.ApiInfo;
// import springfox.documentation.spi.DocumentationType;
// import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class WebConfig {

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	// @Bean
	// public Docket api() {
	// 	return new Docket(DocumentationType.OAS_30)
	// 		.apiInfo(apiInfo())
	// 		.useDefaultResponseMessages(false)
	// 		.select()
	// 		.apis(RequestHandlerSelectors.basePackage("morningrolecall.heulgit"))
	// 		.paths(PathSelectors.any())
	// 		.build()
	// 		.host("http://localhost:8080");
	// }
	//
	// private ApiInfo apiInfo() {
	// 	return new ApiInfoBuilder()
	// 		.title("HeulGit APIs")
	// 		.description("HeulGit 서비스를 위한 API 명세입니다.")
	// 		.version("1.0.0")
	// 		.build();
	// }
}