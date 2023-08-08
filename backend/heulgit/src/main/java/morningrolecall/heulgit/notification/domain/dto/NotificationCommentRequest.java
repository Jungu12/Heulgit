package morningrolecall.heulgit.notification.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationCommentRequest {
	private String senderId;
	private String writerId;
	private String relatedLink;
	private String content;
}
