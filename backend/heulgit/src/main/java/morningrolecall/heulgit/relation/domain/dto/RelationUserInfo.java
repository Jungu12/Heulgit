package morningrolecall.heulgit.relation.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RelationUserInfo {
	private String id;
	private String avater_url;
	private boolean follow;
}
