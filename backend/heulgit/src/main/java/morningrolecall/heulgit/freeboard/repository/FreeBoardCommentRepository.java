package morningrolecall.heulgit.freeboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;
import morningrolecall.heulgit.user.domain.User;

public interface FreeBoardCommentRepository extends JpaRepository<FreeBoardComment, Long> {
	Optional<FreeBoardComment> findFreeBoardCommentByCommentId(Long commentId);

	List<FreeBoardComment> findFreeBoardCommentsByFreeBoardOrderByUpdatedDateDesc(FreeBoard freeBoard);

	Slice<FreeBoardComment> findFreeBoardCommentByUserOrderByUpdatedDateDesc(User user, Pageable pageable);

	@Query("SELECT fc, " +
		"(SELECT COUNT(subFc) FROM FreeBoardComment subFc WHERE subFc.parentComment = fc) " +
		"FROM FreeBoardComment fc " +
		"WHERE fc.freeBoard = :freeboard AND fc.parentComment IS NULL")
	Slice<Object[]> findParentCommentsWithChildCountByFreeBoard(FreeBoard freeboard, Pageable pageable);
	@Query("SELECT fc FROM FreeBoardComment fc WHERE fc.parentComment =:parentComment")
	Slice<FreeBoardComment> findChildCommentsByParentComment(FreeBoardComment parentComment, Pageable pageable);

}