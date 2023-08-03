package morningrolecall.heulgit.eureka.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.dto.EurekaRequest;
import morningrolecall.heulgit.eureka.domain.dto.EurekaUpdateRequest;
import morningrolecall.heulgit.eureka.service.EurekaService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/eureka")
public class EurekaController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final EurekaService eurekaService;

	@GetMapping("/posts")
	public ResponseEntity<?> eurekaList(@RequestParam String sort, @RequestParam int pages) {
		logger.debug("eurekaList(), sort = {}, pages = {}", sort, pages);
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
		@RequestBody EurekaRequest eurekaRequest) {
		logger.debug("eurekaRegister(), who = {}, title = {}, content = {}, imageId = {}, link = {}", githubId,
			eurekaRequest.getTitle(),
			eurekaRequest.getContent(), eurekaRequest.getFileUri().size(), eurekaRequest.getLink());

		eurekaService.addEureka(githubId, eurekaRequest);

		return ResponseEntity.ok().build();
	}

	@PutMapping("/posts/update")
	public ResponseEntity<?> eurekaUpdate(@AuthenticationPrincipal String userId,
		@RequestBody EurekaUpdateRequest eurekaUpdateRequest) {
		logger.debug("eurekaUpdate(), who = {}, eurekaId = {}, title = {}, content = {}, imageId = {}, link = {}",
			userId, eurekaUpdateRequest.getEurekaId(),
			eurekaUpdateRequest.getTitle(),
			eurekaUpdateRequest.getContent(), eurekaUpdateRequest.getFileUri(), eurekaUpdateRequest.getLink());

		eurekaService.updateEureka(userId, eurekaUpdateRequest);

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

	@GetMapping("/search/title")
	public ResponseEntity<?> eurekaTitleSearch(@RequestParam String keyword,
		@RequestParam String sort, @RequestParam int pages) {
		logger.debug("eurekaSearch(), keyword = {}, sort = {}, pages = {}", keyword, sort, pages);

		return ResponseEntity.ok().body(eurekaService.searchTitleEurekas(keyword, sort, pages));
	}

	@GetMapping("/search/user")
	public ResponseEntity<?> eurekaUserSearch(@RequestParam String keyword,
		@RequestParam String sort, @RequestParam int pages) {
		logger.debug("eurekaSearch(), keyword = {}, sort = {}, pages = {}", keyword, sort, pages);

		return ResponseEntity.ok().body(eurekaService.searchUserEurekas(keyword, sort, pages));
	}

	@GetMapping("/myposts")
	public ResponseEntity<?> eurekaMyPosts(@AuthenticationPrincipal String userId, @RequestParam String sort,
		@RequestParam int pages) {
		logger.debug("eurekaMyPosts(), who = {}, sort = {}, pages = {}", userId, sort, pages);

		return ResponseEntity.ok().body(eurekaService.searchUserEurekas(userId, sort, pages));
	}

	@GetMapping("/posts/likes/{eurekaId}")
	public ResponseEntity<?> eurekaLikedUsers(@PathVariable Long eurekaId) {
		logger.debug("eurekaLikedUsers(), eurekaId = {}", eurekaId);

		return ResponseEntity.ok().body(eurekaService.findLikedUsers(eurekaId));
	}
}
