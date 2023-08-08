package morningrolecall.heulgit.freeboard.domain.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class FreeBoardUpdateRequest {
	private Long freeBoardId;
	private String title;
	private String content;
	private List<String> fileUri;
}
