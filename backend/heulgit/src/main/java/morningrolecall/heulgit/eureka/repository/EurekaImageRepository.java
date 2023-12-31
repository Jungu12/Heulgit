package morningrolecall.heulgit.eureka.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaImage;

public interface EurekaImageRepository extends JpaRepository<EurekaImage, Eureka> {
	List<EurekaImage> findEurekaImagesByEureka(Eureka eureka);

	void deleteAllByEureka(Eureka eureka);
}
