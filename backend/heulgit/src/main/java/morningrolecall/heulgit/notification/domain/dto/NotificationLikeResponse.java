package morningrolecall.heulgit.notification.domain.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import morningrolecall.heulgit.notification.domain.NotificationType;


@Getter
@SuperBuilder
public class NotificationLikeResponse extends NotificationResponse{

	private String relatedLink;

}
