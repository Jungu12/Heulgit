package morningrolecall.heulgit.heulgit.domain.dto;

import java.util.List;
import java.util.Set;

import lombok.Getter;

@Getter
public class HeulgitCommentDto {
	private Long heulgitId;
	private Long parentId;
	private String content;
	private List<String> mentionedFollowers;

}
