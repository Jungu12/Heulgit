package morningrolecall.heulgit.user.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "commit_analyze")
@IdClass(CommitAnalyzeId.class) // 복합 기본 키 클래스를 지정
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommitAnalyze {

	@Id
	@Column(name = "github_id")
	private String githubId;

	@Id
	private String type;

	private String description;
}
