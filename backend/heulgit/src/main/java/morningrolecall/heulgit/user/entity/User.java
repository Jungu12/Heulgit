package morningrolecall.heulgit.user.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.RequiredArgsConstructor;

@Entity
@RequiredArgsConstructor
public class User {
	@Id
	@Column(name = "github_id")
	private String id;

	@Column(name = "avatar_url")
	private String avatarUrl;

	private String name;

	private String bio;

	private String company;

	private String location;
}
