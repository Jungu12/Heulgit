package morningrolecall.heulgit.heulgit.domain.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.eureka.domain.EurekaGithubInfo;
import morningrolecall.heulgit.eureka.domain.EurekaImage;
import morningrolecall.heulgit.eureka.domain.EurekaLabel;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;
import morningrolecall.heulgit.user.domain.User;

public class HeulgitDetailResponse {

	private Long heulgitId;
	private String githubId;
	private String heulgitName;
	private String content;
	private int star;
	private LocalDateTime updatedDate;
	private String language;
	private int view;
	private String avatarUrl;
	private Set<User> likedUsers;
	private List<HeulgitComment> heulgitComments;

}
