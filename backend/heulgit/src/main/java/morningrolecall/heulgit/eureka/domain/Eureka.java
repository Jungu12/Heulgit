package morningrolecall.heulgit.eureka.domain;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.user.domain.User;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@EntityListeners(AuditingEntityListener.class)
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

	@Builder.Default
	@Column(name = "view", nullable = false)
	private int view = 0;

	@Column(name = "link", nullable = false)
	private String link;

	@OneToMany(mappedBy = "eureka", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("eureka")
	@Builder.Default
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
	@Builder.Default
	private Set<User> likedUsers = new HashSet<>();

	@OneToMany(mappedBy = "eureka", cascade = CascadeType.ALL)
	@Builder.Default
	@JsonIgnoreProperties("eureka")
	private List<EurekaComment> eurekaComments = new ArrayList<>();

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
		LocalDateTime utcTime = updatedDate;
		ZonedDateTime seoulTime = utcTime.atZone(ZoneId.of("Asia/Seoul"));
		LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();
		this.updatedDate = seoulLocalDateTime;
	}

	public void increaseView() {
		this.view++;
	}

	public void addAllImage(List<EurekaImage> eurekaImages) {
		this.eurekaImages.addAll(eurekaImages);
	}

	public void removeAllImage() {
		this.eurekaImages.clear();
	}

	public void addComment(EurekaComment comment) {
		this.eurekaComments.add(comment);
	}

	public void removeComment(EurekaComment comment) {
		this.eurekaComments.remove(comment);
	}

	public void addLikeUser(User user) {
		this.likedUsers.add(user);
	}

	public void removeLikeUser(User user) {
		this.likedUsers.remove(user);
	}

	public void setEurekaComments(List<EurekaComment> eurekaComments) {
		this.eurekaComments = eurekaComments;
	}
}