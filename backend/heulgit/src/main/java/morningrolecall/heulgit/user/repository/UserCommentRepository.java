package morningrolecall.heulgit.user.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import morningrolecall.heulgit.user.domain.Comment;
import morningrolecall.heulgit.user.domain.dto.UserCommentResponse;

public interface UserCommentRepository extends JpaRepository<Comment, Long> {

	@Query(nativeQuery = true, name = "Comment.fetchCommentsByUser")
	Slice<UserCommentResponse> fetchCommentsByUser(@Param("githubId") String githubId, Pageable pageable);
}