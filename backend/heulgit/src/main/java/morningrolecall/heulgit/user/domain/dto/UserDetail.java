package morningrolecall.heulgit.user.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserDetail {
	private String id;
	private String avater_url;
}
