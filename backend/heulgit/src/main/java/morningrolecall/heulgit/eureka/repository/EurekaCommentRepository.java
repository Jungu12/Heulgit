package morningrolecall.heulgit.eureka.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaComment;

public interface EurekaCommentRepository extends JpaRepository<EurekaComment, Long> {
	Optional<EurekaComment> findEurekaCommentByCommentId(Long commentId);

	List<EurekaComment> findEurekaCommentsByEurekaOrderByUpdatedDateDesc(Eureka eureka);
}
