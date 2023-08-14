package morningrolecall.heulgit.freeboard.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FreeBoardParentCommentDto {
	private FreeBoardComment rootComment;
	private Long childCount;
}
