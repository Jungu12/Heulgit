package morningrolecall.heulgit.eureka.domain.dto;

import lombok.Getter;

@Getter
public class EurekaUpdateRequest {
	private Long eurekaId;
	private String title;
	private String content;
	private String fileUri;
	private String link;
}
