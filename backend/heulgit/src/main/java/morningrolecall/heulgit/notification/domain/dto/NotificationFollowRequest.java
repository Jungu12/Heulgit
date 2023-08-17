package morningrolecall.heulgit.notification.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import morningrolecall.heulgit.notification.domain.NotificationType;

@Getter
@AllArgsConstructor
public class NotificationFollowRequest {

	private String senderId;
	private String receiverId;
	private NotificationType type;

}
