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
import morningrolecall.heulgit.eureka.domain.dto.EurekaCommentDto;
import morningrolecall.heulgit.eureka.service.EurekaCommentService;
import morningrolecall.heulgit.eureka.service.EurekaService;
import morningrolecall.heulgit.notification.domain.dto.NotificationCommentRequest;
import morningrolecall.heulgit.notification.service.NotificationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/e-comments")
public class EurekaCommentController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final EurekaCommentService eurekaCommentService;
	private final NotificationService notificationService;
	private final EurekaService eurekaService;

	@PostMapping("/comments")
	public ResponseEntity<?> commentRegister(@AuthenticationPrincipal String githubId,
		@RequestBody EurekaCommentDto eurekaCommentDto) {
		logger.debug("commentRegister(), who = {}, eurekaId = {}, parentId = {}, content = {}, mentionedFollowers = {}",
			githubId,
			eurekaCommentDto.getEurekaId(), eurekaCommentDto.getParentId(), eurekaCommentDto.getContent(),
			eurekaCommentDto.getMentionedFollowers());

		eurekaCommentService.addComment(githubId, eurekaCommentDto);
		String writerId = eurekaService.findEureka(eurekaCommentDto.getEurekaId()).getUser().getGithubId();
		NotificationCommentRequest notificationCommentRequest = new NotificationCommentRequest(githubId,writerId,
			"/eureka/posts/"+eurekaCommentDto.getEurekaId(),eurekaCommentDto.getContent());
		notificationService.addCommentNotification(notificationCommentRequest);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{commentId}")
	public ResponseEntity<?> commentRemove(@AuthenticationPrincipal String githubId,
		@PathVariable Long commentId) {
		logger.debug("commentRemove(), who = {}, commentId = {}", githubId, commentId);

		eurekaCommentService.removeComment(githubId, commentId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/{eurekaId}")
	public ResponseEntity<?> commentList(@PathVariable Long eurekaId) {


		return ResponseEntity.ok().body(eurekaCommentService.findComments(eurekaId));
	}

	@GetMapping("/parent-comments")
	public ResponseEntity<?> parentCommentList(@RequestParam Long eurekaId, @RequestParam int pages){
		logger.debug("parentCommentList(), eurekaId ={},pages={}",eurekaId,pages);
		return ResponseEntity.ok().body(eurekaCommentService.findParentComments(eurekaId,pages));
	}
	@GetMapping("/child-comments")
	public ResponseEntity<?> childCommentList(@RequestParam Long eurekaId, @RequestParam Long parentId, int pages){
		logger.debug("childCommentList(),eurekaId={},parentId={}, pages={}",eurekaId,parentId,pages);
		return  ResponseEntity.ok().body(eurekaCommentService.findChildComments(eurekaId, parentId, pages));
	}
}
