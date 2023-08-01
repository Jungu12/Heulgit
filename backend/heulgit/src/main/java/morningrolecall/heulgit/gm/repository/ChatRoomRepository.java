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
	private static final String CHAT_LOGS = "chatLog";
	//Redis
	private final RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, ChatRoom> opsHashChatRoom;
	private HashOperations<String, String, ChatMessage> opsHashChatLogs;
	// 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@PostConstruct
	private void init() {
		opsHashChatLogs = redisTemplate.opsForHash();
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
	 */
	public ChatRoom createChatRoom(String user1, String user2) {
		ChatRoom chatRoom = ChatRoom.builder()
			.roomId(user1 + user2)
			.user1(user1)
			.user2(user2)
			.build();
		logger.debug("createChatRoom(), roomId = {}, chatRoomUser1 = {}, chatRoomUser2 = {} ", chatRoom.getRoomId(),
			chatRoom.getUser1(), chatRoom.getUser2());
		opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
		return chatRoom;
	}

	/**
	 * Todo : contains 말고 equals로 수정 필요....
	 */
	public List<ChatMessage> getChatLogs(String roomId) {
		List<ChatMessage> ChatLogs = opsHashChatLogs.values(CHAT_LOGS);
		List<ChatMessage> myChatLogs = new ArrayList<>();
		for (ChatMessage chatLog : ChatLogs) {
			logger.info("Redis Server's Data : getChatLogs(), roomdId = {}, message = {}", chatLog.getRoomId(),
				chatLog.getMessage());
			if (chatLog.getRoomId().contains(roomId)) {
				logger.info("getChatLogs(), roomdId = {}, message = {}", chatLog.getRoomId(), chatLog.getMessage());
				myChatLogs.add(chatLog);
			}
		}
		return myChatLogs;
	}

	public void storeMessageInHash(String roomId, ChatMessage message) {
		String timestamp = String.valueOf(System.currentTimeMillis());
		String key = roomId + ":" + timestamp;
		redisTemplate.opsForHash().put(CHAT_LOGS, key, message);
	}

}
