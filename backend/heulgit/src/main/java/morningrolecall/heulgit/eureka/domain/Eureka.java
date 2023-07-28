package morningrolecall.heulgit.eureka.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.eureka.domain.dto.EurekaDto;
import morningrolecall.heulgit.user.domain.User;

@Entity
@NoArgsConstructor
@Getter
public class Eureka {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eureka_id", nullable = false)
	private Long eurekaId;

	@ManyToOne
	@JoinColumn(name = "github_id", nullable = false)
	private User user;

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

	@OneToMany(mappedBy = "eureka", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<EurekaImage> eurekaImages = new ArrayList<>();

	@ManyToMany
	@JoinTable(
		// 다대다 관계를 매핑하는데 사용하는 테이블
		name = "eureka_like",
		// Eureka 엔티티와 매핑되는 테이블의 컬럼
		joinColumns = @JoinColumn(name = "eureka_id"),
		// 다대다 관계를 맺는 User 엔티티와 매핑되는 테이블의 컬럼
		inverseJoinColumns = @JoinColumn(name = "github_id")
	)
	private Set<User> likedUsers;

	@OneToMany(mappedBy = "eureka", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<EurekaComment> eurekaComments = new ArrayList<>();

	public static Eureka of(User user, EurekaDto eurekaDto) {
		return new Eureka(user, eurekaDto.getTitle(), eurekaDto.getContent(), eurekaDto.getLink());
	}

	private Eureka(User user, String title, String content,
		String link) {
		this.user = user;
		this.title = title;
		this.content = content;
		this.updatedDate = LocalDateTime.now();
		this.view = 0;
		this.link = link;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public void setUpdatedDate(LocalDateTime updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void increaseView() {
		this.view++;
	}

	public void addComment(EurekaComment comment) {
		eurekaComments.add(comment);
		comment.setEureka(this);
	}

	public void removeComment(EurekaComment comment) {
		eurekaComments.remove(comment);
		comment.setEureka(null);
	}

	public void addLikeUser(User user) {
		this.likedUsers.add(user);
	}

	public void deleteLikeUser(User user) {
		this.likedUsers.remove(user);
	}
}