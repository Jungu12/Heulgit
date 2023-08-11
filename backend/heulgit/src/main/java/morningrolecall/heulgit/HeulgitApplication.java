package morningrolecall.heulgit;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import morningrolecall.heulgit.util.AppProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
@EnableJpaAuditing
public class HeulgitApplication {

	@PostConstruct
	public void setTimeZone(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

	public static void main(String[] args) {
		SpringApplication.run(HeulgitApplication.class, args);
	}


}
