package morningrolecall.heulgit.eureka.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EurekaParentCommentDto {
	private EurekaComment rootComment;
	private Long childCount;
}
