package morningrolecall.heulgit.heulgit.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import morningrolecall.heulgit.heulgit.domain.Heulgit;

public interface HeulgitRepository extends JpaRepository<Heulgit, Long>, JpaSpecificationExecutor<Heulgit> {


	Slice<Heulgit> findSliceBy(Pageable pageable);

	@Query("SELECT h FROM Heulgit  h ORDER BY SIZE(h.likedUsers) DESC, h.updatedDate DESC")
	Page<Heulgit> findSortedByLikesHeulgits(Pageable pageable);

	@Query("SELECT h FROM Heulgit h ORDER BY SIZE(h.heulgitComments) DESC, h.updatedDate DESC")
	Page<Heulgit> findSortedByCommentsHeulgits(Pageable pageable);

	// @Query("SELECT h FROM Heulgit h ORDER BY ")

	Optional<Heulgit> findHeulgitByHeulgitId(Long heulgitId);

	@Query("SELECT h FROM Heulgit h LEFT JOIN FETCH h.heulgitComments WHERE h.heulgitId = :heulgitId")
	Optional<Heulgit> findHeulgitAndHeulgitCommentsByHeulgitId(Long heulgitId);


}
