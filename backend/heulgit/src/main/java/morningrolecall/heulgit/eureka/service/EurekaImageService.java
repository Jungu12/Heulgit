package morningrolecall.heulgit.eureka.service;

import javax.persistence.NoResultException;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.Eureka;
import morningrolecall.heulgit.eureka.domain.EurekaImage;
import morningrolecall.heulgit.eureka.repository.EurekaImageRepository;

@Service
@RequiredArgsConstructor
public class EurekaImageService {

	private final EurekaImageRepository eurekaImageRepository;

	public void addEurekaImage(String fileUri, Eureka eureka) {
		eurekaImageRepository.saveAndFlush(EurekaImage.of(fileUri, eureka));
	}

	public void updateEurekaImage(String fileUri, Eureka eureka) {
		EurekaImage eurekaImage = eurekaImageRepository.findEurekaImagesByEureka(eureka)
			.orElseThrow(() -> new NoResultException("해당 파일정보 찾을 수 없습니다."));

		eurekaImage.setFileUri(fileUri);

		eurekaImageRepository.saveAndFlush(eurekaImage);
	}
}
