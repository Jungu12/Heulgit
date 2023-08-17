package morningrolecall.heulgit.eureka.domain.dto;

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
import morningrolecall.heulgit.user.domain.User;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EurekaDetailResponse {
	private Long eurekaId;
	private User user;
	private String title;
	private String content;
	private LocalDateTime updatedDate;
	private int view;
	private String link;
	private List<EurekaImage> eurekaImages;
	private Set<User> likedUsers;
	private List<EurekaComment> eurekaComments;
	private EurekaGithubInfo eurekaGithubInfo;
	private List<EurekaLabel> eurekaLabels;
}
