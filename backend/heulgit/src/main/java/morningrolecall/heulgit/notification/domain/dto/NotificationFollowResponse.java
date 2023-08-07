package morningrolecall.heulgit.notification.domain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import morningrolecall.heulgit.notification.domain.Notification;
import morningrolecall.heulgit.notification.domain.NotificationType;

@Getter
@SuperBuilder
public class NotificationFollowResponse extends NotificationResponse{

	private boolean follow;

}
