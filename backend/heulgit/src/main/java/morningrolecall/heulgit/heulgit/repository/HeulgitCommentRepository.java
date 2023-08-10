package morningrolecall.heulgit.heulgit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.heulgit.domain.Heulgit;
import morningrolecall.heulgit.heulgit.domain.HeulgitComment;

public interface HeulgitCommentRepository extends JpaRepository<HeulgitComment, Long> {

	Optional<HeulgitComment> findHeulgitCommentByCommentId(Long commentId);

	List<HeulgitComment> findHeulgitCommentsByHeulgitOrderByUpdatedDateDesc(Heulgit heulgit);
}
