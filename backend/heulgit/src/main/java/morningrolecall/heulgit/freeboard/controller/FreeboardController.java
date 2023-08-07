package morningrolecall.heulgit.freeboard.controller;

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
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardRequest;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardUpdateRequest;
import morningrolecall.heulgit.freeboard.service.FreeBoardService;

@RestController
@RequestMapping("/api/freeboard")
@RequiredArgsConstructor
public class FreeboardController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final FreeBoardService freeBoardService;

	@GetMapping("/posts")
	public ResponseEntity<?> freeBoardList(@RequestParam String sort, @RequestParam int pages) {
		logger.debug("freeboardList(), sort = {}, pages = {}", sort, pages);
		return ResponseEntity.ok().body(freeBoardService.findFreeBoards(sort, pages));
	}

	@GetMapping("/posts/{freeboardId}")
	public ResponseEntity<?> freeBoardDetail(@PathVariable Long freeboardId) {
		logger.debug("freeboardDetail(), freeboardId = {}", freeboardId);

		return ResponseEntity.ok().body(freeBoardService.findFreeBoard(freeboardId));
	}

	@PostMapping("/posts")
	public ResponseEntity<?> freeBoardRegister(@AuthenticationPrincipal String githubId,
		@RequestBody FreeBoardRequest freeBoardRequest) {
		logger.debug("freeBoardRegister(), who = {}, title = {}, content = {}, imageId = {}", githubId,
			freeBoardRequest.getTitle(),
			freeBoardRequest.getContent(), freeBoardRequest.getFileUri().size());

		freeBoardService.addFreeBoard(githubId, freeBoardRequest);

		return ResponseEntity.ok().build();
	}

	@PutMapping("/posts/update")
	public ResponseEntity<?> freeBoardUpdate(@AuthenticationPrincipal String userId,
		@RequestBody FreeBoardUpdateRequest freeBoardUpdateRequest) {
		logger.debug("freeBoardUpdate(), who = {}, freeBoardId = {}, title = {}, content = {}, imageId = {}",
			userId, freeBoardUpdateRequest.getFreeBoardId(),
			freeBoardUpdateRequest.getTitle(),
			freeBoardUpdateRequest.getContent(), freeBoardUpdateRequest.getFileUri());

		freeBoardService.updateFreeBoard(userId, freeBoardUpdateRequest);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/posts/{freeBoardId}")
	public ResponseEntity<?> freeBoardRemove(@AuthenticationPrincipal String userId, @PathVariable Long freeBoardId) {
		logger.debug("freeBoardRemove(), who = {}, freeBoardId = {}", userId, freeBoardId);

		freeBoardService.removeFreeBoard(userId, freeBoardId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/posts/count")
	public ResponseEntity<?> freeBoardCount() {
		logger.debug("freeBoardCount()");

		return ResponseEntity.ok().body(freeBoardService.countFreeBoards());
	}

	@GetMapping("/posts/like/{freeBoardId}")
	public ResponseEntity<?> freeBoardLike(@AuthenticationPrincipal String userId, @PathVariable Long freeBoardId) {
		logger.debug("freeBoardLike(), who = {}, freeBoardId = {}", userId, freeBoardId);

		freeBoardService.likeFreeBoard(userId, freeBoardId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/posts/unlike/{freeBoardId}")
	public ResponseEntity<?> freeBoardUnlike(@AuthenticationPrincipal String userId, @PathVariable Long freeBoardId) {
		logger.debug("freeBoardUnlike(), who = {}, freeBoardId = {}", userId, freeBoardId);

		freeBoardService.unlikeFreeBoard(userId, freeBoardId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/myposts")
	public ResponseEntity<?> freeBoardCreatedByMe(@AuthenticationPrincipal String userId, @RequestParam int pages) {
		logger.debug("freeBoardMyPosts(), who = {}, pages = {}", userId, pages);

		return ResponseEntity.ok().body(freeBoardService.findMyFreeBoards(userId, pages));
	}

	@GetMapping("/posts/likes/{freeBoardId}")
	public ResponseEntity<?> freeBoardLikedUsers(@PathVariable Long freeBoardId) {
		logger.debug("freeBoardLikedUsers(), freeBoardId = {}", freeBoardId);

		return ResponseEntity.ok().body(freeBoardService.findLikedUsers(freeBoardId));
	}

	@GetMapping("/search/title")
	public ResponseEntity<?> freeBoardSearchByTitle(@RequestParam String keyword,
		@RequestParam String sort, @RequestParam int pages) {
		logger.debug("freeBoardSearchByTitle(), keyword = {}, sort = {}, pages = {}", keyword, sort, pages);

		return ResponseEntity.ok().body(freeBoardService.searchTitleFreeBoards(keyword, sort, pages));
	}

	@GetMapping("/search/user")
	public ResponseEntity<?> freeBoardSearchByUser(@RequestParam String keyword,
		@RequestParam String sort, @RequestParam int pages) {
		logger.debug("freeBoardSearchByUser(), keyword = {}, sort = {}, pages = {}", keyword, sort, pages);

		return ResponseEntity.ok().body(freeBoardService.searchUserFreeBoards(keyword, sort, pages));
	}
}
