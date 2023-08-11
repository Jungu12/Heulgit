package morningrolecall.heulgit.heulgit.domain.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.eureka.domain.EurekaGithubInfo;
import morningrolecall.heulgit.eureka.domain.EurekaImage;
import morningrolecall.heulgit.eureka.domain.EurekaLabel;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;
import morningrolecall.heulgit.user.domain.User;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HeulgitDetailResponse {

	private Long heulgitId;
	private String githubId;
	private String avatarUrl;
	private String heulgitName;
	private String content;
	private int star;
	private LocalDateTime updatedDate;
	private String language;
	private int view;
	private boolean isRegistered;
	private Set<User> likedUsers;
	private List<HeulgitComment> heulgitComments;

}
