package morningrolecall.heulgit.relation.controlller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import morningrolecall.heulgit.relation.service.RelationService;

@RestController
@RequestMapping("/relations")
@RequiredArgsConstructor
@Slf4j
public class RelationController {

	private final RelationService relationService;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 사용자와 다른 유저의 팔로우 여부를 확인할 수 있다.
	 * @param from : 사용자
	 * @param to : follow 여부를 확인하고 싶은 user
	 */
	@GetMapping("/state")
	public ResponseEntity<?> checkFollowState(@RequestParam String from, @RequestParam String to) {
		logger.debug("followStateCheck(), ");
		return ResponseEntity.ok().body(relationService.checkFollowState(from, to));
	}

	// /**
	//  * 사용자는 자신이 팔로우하는 다른 유저와 팔로우 관계를 끊을 수 있다.
	//  * @param from : 사용자
	//  * @param to : 사용자가 팔로우를 취소하려는 다른 유저 Github ID
	//  */
	// @PutMapping("/unfollow")
	// public ResponseEntity<?> cancelFollow(@RequestParam String from, @RequestParam String to) {
	//
	// 	relationService.
	//
	// 	return ResponseEntity.ok().build();
	// }
	//
	// /**
	//  * 사용자는 다른 유저를 팔로우 할 수 있다.
	//  * @param from : 사용자
	//  * @param userId : 사용자가 팔로우하려는 다른 유저 Github ID
	//  */
	// @PostMapping("/follow")
	// public ResponseEntity<?> addFollow(@AuthenticationPrincipal String to, @PathVariable String userId) {
	// 	return ResponseEntity.ok().body();
	// }
	//
	// /**
	//  * 사용자는 자신을 팔로우하는 다른 유저들을 확인할 수 있다.
	//  * @param userId : 사용자가 팔로우하려는 다른 유저 Github ID
	//  */
	// @GetMapping("/followers/{userId}")
	// public ResponseEntity<?> getFollowers(@AuthenticationPrincipal String to, @PathVariable String userId) {
	// 	return ResponseEntity.ok().build();
	// }
	//
	// /**
	//  * 사용자는 자신이 팔로우하는 다른 유저들을 확인할 수 있다.
	//  * @param userId : 사용자가 팔로앙 중인 다른 유저 Github ID
	//  */
	// @GetMapping("/followings/{userId}")
	// public ResponseEntity<?> getFollowings(@AuthenticationPrincipal String to, @PathVariable String userId) {
	//
	// }
}
