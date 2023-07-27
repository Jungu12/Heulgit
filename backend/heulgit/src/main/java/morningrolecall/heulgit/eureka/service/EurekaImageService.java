package morningrolecall.heulgit.eureka.service;

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
}
