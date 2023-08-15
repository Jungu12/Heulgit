package morningrolecall.heulgit.heulgit.Controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.Response;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.heulgit.Service.HeulgitService;
import morningrolecall.heulgit.notification.domain.NotificationType;
import morningrolecall.heulgit.notification.domain.dto.NotificationLikeRequest;
import morningrolecall.heulgit.notification.service.NotificationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/heulgit")
public class HeulgitController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final HeulgitService heulgitService;
	private final NotificationService notificationService;


	// @GetMapping("/test")
	// public ResponseEntity<?> addHeulgit(){
	// 	heulgitService.fetchAndSaveTopRepositories();
	// 	return ResponseEntity.ok().build();
	// }


	@GetMapping("/posts")
	public ResponseEntity<?> heulgitList(
		@AuthenticationPrincipal String githubId,
		@RequestParam(required = false) String language,
		@RequestParam(required = false) String sort,
		@RequestParam(name = "start-year", required = false) Integer startYear,
		@RequestParam(name = "start-month", required = false) Integer startMonth,
		@RequestParam(name = "end-year", required = false) Integer endYear,
		@RequestParam(name = "end-month", required = false) Integer endMonth,
		@RequestParam int pages) {

		logger.debug("heulgitList(), language = {},"
				+ " sort = {}, startYear = {}, startMonth = {},"
				+ "  endYear ={} , endMonth, pages = {}," ,language,sort,startYear,
			startMonth, endYear, endMonth,pages);
		LocalDateTime startDate;
		LocalDateTime endDate;
		if (startYear != null && startMonth != null && endYear != null && endMonth != null){
			startDate = LocalDateTime.of(startYear,startMonth,1,0,0);
			LocalDate lastDayOfMonth = LocalDate.of(endYear, endMonth, 1).withDayOfMonth(LocalDate.of(endYear, endMonth, 1).lengthOfMonth());
			LocalTime lastTimeOfDay = LocalTime.of(23, 59, 59);
			endDate = LocalDateTime.of(lastDayOfMonth, lastTimeOfDay);
		} else{
			startDate = null;
			endDate = null;

		}
		return ResponseEntity.ok().body(heulgitService.searchHeulgits(githubId,sort,language,startDate,endDate,pages));
	}

	@GetMapping("/posts/{heulgitId}")
	public ResponseEntity<?> heulgitDetail(@PathVariable Long heulgitId) {
		logger.debug("heulgitDetail(), heulgitId = {}", heulgitId);

		return ResponseEntity.ok().body(heulgitService.findHeulgit(heulgitId));
	}

	@GetMapping("/posts/count")
	public ResponseEntity<?> heulgitCount() {
		logger.debug("heulgitCount()");
		return ResponseEntity.ok().body(heulgitService.countHeulgit());
	}

	@GetMapping("/posts/like/{heulgitId}")
	public ResponseEntity<?> heulgitLike(@AuthenticationPrincipal String userId,
		@PathVariable Long heulgitId) {
		logger.debug("heulgitLike(), who = {}, heulgitId = {}",userId,heulgitId);
		heulgitService.likeHeulgit(userId, heulgitId);
		String writerId = heulgitService.findHeulgit(heulgitId).getGithubId();

		NotificationLikeRequest notificationLikeRequest = new NotificationLikeRequest(userId,writerId,
			"/heuglit/posts/" +heulgitId, NotificationType.LIKE);
		notificationService.addLikeNotification(notificationLikeRequest);

		return ResponseEntity.ok().build();

	}
	@GetMapping("/posts/unlike/{heulgitId}")
	public ResponseEntity<?> huelgitUnlike(@AuthenticationPrincipal String userId,
		@PathVariable Long heulgitId){
		logger.debug("heulgitUnlike(), who ={}, heulgitId",userId, heulgitId);

		heulgitService.unlikeHeulgit(userId, heulgitId);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/myposts")
	public ResponseEntity<?> heulgitMyPosts(@AuthenticationPrincipal String userId, @RequestParam int pages) {
		logger.debug("heulgitMyPosts(), who = {}, sort ={}",userId, pages);
		return ResponseEntity.ok().body(heulgitService.searchUserHeulgits(userId, pages));
	}
	@GetMapping("/search/title")
	public ResponseEntity<?> heulgitTitleSearch(@RequestParam String keyword, @RequestParam int pages){
		logger.debug("heulgitTitleSearch(), keyword = {}, sort ={}",keyword, pages);
		return ResponseEntity.ok().body(heulgitService.searchTitleHueglits(keyword,pages));
	}
	@GetMapping("/search/user")
	public ResponseEntity<?> heulgitUserSearch(@RequestParam String keyword,@RequestParam int pages) {
		logger.debug("huelgitUserSearch(), keyword = {}, pages = {}", keyword, pages);
		return ResponseEntity.ok().body(heulgitService.searchUserHeulgits(keyword, pages));
	}

	@GetMapping("/mylikes")
	public ResponseEntity<?> heulgitMyLikes(@AuthenticationPrincipal String githubId, @RequestParam int pages) {
		logger.debug("heuglitMyLikes() who = {}, pages={}",githubId,pages);
		return ResponseEntity.ok().body(heulgitService.findMyLikeHeulgits(githubId,1));

	}
	@GetMapping("/posts/likes")
	public ResponseEntity<?> heulgitLikedUsers(@AuthenticationPrincipal String githubId,@RequestParam Long heulgitId,@RequestParam int pages){
		logger.debug("heulgitLikedUsers() who ={},heulgitId={} pages={}",githubId,heulgitId,pages);
		return ResponseEntity.ok().body(heulgitService.findLikedUser(heulgitId, githubId, pages));

	}
	@GetMapping("/feedlist")
	public ResponseEntity testHeulgit(@RequestParam int pages){
		return ResponseEntity.ok().body(heulgitService.feedList("LEEILHO",pages));
	}





}
