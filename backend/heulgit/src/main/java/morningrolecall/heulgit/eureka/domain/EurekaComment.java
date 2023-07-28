package morningrolecall.heulgit.eureka.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.user.domain.User;

@Entity
@Getter
@NoArgsConstructor
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
	private LocalDateTime updatedDate;

	@ManyToOne
	@JoinColumn(name = "parent_id", nullable = false)
	private EurekaComment parentComment;

	@Column(name = "order", nullable = false)
	private int order;

	public void setEureka(Eureka eureka) {
		this.eureka = eureka;
	}
}
