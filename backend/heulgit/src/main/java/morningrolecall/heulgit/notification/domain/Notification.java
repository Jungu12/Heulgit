package morningrolecall.heulgit.notification.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.user.domain.User;

@Entity
@NoArgsConstructor
@Getter
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notification_id", nullable = false)
	private Long notificationId;

	@ManyToOne
	@JoinColumn(name = "receiver_id", referencedColumnName = "github_id", nullable = false)
	private User receiver;

	@ManyToOne
	@JoinColumn(name = "sender_id", referencedColumnName = "github_id", nullable = false)
	private User sender;

	@Enumerated(EnumType.STRING) // Use EnumType.STRING to map Enum as string values
	@Column(name = "type", nullable = false)
	private NotificationType type;

	@Column(name = "related_link")
	private String relatedLink;

	@Column(name = "created_date", nullable = false)
	private LocalDateTime createdDate;

	@Column(name = "has_read", nullable = false)
	private boolean hasRead;

	@Column(name = "content")
	private String content;

	@Builder
	public Notification(Long notificationId, User receiver, User sender, NotificationType type,
		String relatedLink, LocalDateTime createdDate, boolean hasRead, String content) {
		this.notificationId = notificationId;
		this.receiver = receiver;
		this.sender = sender;
		this.type = type;
		this.relatedLink = relatedLink;
		this.createdDate = createdDate;
		this.hasRead = hasRead;
		this.content = content;
	}


}
