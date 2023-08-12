package morningrolecall.heulgit.freeboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;

public interface FreeBoardCommentRepository extends JpaRepository<FreeBoardComment, Long> {
	Optional<FreeBoardComment> findFreeBoardCommentByCommentId(Long commentId);

	List<FreeBoardComment> findFreeBoardCommentsByFreeBoardOrderByUpdatedDateDesc(FreeBoard freeBoard);
}
