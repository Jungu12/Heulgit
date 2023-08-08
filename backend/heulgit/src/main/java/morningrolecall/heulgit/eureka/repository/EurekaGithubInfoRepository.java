package morningrolecall.heulgit.eureka.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaGithubInfo;

public interface EurekaGithubInfoRepository extends JpaRepository<EurekaGithubInfo, Long> {
	Optional<EurekaGithubInfo> findEurekaGithubInfoByEureka(Eureka eureka);
}
