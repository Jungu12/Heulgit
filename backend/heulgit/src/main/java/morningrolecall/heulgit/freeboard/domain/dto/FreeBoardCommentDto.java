package morningrolecall.heulgit.freeboard.domain.dto;

import java.util.List;
import java.util.Set;

import lombok.Getter;

@Getter
public class FreeBoardCommentDto {
	private Long freeBoardId;
	private Long parentId;
	private String content;
	private List<String> mentionedFollowers;
}
