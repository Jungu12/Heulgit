package morningrolecall.heulgit.user.domain.dto;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GitRepository {

	private String name;

	@Column(name = "updated_at")
	private String updatedAt;
}
