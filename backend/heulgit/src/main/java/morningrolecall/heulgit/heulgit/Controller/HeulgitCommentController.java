package morningrolecall.heulgit.heulgit.Controller;

import javax.persistence.NoResultException;

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
import morningrolecall.heulgit.heulgit.Service.HeulgitCommentService;
import morningrolecall.heulgit.heulgit.Service.HeulgitService;
import morningrolecall.heulgit.heulgit.domain.dto.HeulgitCommentDto;
import morningrolecall.heulgit.notification.domain.Notification;
import morningrolecall.heulgit.notification.domain.dto.NotificationCommentRequest;
import morningrolecall.heulgit.notification.service.NotificationService;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/h-comments")
public class HeulgitCommentController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final HeulgitCommentService heulgitCommentService;
	private final NotificationService notificationService;
	private final HeulgitService heulgitService;
	private final UserRepository userRepository;

	@PostMapping("/comments")
	public ResponseEntity<?> commentRegister(@AuthenticationPrincipal String githubId,
		@RequestBody HeulgitCommentDto heulgitCommentDto){
		logger.debug("commentRegiser(), who ={}, heulgitId={}, parentId = {}, content = {}, mentionedFollowers = {}",
			githubId, heulgitCommentDto.getHeulgitId(), heulgitCommentDto.getParentId(), heulgitCommentDto.getContent()
			,heulgitCommentDto.getMentionedFollowers());

		heulgitCommentService.addComment(githubId, heulgitCommentDto);
		String writerId = heulgitService.findHeulgit(heulgitCommentDto.getHeulgitId()).getGithubId();
		NotificationCommentRequest notificationCommentRequest = new NotificationCommentRequest(githubId,
			writerId,"/heulgit/posts/" + heulgitCommentDto.getHeulgitId(),heulgitCommentDto.getContent());
		notificationService.addCommentNotification(notificationCommentRequest);

		return ResponseEntity.ok().build();
	}


	@DeleteMapping("/{commentId}")
	public ResponseEntity<?> commentRemove(@AuthenticationPrincipal String githubId,
		@PathVariable long commentId) {
		logger.debug("commentRemove(), who = {}, commentId = {}", githubId, commentId);

		heulgitCommentService.removeComment(githubId, commentId);
		return ResponseEntity.ok().build();

	}

	@GetMapping("/{heulgitId}")
	public ResponseEntity<?> commentList(@PathVariable Long heulgitId,int pages) {
		logger.debug("commentList(), eurekaId = {}", heulgitId);

		return ResponseEntity.ok().body(heulgitCommentService.findComments(heulgitId));
	}

	@GetMapping("/my-comments")
	public ResponseEntity<?> myCommentList(@AuthenticationPrincipal String githubId, int pages){
		logger.debug("myCommentList(),who={}, pages={}",githubId,pages);
		return ResponseEntity.ok().body(heulgitCommentService.findMyComments(githubId,1));

	}
	@GetMapping("/parent-comments")
	public ResponseEntity<?> parentCommentList(@RequestParam Long heulgitId ,@RequestParam int pages){
		logger.debug("parentCommentList(), heulgitId={} ,pages={}",heulgitId,pages);
		return ResponseEntity.ok().body(heulgitCommentService.findParentComments(heulgitId,pages));
	}
	@GetMapping("/child-comments")
	public ResponseEntity<?> childCommentList(@RequestParam Long heulgitId, @RequestParam Long parentId, int pages){
		logger.debug("childCommentList(),heulgitId={},parentId={}, pages={}",heulgitId,parentId,pages);
		return ResponseEntity.ok().body(heulgitCommentService.findChildComments(heulgitId, parentId, pages));

	}
}
