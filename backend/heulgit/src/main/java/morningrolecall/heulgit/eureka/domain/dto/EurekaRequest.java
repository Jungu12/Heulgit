package morningrolecall.heulgit.eureka.domain.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;

@Getter
public class EurekaRequest {
	private String title;
	private String content;
	private String link;
}
