package morningrolecall.heulgit.user.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserPostResponse {
	private String type;

	private String id;

	private UserDetail user;

	private String title;

	private String content;

	private String updated_date;

	private int views;

	private String comments;

	private int likes;
}
