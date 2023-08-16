package morningrolecall.heulgit.user.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class UserCommitTypeRequest {

	private String type;

	private String description;

}