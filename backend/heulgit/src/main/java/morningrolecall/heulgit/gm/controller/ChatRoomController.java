package morningrolecall.heulgit.gm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.gm.dto.ChatMessage;
import morningrolecall.heulgit.gm.dto.ChatRoom;
import morningrolecall.heulgit.gm.repository.ChatRoomRepository;
import morningrolecall.heulgit.gm.service.ChatRoomService;

@RequiredArgsConstructor
@Controller
@RequestMapping("/gm")
public class ChatRoomController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final ChatRoomService messageService;
	private final ChatRoomRepository chatRoomRepository;

	// 채팅 리스트 화면
	// 화면 반환 api 삭제 예정
	@GetMapping("/room")
	public String rooms(Model model) {
		return "/chat/room";
	}

	// 모든 채팅방 목록 반환
	// Todo : 자신의 githubID 어노테이션으로 자신의 채팅방 조회하는 로직 추가
	@GetMapping("/chatrooms/{githubId}")
	@ResponseBody
	public List<ChatRoom> room(@PathVariable String githubId) {
		return chatRoomRepository.findMyChatRooms(githubId);
	}

	// 채팅방 생성
	// Todo : 자신의 githubID 어노테이션으로 들고오는 코드 추가
	@PostMapping("/room")
	@ResponseBody
	public ChatRoom createRoom(@RequestParam String user2) {
		String user1 = "jungu12";
		logger.info("createRoom(), user1 = {}, user2 = {}", user1, user2);
		logger.info("createChatRoom() = {}", chatRoomRepository.createChatRoom(user1, user2));
		return chatRoomRepository.createChatRoom(user1, user2);
	}

	// 채팅방 입장 화면
	@GetMapping("/room/enter/{roomId}")
	public String roomDetail(Model model, @PathVariable String roomId) {
		model.addAttribute("roomId", roomId);
		logger.info("roomDetail(), roomId = {}", roomId);
		return "/chat/roomdetail";
	}

	//채팅 로그 가져오기
	@GetMapping("/chats/{roomId}")
	@ResponseBody
	public List<ChatMessage> enterChatRoom(@PathVariable String roomId) {
		//입장한 채팅방의 topic을 생성한다.
		messageService.enterChatRoom(roomId);
		// Redis에서 해당 채팅방의 채팅 로그를 가져와서 반환한다.
		List<ChatMessage> list = messageService.getChatLogs(roomId);

		return messageService.getChatLogs(roomId);
	}
}
