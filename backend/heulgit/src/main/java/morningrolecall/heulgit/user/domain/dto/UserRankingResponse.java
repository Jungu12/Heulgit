package morningrolecall.heulgit.user.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRankingResponse {

	private String githubId;

	private int count;

}
