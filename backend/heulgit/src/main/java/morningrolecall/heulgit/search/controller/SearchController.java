package morningrolecall.heulgit.search.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.eureka.service.EurekaService;
import morningrolecall.heulgit.freeboard.service.FreeBoardService;
import morningrolecall.heulgit.heulgit.Service.HeulgitService;
import morningrolecall.heulgit.user.service.UserService;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final FreeBoardService freeBoardService;
	private final UserService userService;
	private final HeulgitService heulgitService;
	private final EurekaService eurekaService;

	/**
	 * 기본 호출 흘깃, 작성자로 검색
	 * */
	@GetMapping("/heulgit-user")
	public ResponseEntity<?> searchHeulgitByUserList(
		@RequestParam String keyword, @RequestParam int pages) {
		logger.debug("searchHeulgitByUserList(), keyword ={}, pages={}",keyword,pages);

		return ResponseEntity.ok().body(heulgitService.searchUserHeulgits(keyword, pages));
	}

	/**
	 * 흘깃, 타이틀로 검색*/
	@GetMapping("/heulgit-title")
	public ResponseEntity<?> searchHeulgitByTitleList(
		@RequestParam String keyword, @RequestParam int pages) {
		logger.debug("searchHeulgitByTitleList(), keyword ={}, pages={}",keyword,pages);

		return ResponseEntity.ok().body(heulgitService.searchTitleHueglits(keyword, pages));
	}
	/**
	 * 유레카, 작성자로 검색
	 */

	@GetMapping("/eureka-user")
	public ResponseEntity<?> searchEurekaByUserList(@RequestParam String keyword, @RequestParam int pages){
		logger.debug("searchEurekaByUserList(), keyword ={}, pages={}",keyword,pages);

		return ResponseEntity.ok().body(eurekaService.searchUserEurekas(keyword, pages));
	}

	/**
	 * 유레카, 타이틀로 검색*/
	@GetMapping("/eureka-title")
	public ResponseEntity<?> searchEurekaByTitle(@RequestParam String keyword, @RequestParam int pages){
		logger.debug("searchEurekaByTitle(), keyword ={}, pages={}",keyword,pages);

		return  ResponseEntity.ok().body(eurekaService.searchTitleEurekas(keyword, pages));

	}



	/**
	 * 자유게시판, 사용자로 검색
	 * */
	@GetMapping("/freeboard-user")
	public ResponseEntity<?> searchFreeBoardByUser(@RequestParam String keyword, @RequestParam int pages){
		logger.debug("searchFreeBoardByUser(), keyword ={}, pages={}",keyword,pages);
		return ResponseEntity.ok().body(freeBoardService.searchUserFreeBoards(keyword, pages));

	}

	/**
	 * 자유게시판, 타이틀로 검색
	 * */
	@GetMapping("/freeboard-title")
	public ResponseEntity<?> searchFreeBoardByTitle(@RequestParam String keyword, @RequestParam int pages){
		logger.debug("searchFreeBoardByTitle(), keyword ={}, pages={}",keyword,pages);
		return ResponseEntity.ok().body(freeBoardService.searchTitleFreeBoards(keyword, pages));

	}
	/** 사용자 검색
	 * */
	@GetMapping("/user")
	public ResponseEntity<?> searchUser(@RequestParam String keyword ){
		logger.debug("search");
		return  ResponseEntity.ok().body(userService.findUser(keyword));
	}




		// 	logger.debug("searchList");
	// 	if("heulgit".equals(type)){
	// 		if("githubId".equals(kind)){
	// 			return ResponseEntity.ok().body(heulgitService.searchUserHeulgits(keyword,pages));
	// 		} else if("title".equals(kind)){
	// 			return ResponseEntity.ok().body(heulgitService.searchTitleHueglits(keyword, pages));
	// 		}
	//
	// 	} else if("freeboard".equals(type)){
	// 		if("githubId".equals(kind)){
	// 			return ResponseEntity.ok().body(freeBoardService.searchUserFreeBoards(keyword, pages));
	// 		} else if("title".equals(kind)){
	// 			return ResponseEntity.ok().body(freeBoardService.searchTitleFreeBoards(keyword, pages));
	// 		}
	//
	// 	} else if("eureka".equals(type)){
	// 		if("githubId".equals(kind)){
	// 			return ResponseEntity.ok().body(eurekaService.searchUserEurekas(keyword, pages));
	//
	// 		} else if("title".equals(kind)){
	// 			return ResponseEntity.ok().body(eurekaService.searchTitleEurekas(keyword, pages));
	// 		}
	//
	// 	} else{
	//
	//
	// 	}





}
