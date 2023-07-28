package morningrolecall.heulgit.eureka.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import morningrolecall.heulgit.eureka.domain.Eureka;

public interface EurekaRepository extends JpaRepository<Eureka, Long> {
	Slice<Eureka> findSliceBy(Pageable pageable);

	@Query("SELECT e FROM Eureka e ORDER BY SIZE(e.likedUsers) DESC, e.updatedDate DESC")
	Page<Eureka> findSortedByLikesEurekas(Pageable pageable);

	@Query("SELECT e FROM Eureka e ORDER BY SIZE(e.eurekaComments) DESC, e.updatedDate DESC")
	Page<Eureka> findSortedByCommentsEurekas(Pageable pageable);

	Optional<Eureka> findEurekaByEurekaId(Long eurekaId);
}
