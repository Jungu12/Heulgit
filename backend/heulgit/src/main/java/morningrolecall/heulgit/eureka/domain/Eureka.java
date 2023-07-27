package morningrolecall.heulgit.eureka.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.eureka.domain.dto.EurekaDto;

@Entity
@NoArgsConstructor
@Getter
public class Eureka {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eureka_id")
	private Long eurekaId;

	@Column(name = "github_id", nullable = false)
	private String githubId;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "content", nullable = false)
	private String content;

	@Column(name = "updated_date", nullable = false)
	private LocalDateTime updatedDate;

	@Column(name = "view", nullable = false)
	private int view;

	@Column(name = "link", nullable = false)
	private String link;

	public static Eureka of(String githubId, EurekaDto eurekaDto) {
		return new Eureka(githubId, eurekaDto.getTitle(), eurekaDto.getContent(), eurekaDto.getLink());
	}

	private Eureka(String githubId, String title, String content,
		String link) {
		this.githubId = githubId;
		this.title = title;
		this.content = content;
		this.updatedDate = LocalDateTime.now();
		this.view = 0;
		this.link = link;
	}
}