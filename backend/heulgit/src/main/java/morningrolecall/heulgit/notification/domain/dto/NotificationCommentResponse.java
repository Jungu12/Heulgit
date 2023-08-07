package morningrolecall.heulgit.notification.domain.dto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class NotificationCommentResponse extends NotificationResponse {
	private String relatedLink;
	private String content;
}
