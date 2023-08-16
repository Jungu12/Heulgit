package morningrolecall.heulgit.heulgit.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.user.domain.User;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HeulgitLikeUserResponse {
	private User user;
	private boolean follow;


}
