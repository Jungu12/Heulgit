package morningrolecall.heulgit.auth.dto;

import javax.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "액세스 토큰")
public class AccessTokenResponse {
	@NotBlank
	@Schema(description = "발급된 액세스 토큰", defaultValue = "1o23i41oinsdlfkn")
	private String accessToken;
}
