package morningrolecall.heulgit.eureka.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaComment;
import morningrolecall.heulgit.user.domain.User;

public interface EurekaCommentRepository extends JpaRepository<EurekaComment, Long> {
	Optional<EurekaComment> findEurekaCommentByCommentId(Long commentId);

	List<EurekaComment> findEurekaCommentsByEurekaOrderByUpdatedDateDesc(Eureka eureka);

	Slice<EurekaComment> findEurekaCommentsByUserOrderByUpdatedDateDesc(User user, Pageable pageable);

	@Query("SELECT ec, " +
		"(SELECT COUNT(subEc) FROM EurekaComment subEc WHERE subEc.parentComment = ec) " +
		"FROM EurekaComment ec " +
		"WHERE ec.eureka = :eureka AND ec.parentComment IS NULL")
	Slice<Object []> findByEurekaAndParentCommentIsNull(Eureka eureka, Pageable pageable);

	@Query("SELECT ec FROM EurekaComment ec WHERE ec.parentComment=:parentComment")
	Slice<EurekaComment> findChildCommentsByParentComment(EurekaComment parentComment,Pageable pageable);
}
