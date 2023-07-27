package morningrolecall.heulgit.eureka.repository;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.eureka.domain.Eureka;

public interface EurekaRepository extends JpaRepository<Eureka, Long> {
	Slice<Eureka> findSliceBy(Pageable pageable);

	Optional<Eureka> findEurekaByEurekaId(Long eurekaId);
}
