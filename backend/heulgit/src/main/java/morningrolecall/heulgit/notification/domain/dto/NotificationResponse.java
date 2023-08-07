package morningrolecall.heulgit.notification.domain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import morningrolecall.heulgit.notification.domain.NotificationType;
import morningrolecall.heulgit.user.domain.User;

@Getter
@SuperBuilder
public abstract class NotificationResponse {

	private Long notificationId;
	private User receiver;
	private User sender;
	private NotificationType type;
	private LocalDateTime createdDate;
	private boolean hasRead;


}
