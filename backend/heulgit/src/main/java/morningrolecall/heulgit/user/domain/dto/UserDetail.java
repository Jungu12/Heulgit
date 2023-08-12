package morningrolecall.heulgit.user.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class UserDetail {
	private String id;
	private String avater_url;
}
