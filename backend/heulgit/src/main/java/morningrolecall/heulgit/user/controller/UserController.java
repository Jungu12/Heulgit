package morningrolecall.heulgit.user.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import morningrolecall.heulgit.auth.service.AuthService;
import morningrolecall.heulgit.auth.util.CookieManager;
import morningrolecall.heulgit.eureka.service.EurekaService;
import morningrolecall.heulgit.freeboard.service.FreeBoardService;
import morningrolecall.heulgit.heulgit.Service.HeulgitService;
import morningrolecall.heulgit.user.domain.dto.UserCommitTypeRequest;
import morningrolecall.heulgit.user.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;
	private final AuthService authService;
	private final FreeBoardService freeBoardService;
	private final EurekaService eurekaService;
	private final HeulgitService heulgitService;
	private final Logger logger = LoggerFactory.getLogger(getClass());


	/**
	 * 사용자를 logout시킨다.
	 * Redis에 저장된 토큰을 삭제하고, 쿠키에 실린 토큰을 지운다.
	 * @param refreshToken
	 * @param response
	 * @return
	 */
	@GetMapping("/logout")
	public ResponseEntity<?> logout(@CookieValue(name = "refreshToken") String refreshToken,
		HttpServletResponse response) {
		if (refreshToken != null) {
			String userId = authService.getUserId(refreshToken).getGithubId();
			//Redis 저장소에 저장 된 토큰 삭제
			userService.logout(userId);

			response.addHeader("Set-Cookie", CookieManager.expireCookie(userId).toString());

		}
		return ResponseEntity.ok().build();
	}

	/**
	 * 유저에 대한 정보를 반환한다.
	 * @param githubId
	 * @return
	 */
	@GetMapping("")
	public ResponseEntity<?> myDetail(@AuthenticationPrincipal String githubId) {
		logger.debug("myDetail(), githubId = {}", githubId);

		return ResponseEntity.ok().body(userService.findUser(githubId));
	}

	/**
	 * 유저에 대한 정보를 반환한다.
	 * @param githubId
	 * @return
	 */
	@GetMapping("/{githubId}")
	public ResponseEntity<?> userDetail(@PathVariable String githubId) {
		logger.debug("userDetail(), githubId = {}", githubId);

		return ResponseEntity.ok().body(userService.findUser(githubId));
	}

	/**
	 * 유저의 커밋 분석을 조회한다.
	 * @param githubId
	 * @return
	 */
	@GetMapping("/commit-analyze/{githubId}")
	public ResponseEntity<?> commitInfoList(@PathVariable String githubId) {
		logger.debug("commitInfoList(), githubId = {}", githubId);

		return ResponseEntity.ok().body(userService.findCommitInfo(githubId));
	}

	/**
	 * 유저의 커밋 타입을 조회한다.
	 * @param githubId
	 * @return
	 */
	@GetMapping("/commit-type")
	public ResponseEntity<?> commitTypeList(@AuthenticationPrincipal String githubId) {
		logger.debug("commitTypeList(), githubId = {}", githubId);

		return ResponseEntity.ok().body(userService.getMyCommitType(githubId));
	}

	/**
	 * 사용자는 커밋 분석에 사용할 매핑 정보를 커스텀할 수 있다.
	 * @param githubId
	 * @param userCommitTypeRespons
	 * @return
	 */
	@PostMapping("/commit-custom")
	public ResponseEntity<?> commitTypeModify(@AuthenticationPrincipal String githubId,
		@RequestBody List<UserCommitTypeRequest> userCommitTypeRespons) {
		logger.debug("commitTypeModify(), githubId = {}", githubId);

		userService.modifyCommitType(githubId, userCommitTypeRespons);

		return ResponseEntity.ok().build();
	}

	/**
	 * 사용자는 사용자가 팔로우한 사람들의 랭킹을 볼 수 있다.
	 * @param githubId
	 * @param type
	 * @return
	 */
	@GetMapping("/ranking")
	public ResponseEntity<?> rankingDetail(@AuthenticationPrincipal String githubId,
		@RequestParam("type") String type) {
		logger.debug("rankingDetail(), githubId = {}, type = {}", githubId, type);

		return ResponseEntity.ok().body(userService.getRankingInfo(githubId, type));
	}

	/**
	 * 사용자는 좋아요 누른 자유 게시판 게시물을 볼 수 있다.
	 * @param githubId
	 * @param pages
	 * @return
	 */
	@GetMapping("/activities/freeboard/my-likes")
	public ResponseEntity<?> freeboardMyLikesList(@AuthenticationPrincipal String githubId,
		@RequestParam("pages") int pages) {
		logger.debug("freebaordMyLikesList(), githubId = {}, pages = {}", githubId, pages);

		return ResponseEntity.ok().body(freeBoardService.findMyLikeFreeBoards(githubId, pages));
	}

	/**
	 * 사용자는 좋아요 누른 흘깃 게시물을 볼 수 있다.
	 * @param githubId
	 * @param pages
	 * @return
	 */
	@GetMapping("/activities/heulgit/my-likes")
	public ResponseEntity<?> heulgitMyLikesList(@AuthenticationPrincipal String githubId,
		@RequestParam("pages") int pages) {
		logger.debug("heulgitMyLikesList(), githubId = {}, pages = {}", githubId, pages);

		return ResponseEntity.ok().body(heulgitService.findMyLikeHeulgits(githubId, pages));
	}

	/**
	 * 사용자는 좋아요 누른 유레카 게시물을 볼 수 있다.
	 * @param githubId
	 * @param pages
	 * @return
	 */
	@GetMapping("/activities/eureka/my-likes")
	public ResponseEntity<?> eurekaMyLikesList(@AuthenticationPrincipal String githubId,
		@RequestParam("pages") int pages) {
		logger.debug("eurekaMyLikesList(), githubId = {}, pages = {}", githubId, pages);

		return ResponseEntity.ok().body(eurekaService.findMyLikeEurekas(githubId, pages));
	}

	/**
	 * 사용자는 작성한 댓글을 볼 수 있다.
	 * @param githubId
	 * @return
	 */
	@GetMapping("/activities/my-comments")
	public ResponseEntity<?> myCommentsList(@AuthenticationPrincipal String githubId, @RequestParam int pages) {
		logger.debug("myCommentsList(), githubId = {}, pages = {}", githubId, pages);

		return ResponseEntity.ok().body(userService.findMyLikesComments(githubId, pages));
	}

	/**
	 * 사용자 멘션시 사용할 유저 검색 API
	 * 키워드를 포함한 userId들을 조회한다.
	 * @param githubId
	 * @param keyword
	 * @return
	 */
	@GetMapping("/search")
	public ResponseEntity<?> followingsList(@AuthenticationPrincipal String githubId,
		@RequestParam("keyword") String keyword) {
		logger.debug("followingList(), githubId = {}", githubId);

		return ResponseEntity.ok().body(userService.findFollowingsByKeyword(githubId, keyword));
	}

}
