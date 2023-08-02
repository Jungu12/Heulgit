package morningrolecall.heulgit.eureka.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.lettuce.core.dynamic.annotation.Param;
import morningrolecall.heulgit.eureka.domain.Eureka;

public interface EurekaRepository extends JpaRepository<Eureka, Long> {
	Slice<Eureka> findSliceBy(Pageable pageable);

	@Query("SELECT e FROM Eureka e ORDER BY SIZE(e.likedUsers) DESC, e.updatedDate DESC")
	Page<Eureka> findSortedByLikesEurekas(Pageable pageable);

	@Query("SELECT e FROM Eureka e ORDER BY SIZE(e.eurekaComments) DESC, e.updatedDate DESC")
	Page<Eureka> findSortedByCommentsEurekas(Pageable pageable);

	Optional<Eureka> findEurekaByEurekaId(Long eurekaId);

	@Query("SELECT e FROM Eureka e LEFT JOIN FETCH e.eurekaComments WHERE e.eurekaId = :eurekaId")
	Optional<Eureka> findEurekaAndEurekaCommentsByEurekaId(Long eurekaId);

	Slice<Eureka> findSliceByTitleContains(String title, Pageable pageable);

	@Query("SELECT e FROM Eureka e WHERE e.title like %:title% ORDER BY SIZE(e.likedUsers) DESC, e.updatedDate DESC")
	Page<Eureka> findContainsTitleSortedByLikesEurekas(@Param("title") String title, Pageable pageable);

	@Query("SELECT e FROM Eureka e WHERE e.title like %:title% ORDER BY SIZE(e.eurekaComments) DESC, e.updatedDate DESC")
	Page<Eureka> findContainsTitleSortedByCommentsEurekas(@Param("title") String title, Pageable pageable);

	Slice<Eureka> findSliceByUser_GithubId(String id, Pageable pageable);

	@Query("SELECT e FROM Eureka e WHERE e.user.githubId = :id ORDER BY SIZE(e.likedUsers) DESC, e.updatedDate DESC")
	Page<Eureka> findByUserNameSortedByLikesEurekas(@Param("id") String id, Pageable pageable);

	@Query("SELECT e FROM Eureka e WHERE e.user.githubId = :id ORDER BY SIZE(e.eurekaComments) DESC, e.updatedDate DESC")
	Page<Eureka> findByUserNameSortedByCommentsEurekas(@Param("id") String id, Pageable pageable);
}
