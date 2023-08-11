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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/heulgit")
public class HeulgitController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final HeulgitService heulgitService;


	// @GetMapping("/test")
	// public ResponseEntity<?> addHeulgit(){
	// 	heulgitService.fetchAndSaveTopRepositories();
	// 	return ResponseEntity.ok().build();
	// }


	@GetMapping("/posts")
	public ResponseEntity<?> heulgitList(
		// @RequestParam(required = false) String language,
		// @RequestParam(required = false) String sort,
		// @RequestParam(name = "start-year", required = false) Integer startYear,
		// @RequestParam(name = "start-month", required = false) Integer startMonth,
		// @RequestParam(name = "end-year", required = false) Integer endYear,
		// @RequestParam(name = "end-month", required = false) Integer endMonth,
		@RequestParam int pages) {

		// logger.debug("heulgitList(), language = {},"
		// 		+ " sort = {}, startYear = {}, startMonth = {},"
		// 		+ "  endYear ={} , endMonth, pages = {}," ,language,sort,startYear,
		// 	startMonth, endYear, endMonth,pages);

		// boolean hasLikes = false;
		// boolean hasStars = false;
		// if(sort.equals("likes")){
		// 	hasLikes = true;
		// } else if(sort.equals("stars")){
		// 	hasStars = true;
		// }
		//
		//
		//
		// if (startYear != null && startMonth != null && endYear != null && endMonth != null){
		// 	LocalDateTime startDate = LocalDateTime.of(startYear,startMonth,1,0,0);
		// 	LocalDate lastDayOfMonth = LocalDate.of(endYear, endMonth, 1).withDayOfMonth(LocalDate.of(endYear, endMonth, 1).lengthOfMonth());
		// 	LocalTime lastTimeOfDay = LocalTime.of(23, 59, 59);
		//
		// 	// LocalDateTime으로 합쳐서 출력
		// 	LocalDateTime endDate = LocalDateTime.of(lastDayOfMonth, lastTimeOfDay);
		// 	Pageable pageable = PageRequest.of(pages - 1, 20);
		//
		// 	heulgitService.searchHeulgits(sort, language,startDate,endDate,pageable);
		// } else{
		//
		//
		// }

		logger.debug("heulgitList()");

		return ResponseEntity.ok().body(heulgitService.findHeulgits(pages));
	}

	@GetMapping("/posts/{heulgitId}")
	public ResponseEntity<?> eurekaDetail(@PathVariable Long heulgitId) {
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

		return ResponseEntity.ok().build();

	}
	@GetMapping("/posts/unlike/{heulgitId}")
	public ResponseEntity<?> huelgitUnlike(@AuthenticationPrincipal String userId,
		@PathVariable Long heulgitId){
		logger.debug("heulgitUnlike(), who ={}, heulgitId",userId, heulgitId);

		heulgitService.unlikeHeulgit("LEEILHO", heulgitId);

		return ResponseEntity.ok().build();
	}





}
