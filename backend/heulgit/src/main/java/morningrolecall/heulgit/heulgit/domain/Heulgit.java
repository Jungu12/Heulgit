package morningrolecall.heulgit.heulgit.domain;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
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
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

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
public class Heulgit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "heulgit_id") // 컬럼명을 매핑
	private Long heulgitId;

	@Column(name = "github_id", nullable = false) // 컬럼명과 NULL 제약 조건을 매핑
	private String githubId;

	@Column(name = "heulgit_name", nullable = false)
	private String heulgitName;

	@Lob
	@Column(name = "content") // LONGTEXT 컬럼과 매핑
	private String content;

	@Column(name = "star", nullable = false)
	private Integer star;

	@Column(name = "updated_date", nullable = false)
	private ZonedDateTime updatedDate;

	@Column(name = "language")
	private String language;

	@Column(name = "view", nullable = false)
	private Integer view;

	@Column(name = "avatar_url")
	private String avatarUrl;

	@ManyToMany
	@JoinTable(
		// 다대다 관계를 매핑하는데 사용하는 테이블
		name = "heulgit_like",
		// Eureka 엔티티와 매핑되는 테이블의 컬럼
		joinColumns = @JoinColumn(name = "heulgit_id"),
		// 다대다 관계를 맺는 User 엔티티와 매핑되는 테이블의 컬럼
		inverseJoinColumns = @JoinColumn(name = "github_id")
	)
	@Builder.Default
	private Set<User> likedUsers = new HashSet<>();


	@OneToMany(mappedBy = "heulgit", cascade = CascadeType.ALL)
	@Builder.Default
	@JsonIgnoreProperties("heulgit")
	private List<HeulgitComment> heulgitComments = new ArrayList<>();

	public void increaseView() {
		this.view++;
	}
	public void addComment(HeulgitComment comment){
		this.heulgitComments.add(comment);
	}
	public void removeComment(HeulgitComment comment){
		this.heulgitComments.remove(comment);
	}

	public void addLikeUser(User user){
		this.likedUsers.add(user);
	}



	public void setHeulgitComments(List<HeulgitComment> heulgitComments) {
		this.heulgitComments = heulgitComments;
	}

}