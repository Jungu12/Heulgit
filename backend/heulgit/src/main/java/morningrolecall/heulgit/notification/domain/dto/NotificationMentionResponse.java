package morningrolecall.heulgit.notification.domain.dto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
@Getter
@SuperBuilder
public class NotificationMentionResponse {

	private String relatedLink;
	private String content;

}
