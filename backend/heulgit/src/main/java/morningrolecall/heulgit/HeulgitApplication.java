package morningrolecall.heulgit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import morningrolecall.heulgit.util.AppProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class HeulgitApplication {

	public static void main(String[] args) {
		SpringApplication.run(HeulgitApplication.class, args);
	}

}
