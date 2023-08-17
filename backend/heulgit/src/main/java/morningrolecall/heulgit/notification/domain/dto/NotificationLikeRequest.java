package morningrolecall.heulgit.notification.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import morningrolecall.heulgit.notification.domain.NotificationType;

@Getter
@AllArgsConstructor
public class NotificationLikeRequest {

	//좋아요를 누른 사용자 Id
	private String senderId;
	//게시글 사용자 Id
	private String writerId;
	//게시글 링크
	private String relatedLink;
	//알림 종류 LIKE
	private NotificationType type;
}
