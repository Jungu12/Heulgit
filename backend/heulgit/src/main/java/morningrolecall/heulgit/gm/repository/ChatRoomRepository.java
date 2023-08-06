package morningrolecall.heulgit.gm.repository;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.gm.dto.ChatMessage;
import morningrolecall.heulgit.gm.dto.ChatRoom;

@RequiredArgsConstructor
@Repository
public class ChatRoomRepository {
	private static final String CHAT_ROOMS = "chatRoom";
	//Redis
	private final RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, ChatRoom> opsHashChatRoom;
	// 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@PostConstruct
	private void init() {
		opsHashChatRoom = redisTemplate.opsForHash();
	}

	/** 유저의 채팅방들을 List로 반환한다. */
	public List<ChatRoom> findMyChatRooms(String githubId) {
		List<ChatRoom> ChatRooms = opsHashChatRoom.values(CHAT_ROOMS);
		List<ChatRoom> myChatRooms = new ArrayList<>();
		for (ChatRoom chatRoom : ChatRooms) {
			if (chatRoom.getUser1().equals(githubId) || chatRoom.getUser2().equals(githubId)) {
				myChatRooms.add(chatRoom);
				logger.debug("added chatRoom = {}", chatRoom);
			}
		}
		return myChatRooms;
	}

	/**
	 * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
	 * Todo : 돌아가는지 확인 필요!!!!!!!!!!!
	 */
	public ChatRoom createChatRoom(String user1, String user2) {
		ChatRoom chatRoom = getChatRoom(user1 + ":" + user2);
		if (chatRoom == null) {
			chatRoom = ChatRoom.builder()
				.roomId(user1 + ":" + user2)
				.user1(user1)
				.user2(user2)
				.build();
			logger.debug("createChatRoom(), roomId = {}, chatRoomUser1 = {}, chatRoomUser2 = {} ", chatRoom.getRoomId(),
				chatRoom.getUser1(), chatRoom.getUser2());
			opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
		}
		return chatRoom;
	}

	/**
	 * 채팅방에  저장된 채팅 로그들을 들고 온다.
	 */
	public List<ChatMessage> getChatLogs(String roomId) {
		ChatRoom curChatRoom = opsHashChatRoom.get(CHAT_ROOMS, roomId);
		if (curChatRoom == null) {
			return new ArrayList<>();
		}
		return curChatRoom.getChatMessages();
	}

	public ChatRoom getChatRoom(String roomId) {
		return opsHashChatRoom.get(CHAT_ROOMS, roomId);
	}

	public void updateChatRoom(ChatRoom chatRoom, ChatMessage messageContent) {
		chatRoom.addChatMessage(messageContent);
		opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
	}

}
