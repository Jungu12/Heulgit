package morningrolecall.heulgit.eureka.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
		logger.debug("commentRegister(), who = {}, eurekaId = {}, content = {}, mentionedFollowers = {}", githubId,
			eurekaCommentDto.getEurekaId(), eurekaCommentDto.getContent(), eurekaCommentDto.getMentionedFollowers());

		eurekaCommentService.addComment(githubId, eurekaCommentDto);

		return ResponseEntity.ok().build();
	}
}
