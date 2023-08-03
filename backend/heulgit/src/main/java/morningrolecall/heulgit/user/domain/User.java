package morningrolecall.heulgit.user.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@Column(name = "github_id", nullable = false)
	private String githubId;

	@Column(name = "avatar_url")
	private String avatarUrl;

	@Column(nullable = false)
	private String name;

	private String bio;

	private String company;

	private String location;

	private String blog;
}
