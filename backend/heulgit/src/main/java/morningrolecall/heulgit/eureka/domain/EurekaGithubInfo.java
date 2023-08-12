package morningrolecall.heulgit.eureka.domain;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "eureka_github_info")
public class EurekaGithubInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eureka_github_info_id", nullable = false)
	@JsonIgnore
	private Long eurekaGithubInfoId;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "state", nullable = false)
	private boolean state;

	@Column(name = "updated_date", nullable = false)
	private LocalDateTime updatedDate;

	@Column(name = "body")
	private String body;

	@Column(name = "comments", nullable = false)
	private int comments;

	@ManyToOne
	@JoinColumn(name = "eureka_id", nullable = false)
	@JsonIgnore
	private Eureka eureka;

	public void updateTitle(String title) {
		this.title = title;
	}

	public void updateState(boolean state) {
		this.state = state;
	}

	public void updateUpdatedDate(LocalDateTime updatedDate) {
		LocalDateTime utcTime = updatedDate;
		ZonedDateTime seoulTime = utcTime.atZone(ZoneId.of("Asia/Seoul"));
		LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();
		this.updatedDate = seoulLocalDateTime;;
	}

	public void updateBody(String body) {
		this.body = body;
	}
}