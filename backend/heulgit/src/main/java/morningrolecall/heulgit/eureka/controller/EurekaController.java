package morningrolecall.heulgit.eureka.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.dto.EurekaDto;
import morningrolecall.heulgit.eureka.service.EurekaService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/eureka")
public class EurekaController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final EurekaService eurekaService;

	// /eureka/posts?sort=&pages=1
	@GetMapping("/posts")
	public ResponseEntity<?> eurekaList(@RequestParam String sort, @RequestParam int pages) {
		logger.debug("eurekaList(), 유레카 전체 조회");
		return ResponseEntity.ok().body(eurekaService.findEurekas(sort, pages));
	}

	// /eureka/posts/1
	@GetMapping("/posts/{eurekaId}")
	public ResponseEntity<?> eurekaDetail(@PathVariable Long eurekaId) {
		logger.debug("eurekaDetail(), eurekaId = {}", eurekaId);

		return ResponseEntity.ok().body(eurekaService.findEureka(eurekaId));
	}

	@PostMapping("/posts")
	public ResponseEntity<?> eurekaRegister(@AuthenticationPrincipal String githubId,
		@RequestBody EurekaDto eurekaDto) {
		logger.debug("eurekaRegister(), who = {}, title = {}, content = {}, imageId = {}, link = {}", githubId,
			eurekaDto.getTitle(),
			eurekaDto.getContent(), eurekaDto.getFileUri(), eurekaDto.getLink());

		eurekaService.addEureka(githubId, eurekaDto);

		return ResponseEntity.ok().build();
	}

	@PostMapping("/posts/update/{eurekaId}")
	public ResponseEntity<?> eurekaUpdate(@AuthenticationPrincipal String userId, @PathVariable Long eurekaId,
		@RequestBody EurekaDto eurekaDto) {
		logger.debug("eurekaUpdate(), who = {}, eurekaId = {}, title = {}, content = {}, imageId = {}, link = {}",
			userId, eurekaId,
			eurekaDto.getTitle(),
			eurekaDto.getContent(), eurekaDto.getFileUri(), eurekaDto.getLink());

		eurekaService.updateEureka(userId, eurekaId, eurekaDto);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/posts/{eurekaId}")
	public ResponseEntity<?> eurekaRemove(@AuthenticationPrincipal String userId, @PathVariable Long eurekaId) {
		logger.debug("eurekaRemove(), who = {}, eurekaId = {}", userId, eurekaId);

		eurekaService.removeEureka(userId, eurekaId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/posts/count")
	public ResponseEntity<?> eurekaCount() {
		logger.debug("eurekaCount()");

		return ResponseEntity.ok().body(eurekaService.countEurekas());
	}

	@GetMapping("/posts/like/{eurekaId}")
	public ResponseEntity<?> eurekaLike(@AuthenticationPrincipal String userId, @PathVariable Long eurekaId) {
		logger.debug("eurekaLike(), who = {}, eurekaId = {}", userId, eurekaId);

		eurekaService.likeEureka(userId, eurekaId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/posts/unlike/{eurekaId}")
	public ResponseEntity<?> eurekaUnlike(@AuthenticationPrincipal String userId, @PathVariable Long eurekaId) {
		logger.debug("eurekaUnlike(), who = {}, eurekaId = {}", userId, eurekaId);

		eurekaService.unlikeEureka(userId, eurekaId);

		return ResponseEntity.ok().build();
	}
}
