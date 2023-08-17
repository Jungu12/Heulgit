package morningrolecall.heulgit.eureka.domain;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.user.domain.User;

@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "eureka_comment")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties("eureka")
public class EurekaComment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id", nullable = false)
	private Long commentId;

	@ManyToOne
	@JoinColumn(name = "eureka_id", nullable = false)
	private Eureka eureka;

	@ManyToOne
	@JoinColumn(name = "github_id", nullable = false)
	private User user;

	@Column(name = "content", nullable = false)
	private String content;

	@Column(name = "updated_date", nullable = false)
	@CreatedDate
	private LocalDateTime updatedDate;

	@ManyToOne
	@JoinColumn(name = "parent_id")
	private EurekaComment parentComment;

	@Builder
	public EurekaComment(Eureka eureka, User user, String content, EurekaComment parentComment) {
		setEureka(eureka);
		this.user = user;
		this.content = content;
		this.parentComment = parentComment;
	}

	private void setEureka(Eureka eureka) {
		if (Objects.isNull(this.eureka)) {
			this.eureka = eureka;
			this.eureka.addComment(this);
		}
	}
}
