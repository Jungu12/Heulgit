package morningrolecall.heulgit.eureka.domain.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import lombok.Getter;
import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.eureka.domain.EurekaImage;
import morningrolecall.heulgit.user.domain.User;

@Getter
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

	public static EurekaDetailResponse of(Eureka eureka) {
		return new EurekaDetailResponse(eureka.getEurekaId(), eureka.getUser(), eureka.getTitle(), eureka.getContent(),
			eureka.getUpdatedDate(),
			eureka.getView(), eureka.getLink(), eureka.getEurekaImages(), eureka.getLikedUsers(),
			eureka.getEurekaComments());
	}

	private EurekaDetailResponse(Long eurekaId, User user, String title, String content, LocalDateTime updatedDate,
		int view,
		String link, List<EurekaImage> eurekaImages, Set<User> likedUsers, List<EurekaComment> eurekaComments) {
		this.eurekaId = eurekaId;
		this.user = user;
		this.title = title;
		this.content = content;
		this.updatedDate = updatedDate;
		this.view = view;
		this.link = link;
		this.eurekaImages = eurekaImages;
		this.likedUsers = likedUsers;
		this.eurekaComments = eurekaComments;
	}
}
