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
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.domain.dto.EurekaCommentDto;
import morningrolecall.heulgit.eureka.service.EurekaCommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/e-comments")
public class EurekaCommentController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final EurekaCommentService eurekaCommentService;

	@PostMapping("/comments")
	public ResponseEntity<?> commentRegister(@AuthenticationPrincipal String githubId,
		@RequestBody EurekaCommentDto eurekaCommentDto) {
		logger.debug("commentRegister(), who = {}, eurekaId = {}, parentId = {}, content = {}, mentionedFollowers = {}",
			githubId,
			eurekaCommentDto.getEurekaId(), eurekaCommentDto.getParentId(), eurekaCommentDto.getContent(),
			eurekaCommentDto.getMentionedFollowers());

		eurekaCommentService.addComment(githubId, eurekaCommentDto);

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
		logger.debug("commentList(), eurekaId = {}", eurekaId);

		return ResponseEntity.ok().body(eurekaCommentService.findComments(eurekaId));
	}
}
