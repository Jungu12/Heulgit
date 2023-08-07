package morningrolecall.heulgit.notification.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.notification.domain.dto.NotificationCommentRequest;
import morningrolecall.heulgit.notification.domain.dto.NotificationFollowRequest;
import morningrolecall.heulgit.notification.domain.dto.NotificationLikeRequest;
import morningrolecall.heulgit.notification.service.NotificationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final NotificationService notificationService;

	@PostMapping("/followtest")
	public ResponseEntity<?> followRegister(@RequestBody NotificationFollowRequest notificationFollowRequest){
		notificationService.addFollowNotification(notificationFollowRequest);
		return ResponseEntity.ok().build();
	}
	@GetMapping(value ="/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public SseEmitter connect(@AuthenticationPrincipal String githubId, @RequestHeader(value = "Last-Event-ID",required = false,
		defaultValue = "") String lastEventId){
		return notificationService.connect(githubId,lastEventId);
	}

	@PostMapping("/liketest")
	public ResponseEntity<?> likeRegister(@RequestBody NotificationLikeRequest notificationLikeRequest){
		notificationService.addLikeNotification(notificationLikeRequest);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/commenttest")
	public ResponseEntity<?> commentRegister(@RequestBody NotificationCommentRequest notificationCommentRequest){
		notificationService.addCommentNotification(notificationCommentRequest);
		return ResponseEntity.ok().build();
	}


	@GetMapping("/{githubId}")
	public ResponseEntity<?> userNotifications(@AuthenticationPrincipal String githubId){
		return ResponseEntity.ok().body(notificationService.findNotification(githubId));
	}

	@GetMapping("/isread/{notificationId}")
	public ResponseEntity<?> changeReadState(@PathVariable Long notificationId){
		notificationService.changeNotificationState(notificationId);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/count")
	public ResponseEntity<?> getUnreadCount(@AuthenticationPrincipal String githubId){
		return ResponseEntity.ok().body(notificationService.getUnreadNotificationCount(githubId));
	}

}
