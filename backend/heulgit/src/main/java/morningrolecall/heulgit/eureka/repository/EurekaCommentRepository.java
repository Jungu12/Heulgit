package morningrolecall.heulgit.eureka.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.eureka.domain.EurekaComment;

public interface EurekaCommentRepository extends JpaRepository<EurekaComment, Long> {
	
}
