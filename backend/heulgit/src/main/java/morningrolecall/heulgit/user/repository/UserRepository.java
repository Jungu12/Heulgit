package morningrolecall.heulgit.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.user.domain.User;

public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findUserByGithubId(String githubId);

}
