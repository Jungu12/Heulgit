package morningrolecall.heulgit.freeboard.controller;

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

	@PostMapping(value ="/posts",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> freeBoardRegister(@AuthenticationPrincipal String githubId
		,@RequestPart(value = "file", required = false) List<MultipartFile> multipartFiles, @RequestPart(value= "data") FreeBoardRequest freeBoardRequest
		 ) {
		logger.debug("freeBoardRegister(), who = {}, title = {}, content = {}, imageId = {}", githubId,
			freeBoardRequest.getTitle(),
			freeBoardRequest.getContent());
		if (multipartFiles != null) {
			// multipartFiles가 null이 아닐 때의 처리
			freeBoardService.addFreeBoard(githubId, freeBoardRequest, multipartFiles);
		} else {
			// multipartFiles가 null일 때의 처리
			freeBoardService.addFreeBoard(githubId, freeBoardRequest, Collections.emptyList());
		}



		return ResponseEntity.ok().build();
	}

	@PostMapping(value = "/posts/update/{freeBoardId}",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> freeBoardUpdate(@AuthenticationPrincipal String userId, @PathVariable Long freeBoardId,
		@RequestPart(value = "file", required = false) List<MultipartFile> multipartFiles, @RequestPart(value= "data") FreeBoardUpdateRequest freeBoardUpdateRequest) {
		logger.debug("freeBoardUpdate(), who = {}, freeBoardId = {}, title = {}, content = {}, imageId = {}",
			userId, freeBoardId,
			freeBoardUpdateRequest.getTitle(),
			freeBoardUpdateRequest.getContent());

		if (multipartFiles != null) {
			// multipartFiles가 null이 아닐 때의 처리
			freeBoardService.updateFreeBoard(freeBoardId,userId, freeBoardUpdateRequest, multipartFiles);
		} else {
			// multipartFiles가 null일 때의 처리
			freeBoardService.updateFreeBoard(freeBoardId,userId, freeBoardUpdateRequest, Collections.emptyList());
		}
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
