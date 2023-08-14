package morningrolecall.heulgit.user.domain.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class UserCommentResponse {
	@Id
	@Column(name = "comment_id")
	private Integer commentId;

	@Column(name = "content")
	private String content;

	@Column(name = "updated_date")
	private LocalDateTime updatedDate;

	@Column(name = "github_id")
	private String githubId;

	@Column(name = "comment_type")
	private String commentType;

}
