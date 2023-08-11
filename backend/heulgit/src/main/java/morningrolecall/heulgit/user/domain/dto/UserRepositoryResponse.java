package morningrolecall.heulgit.user.domain.dto;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRepositoryResponse {

	private String name;

	@Column(name = "updated_at")
	private String updatedAt;
}
