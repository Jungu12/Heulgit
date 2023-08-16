package morningrolecall.heulgit.eureka.domain.dto;

import java.util.List;
import java.util.Set;

import lombok.Getter;

@Getter
public class EurekaCommentDto {
	private Long eurekaId;
	private Long parentId;
	private String content;
	private List<String> mentionedFollowers;
}
