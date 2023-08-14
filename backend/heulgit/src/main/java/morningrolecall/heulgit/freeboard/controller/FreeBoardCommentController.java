package morningrolecall.heulgit.freeboard.controller;

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
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardCommentRequest;
import morningrolecall.heulgit.freeboard.service.FreeBoardCommentService;
import morningrolecall.heulgit.freeboard.service.FreeBoardService;
import morningrolecall.heulgit.notification.domain.dto.NotificationCommentRequest;
import morningrolecall.heulgit.notification.service.NotificationService;

@RestController
@RequestMapping("/api/f-comments")
@RequiredArgsConstructor
public class FreeBoardCommentController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final FreeBoardCommentService freeBoardCommentService;
	private final FreeBoardService freeBoardService;
	private final NotificationService notificationService;

	@PostMapping("/comments")
	public ResponseEntity<?> commentRegister(@AuthenticationPrincipal String githubId,
		@RequestBody FreeBoardCommentRequest freeBoardCommentRequest) {
		logger.debug(
			"commentRegister(), who = {}, freeBoardId = {}, parentId = {}, content = {}, mentionedFollowers = {}",
			githubId,
			freeBoardCommentRequest.getFreeBoardId(), freeBoardCommentRequest.getParentId(),
			freeBoardCommentRequest.getContent(),
			freeBoardCommentRequest.getMentionedFollowers());

		freeBoardCommentService.addComment(githubId, freeBoardCommentRequest);
		String writerId = freeBoardService.findFreeBoard(freeBoardCommentRequest.getFreeBoardId()).getUser().getGithubId();
		NotificationCommentRequest notificationCommentRequest = new NotificationCommentRequest(githubId,writerId,
			"/freeboard/posts"+freeBoardCommentRequest.getFreeBoardId(),freeBoardCommentRequest.getContent());
		notificationService.addCommentNotification(notificationCommentRequest);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{commentId}")
	public ResponseEntity<?> commentRemove(@AuthenticationPrincipal String githubId,
		@PathVariable Long commentId) {
		logger.debug("commentRemove(), who = {}, commentId = {}", githubId, commentId);

		freeBoardCommentService.removeComment(githubId, commentId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/{freeBoardId}")
	public ResponseEntity<?> commentList(@PathVariable Long freeBoardId) {
		logger.debug("commentList(), freeBoardId = {}", freeBoardId);

		return ResponseEntity.ok().body(freeBoardCommentService.findComments(freeBoardId));
	}
	@GetMapping("/parent-comments")
	public ResponseEntity<?> parentCommentList(@RequestParam Long freeBoardId, @RequestParam int pages){
		logger.debug("parentCommentList(), freeBoardId ={},pages={}",freeBoardId,pages);
		return ResponseEntity.ok().body(freeBoardCommentService.findParentComments(freeBoardId,pages));
	}
	@GetMapping("/child-comments")
	public ResponseEntity<?> childCommentList(@RequestParam Long freeBoardId, @RequestParam Long parentId, int pages){
		logger.debug("childCommentList(),freeBoardId={},parentId={}, pages={}",freeBoardId,parentId,pages);
		return  ResponseEntity.ok().body(freeBoardCommentService.findChildComments(freeBoardId, parentId, pages));
	}
}
