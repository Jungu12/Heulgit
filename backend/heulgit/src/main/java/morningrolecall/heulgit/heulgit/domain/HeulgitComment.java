package morningrolecall.heulgit.heulgit.domain;

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
import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.user.domain.User;
@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "heulgit_comment")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties("heulgit")
public class HeulgitComment {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "comment_id", nullable = false)
		private Long commentId;

		@ManyToOne
		@JoinColumn(name = "heulgit_id", nullable = false)
		private Heulgit heulgit;

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
		private HeulgitComment parentComment;

		@Builder
		public HeulgitComment(Heulgit heulgit, User user, String content, HeulgitComment parentComment) {
			setHeulgit(heulgit);
			this.user = user;
			this.content = content;
			this.parentComment = parentComment;
		}

		private void setHeulgit(Heulgit heulgit) {
			if (Objects.isNull(this.heulgit)) {
				this.heulgit = heulgit;
				this.heulgit.addComment(this);
			}
		}

}
