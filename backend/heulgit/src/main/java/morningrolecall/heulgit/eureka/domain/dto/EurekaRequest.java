package morningrolecall.heulgit.eureka.domain.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class EurekaRequest {
	private String title;
	private String content;
	private List<String> fileUri;
	private String link;
}
