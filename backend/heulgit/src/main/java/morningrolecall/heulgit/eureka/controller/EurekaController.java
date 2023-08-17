package morningrolecall.heulgit.eureka.controller;

import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.dto.EurekaRequest;
import morningrolecall.heulgit.eureka.domain.dto.EurekaUpdateRequest;
import morningrolecall.heulgit.eureka.service.EurekaService;
import morningrolecall.heulgit.notification.domain.NotificationType;
import morningrolecall.heulgit.notification.domain.dto.NotificationLikeRequest;
import morningrolecall.heulgit.notification.service.NotificationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/eureka")
public class EurekaController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final EurekaService eurekaService;
	private final NotificationService notificationService;

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

	@PostMapping(value ="/posts",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> eurekaRegister(@AuthenticationPrincipal String githubId,
		@RequestPart(value = "file", required = false) List<MultipartFile> multipartFiles, @RequestPart(value= "data") EurekaRequest eurekaRequest ) {
		logger.debug("eurekaRegister(), who = {}, title = {}, content = {}, link = {}", githubId,
			eurekaRequest.getTitle(),
			eurekaRequest.getContent(),
			eurekaRequest.getLink());
		if (multipartFiles != null) {
			// multipartFiles가 null이 아닐 때의 처리
			eurekaService.addEureka(githubId, eurekaRequest, multipartFiles);
		} else {
			// multipartFiles가 null일 때의 처리
			eurekaService.addEureka(githubId, eurekaRequest, Collections.emptyList());
		}

		return ResponseEntity.ok().build();
	}

	@PostMapping(value = "/posts/update/{eurekaId}",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> eurekaUpdate(@AuthenticationPrincipal String userId, @PathVariable Long eurekaId,
		@RequestPart(value = "file",required = false) List<MultipartFile> multipartFiles, @RequestPart(value= "data") EurekaUpdateRequest eurekaUpdateRequest) {
		logger.debug("eurekaUpdate(), who = {}, eurekaId = {}, title = {}, content = {}, imageId = {}, link = {}",
			userId,
			eurekaUpdateRequest.getTitle(),
			eurekaUpdateRequest.getContent(), eurekaUpdateRequest.getLink());

		if (multipartFiles != null) {
			// multipartFiles가 null이 아닐 때의 처리
			eurekaService.updateEureka(eurekaId,userId, eurekaUpdateRequest, multipartFiles);
		} else {
			// multipartFiles가 null일 때의 처리
			eurekaService.updateEureka(eurekaId,userId, eurekaUpdateRequest, Collections.emptyList());
		}
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/posts/{eurekaId}")
	public ResponseEntity<?> eurekaRemove(@AuthenticationPrincipal String userId, @PathVariable Long eurekaId) {
		logger.debug("eurekaRemove(), who = {}, eurekaId = {}",userId, eurekaId);

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
		String writerId = eurekaService.findEureka(eurekaId).getUser().getGithubId();
		NotificationLikeRequest notificationLikeRequest = new NotificationLikeRequest(userId,writerId,
			"/eureka/posts/"+eurekaId, NotificationType.LIKE);
		notificationService.addLikeNotification(notificationLikeRequest);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/posts/unlike/{eurekaId}")
	public ResponseEntity<?> eurekaUnlike(@AuthenticationPrincipal String userId, @PathVariable Long eurekaId) {
		logger.debug("eurekaUnlike(), who = {}, eurekaId = {}", userId, eurekaId);

		eurekaService.unlikeEureka(userId, eurekaId);

		return ResponseEntity.ok().build();
	}

	// @GetMapping("/search/title")
	// public ResponseEntity<?> eurekaTitleSearch(@RequestParam String keyword,
	// 	@RequestParam String sort, @RequestParam int pages) {
	// 	logger.debug("eurekaSearch(), keyword = {}, sort = {}, pages = {}", keyword, sort, pages);
	//
	// 	return ResponseEntity.ok().body(eurekaService.searchTitleEurekas(keyword, sort, pages));
	// }

	// @GetMapping("/search/user")
	// public ResponseEntity<?> eurekaUserSearch(@RequestParam String keyword,
	// 	@RequestParam String sort, @RequestParam int pages) {
	// 	logger.debug("eurekaSearch(), keyword = {}, sort = {}, pages = {}", keyword, sort, pages);
	//
	// 	return ResponseEntity.ok().body(eurekaService.searchUserEurekas(keyword, sort, pages));
	// }

	@GetMapping("/myposts")
	public ResponseEntity<?> eurekaMyPosts(@AuthenticationPrincipal String userId, @RequestParam int pages) {
		logger.debug("eurekaMyPosts(), who = {}, sort = {}, pages = {}", userId,  pages);

		return ResponseEntity.ok().body(eurekaService.findMyEurekas(userId,  pages));
	}

	@GetMapping("/posts/likes")
	public ResponseEntity<?> eurekaLikedUsers(@AuthenticationPrincipal String githubId,@RequestParam Long eurekaId, int pages) {
		logger.debug("eurekaLikedUsers() who ={},eurekaId={} pages={}",githubId,eurekaId,pages);

		return ResponseEntity.ok().body(eurekaService.findLikedUser(eurekaId,githubId,pages));
	}
}
