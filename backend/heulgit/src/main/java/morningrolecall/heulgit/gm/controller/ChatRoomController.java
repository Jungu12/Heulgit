package morningrolecall.heulgit.gm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.gm.repository.ChatRoomRepository;
import morningrolecall.heulgit.gm.service.ChatRoomService;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/gm")
public class ChatRoomController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final ChatRoomService chatRoomService;
	private final ChatRoomRepository chatRoomRepository;

	// 모든 채팅방 목록 반환
	// Todo : 자신의 githubID 어노테이션으로 자신의 채팅방 조회하는 로직 추가
	@GetMapping("/chatrooms/{githubId}")
	@ResponseBody
	public ResponseEntity<?> chatRoomList(@AuthenticationPrincipal String githubId) {
		logger.debug("chatRoomList(), githubId = {}", githubId);

		return ResponseEntity.ok().body(chatRoomRepository.findMyChatRooms(githubId));
	}

	// 채팅방 생성
	// Todo : 자신의 githubID 어노테이션으로 들고오는 코드 추가
	@PostMapping("/room/{user2}")
	@ResponseBody
	public ResponseEntity<?> chatRoomAdd(@AuthenticationPrincipal String user1, @PathVariable String user2) {
		logger.info("chatRoomAdd(), user1 = {}, user2 = {}", user1, user2);

		chatRoomService.addChatRoom(user1, user2);

		return ResponseEntity.ok().body(chatRoomService.addChatRoom(user1, user2));
	}

	//채팅 로그 가져오기
	@GetMapping("/chats/{roomId}")
	@ResponseBody
	public ResponseEntity<?> messageList(@PathVariable String roomId) {
		logger.debug("messageList(), roomId = {}", roomId);

		//입장한 채팅방의 topic을 생성한다.
		chatRoomService.enterChatRoom(roomId);

		// Redis에서 해당 채팅방의 채팅 로그를 가져와서 반환한다.
		return ResponseEntity.ok().body(chatRoomService.findMessage(roomId));
	}

	// 상대의 포르필에서 gm기능을 활성화시키면 채팅방이 있는지 확인한 후 접속
	// 없다면 채팅방 생성 후 접속
	@GetMapping("/room/access/{user2}")
	@ResponseBody
	public ResponseEntity<?> chatRoomDetail(@AuthenticationPrincipal String user1, @PathVariable String user2) {
		logger.debug("chatRoomDetail(), user1 = {}, user2  = {}", user1, user2);

		return ResponseEntity.ok().body(chatRoomService.addChatRoom(user1, user2));
	}

	// 유저가 채팅방을 떠나 유저의 토픽을 삭제
	@DeleteMapping("/room/out/{user2}")
	@ResponseBody
	public ResponseEntity<?> chatRoomEnterDetail(@AuthenticationPrincipal String user1, @PathVariable String user2) {
		logger.debug("chatRoomDetail(), user1 = {}, user2 = {}", user1, user2);

		chatRoomService.userLeftChatRoom(user1, user2);

		return ResponseEntity.ok().build();
	}
}
