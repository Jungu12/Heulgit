package morningrolecall.heulgit.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import morningrolecall.heulgit.user.domain.Comment;
import morningrolecall.heulgit.user.domain.dto.UserCommentResponse;

public interface UserCommentRepository extends JpaRepository<Comment, Long> {

	@Query(nativeQuery = true, name = "Comment.fetchCommentsByUser")
	List<UserCommentResponse> fetchCommentsByUser(@Param("githubId") String githubId);
}
