package morningrolecall.heulgit.eureka.domain.dto;

import java.util.Set;

import lombok.Getter;
import morningrolecall.heulgit.user.domain.User;

@Getter
public class EurekaCommentDto {
	private Long eurekaId;
	private String content;
	private Set<User> mentionedFollowers;
}
