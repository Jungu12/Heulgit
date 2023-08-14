package morningrolecall.heulgit.heulgit.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParentCommentDto {
	private HeulgitComment rootComment;
	private Long childCount;
}
