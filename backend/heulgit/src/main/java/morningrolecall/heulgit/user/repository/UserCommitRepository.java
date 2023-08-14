package morningrolecall.heulgit.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.user.domain.Comment;

public interface UserCommitRepository extends JpaRepository<Comment, String> {

	List<Comment> findAllByGithubId(String github);

}
