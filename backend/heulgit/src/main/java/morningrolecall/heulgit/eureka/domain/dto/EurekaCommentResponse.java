package morningrolecall.heulgit.eureka.domain.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.user.domain.User;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EurekaCommentResponse {
	private Long comment_id;
	private Long eurekaId;
	private Long parentId;
	private LocalDateTime updatedDate;
	private String content;
	private User user;
}
