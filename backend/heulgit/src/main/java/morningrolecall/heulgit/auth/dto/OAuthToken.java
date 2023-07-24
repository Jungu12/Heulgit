package morningrolecall.heulgit.auth.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OAuthToken {
	private String accessToken;
	private String refreshToken;
}
