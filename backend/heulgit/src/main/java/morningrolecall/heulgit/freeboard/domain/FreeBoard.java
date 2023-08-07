package morningrolecall.heulgit.freeboard.domain;

import java.time.LocalDateTime;
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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.user.domain.User;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "freeboard")
public class FreeBoard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "freeboard_id", nullable = false)
	private Long freeBoardId;

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

	@OneToMany(mappedBy = "freeBoard", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("freeBoard")
	@Builder.Default
	private List<FreeBoardImage> freeBoardImages = new ArrayList<>();

	@ManyToMany
	@JoinTable(
		// 다대다 관계를 매핑하는데 사용하는 테이블
		name = "freeboard_like",
		// FreeBoard 엔티티와 매핑되는 테이블의 컬럼
		joinColumns = @JoinColumn(name = "freeboard_id"),
		// 다대다 관계를 맺는 User 엔티티와 매핑되는 테이블의 컬럼
		inverseJoinColumns = @JoinColumn(name = "github_id")
	)
	@Builder.Default
	private Set<User> likedUsers = new HashSet<>();

	@OneToMany(mappedBy = "freeBoard", cascade = CascadeType.ALL)
	@Builder.Default
	@JsonIgnoreProperties("freeboard")
	private List<FreeBoardComment> freeBoardComments = new ArrayList<>();

	public void setTitle(String title) {
		this.title = title;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setUpdatedDate(LocalDateTime updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void increaseView() {
		this.view++;
	}

	public void addAllImage(List<FreeBoardImage> freeBoardImages) {
		this.freeBoardImages.addAll(freeBoardImages);
	}

	public void removeAllImage() {
		this.freeBoardImages.clear();
	}

	public void addComment(FreeBoardComment comment) {
		this.freeBoardComments.add(comment);
	}

	public void addLikeUser(User user) {
		this.likedUsers.add(user);
	}

	public void removeLikeUser(User user) {
		this.likedUsers.remove(user);
	}

	public void setFreeBoardComments(List<FreeBoardComment> freeBoardComments) {
		this.freeBoardComments = freeBoardComments;
	}
}
