package morningrolecall.heulgit.eureka.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.eureka.domain.EurekaGithubInfo;
import morningrolecall.heulgit.eureka.domain.EurekaLabel;

public interface EurekaLabelRepository extends JpaRepository<EurekaLabel, Long> {
	List<EurekaLabel> findEurekaLabelsByEurekaGithubInfo(EurekaGithubInfo eurekaGithubInfo);
}
