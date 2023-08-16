package morningrolecall.heulgit.user.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;

import morningrolecall.heulgit.user.domain.dto.UserCommentResponse;

@Entity
@SqlResultSetMapping(
	name = "CommentMapping",
	classes = {
		@ConstructorResult(
			targetClass = UserCommentResponse.class,
			columns = {
				@ColumnResult(name = "comment_id", type = Integer.class),
				@ColumnResult(name = "content", type = String.class),
				@ColumnResult(name = "updated_date", type = LocalDateTime.class),
				@ColumnResult(name = "github_id", type = String.class),
				@ColumnResult(name = "comment_type", type = String.class)
			}
		)
	}
)
@NamedNativeQuery(
	name = "Comment.fetchCommentsByUser",
	query =
		"SELECT " +
			"   c.comment_id, " +
			"   c.content, " +
			"   c.updated_date, " +
			"   c.github_id, " +
			"   'freeboard' AS comment_type " +
			"FROM freeboard_comment c " +
			"WHERE c.github_id = :githubId " +
			"UNION ALL " +
			"SELECT " +
			"   c.comment_id, " +
			"   c.content, " +
			"   c.updated_date, " +
			"   c.github_id, " +
			"   'heulgit' AS comment_type " +
			"FROM heulgit_comment c " +
			"WHERE c.github_id = :githubId " +
			"UNION ALL " +
			"SELECT " +
			"   c.comment_id, " +
			"   c.content, " +
			"   c.updated_date, " +
			"   c.github_id, " +
			"   'eureka' AS comment_type " +
			"FROM eureka_comment c " +
			"WHERE c.github_id = :githubId " +
			"ORDER BY updated_date DESC",
	resultSetMapping = "CommentMapping"
)
public class Comment {
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
