package morningrolecall.heulgit.heulgit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import morningrolecall.heulgit.heulgit.domain.Heulgit;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;
import morningrolecall.heulgit.heulgit.domain.dto.ParentCommentDto;
import morningrolecall.heulgit.user.domain.User;

public interface HeulgitCommentRepository extends JpaRepository<HeulgitComment, Long> {

	Optional<HeulgitComment> findHeulgitCommentByCommentId(Long commentId);

	List<HeulgitComment> findHeulgitCommentsByHeulgitOrderByUpdatedDateDesc(Heulgit heulgit);

	Page<HeulgitComment> findHeulgitCommentsByUserOrderByUpdatedDateDesc(User user, Pageable pageable);

	@Query("SELECT hc, " +
		"(SELECT COUNT(subHc) FROM HeulgitComment subHc WHERE subHc.parentComment = hc) " +
		"FROM HeulgitComment hc " +
		"WHERE hc.heulgit = :heulgit AND hc.parentComment IS NULL")
	Slice<Object []> findByHeulgitAndParentCommentIsNull(Heulgit heulgit,Pageable pageable);

	@Query("SELECT hc FROM HeulgitComment hc WHERE hc.parentComment = :parentComment")
	Slice<HeulgitComment> findChildCommentsByParentComment(HeulgitComment parentComment,Pageable pageable);
}
