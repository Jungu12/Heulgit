package morningrolecall.heulgit.eureka.domain.dto;

import java.util.Set;

import lombok.Getter;

@Getter
public class EurekaCommentDto {
	private Long eurekaId;
	private Long parentId;
	private String content;
	private Set<String> mentionedFollowers;
}
