package morningrolecall.heulgit.notification.domain.dto;

import org.springframework.stereotype.Component;

import morningrolecall.heulgit.notification.domain.Notification;

@Component
public class NotificationMapper {

	public NotificationLikeResponse toLikeResponse(Notification notification){
		return NotificationLikeResponse.builder()
			.notificationId(notification.getNotificationId())
			.sender(notification.getSender())
			.receiver(notification.getReceiver())
			.type(notification.getType())
			.createdDate(notification.getCreatedDate())
			.hasRead(notification.isHasRead())
			.relatedLink(notification.getRelatedLink())
			.build();
	}
	public NotificationFollowResponse toFollowResponse(Notification notification, Boolean follow){
		return NotificationFollowResponse.builder()
			.notificationId(notification.getNotificationId())
			.sender(notification.getSender())
			.receiver(notification.getReceiver())
			.type(notification.getType())
			.createdDate(notification.getCreatedDate())
			.hasRead(notification.isHasRead())
			.follow(follow)
			.build();
	}
	public NotificationCommentResponse toCommentResponse(Notification notification){
		return NotificationCommentResponse.builder()
			.notificationId(notification.getNotificationId())
			.sender(notification.getSender())
			.receiver(notification.getReceiver())
			.type(notification.getType())
			.createdDate(notification.getCreatedDate())
			.hasRead(notification.isHasRead())
			.relatedLink(notification.getRelatedLink())
			.content(notification.getContent())
			.build();
	}
	public NotificationCommentResponse toMentionResponse(Notification notification){
		return NotificationCommentResponse.builder()
			.notificationId(notification.getNotificationId())
			.sender(notification.getSender())
			.receiver(notification.getReceiver())
			.type(notification.getType())
			.createdDate(notification.getCreatedDate())
			.hasRead(notification.isHasRead())
			.relatedLink(notification.getRelatedLink())
			.content(notification.getContent())
			.build();
	}

}
