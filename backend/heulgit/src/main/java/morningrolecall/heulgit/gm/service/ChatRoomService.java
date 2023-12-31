package morningrolecall.heulgit.gm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.GmException;
import morningrolecall.heulgit.gm.dto.ChatMessage;
import morningrolecall.heulgit.gm.dto.ChatRoom;
import morningrolecall.heulgit.gm.repository.ChatRoomRepository;
import morningrolecall.heulgit.gm.util.RedisInOutManager;

@RequiredArgsConstructor
@Service
public class ChatRoomService {
	private final ChatRoomRepository chatRoomRepository;
	// 채팅방(topic)에 발행되는 메시지를 처리할 Listner
	private final RedisMessageListenerContainer redisMessageListener;
	// 구독 처리 서비스
	private final RedisSubscriber redisSubscriber;
	private final RedisInOutManager redisSubscriberManager;
	private Map<String, ChannelTopic> topics;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@PostConstruct
	private void init() {
		topics = new HashMap<>();
	}

	// 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
	public void enterChatRoom(String roomId, String githubId) {
		ChannelTopic topic = topics.get(roomId);

		if (topic == null) {
			topic = new ChannelTopic(roomId);
		}

		redisMessageListener.addMessageListener(redisSubscriber, topic);
		topics.put(roomId, topic);

		userJoinedChatRoom(roomId, githubId);
		logger.debug("enterChatRoom()에서 redis에 토픽 저장");

		//모든 메세지 읽음 처리
		ChatRoom chatRoom = chatRoomRepository.getChatRoom(roomId);
		String[] users = chatRoom.getRoomId().split(":");
		for (String user : users) {
			if (user.equals(githubId)) {
				continue;
			}

			logger.debug("enterChatRoom()에서 메세지 읽음 시도");
			chatRoom.markAllMessagesAsRead(githubId);
			chatRoomRepository.updateChatRoom(chatRoom);
			logger.debug("enterChatRoom()에서 메세지 읽음 처리 마침");
			break;
		}

	}

	// roomId로 해당 채팅방의 Topic을 반환한다.
	public ChannelTopic getTopic(String roomId) {
		return topics.get(roomId);
	}

	// 사용자와 타 유저의 채팅방이 있는지 없는지 확인하고 없다면 생성한다.
	public ChatRoom addChatRoom(String user1, String user2) {
		String normalizedUser1 = user1.toLowerCase();
		String normalizedUser2 = user2.toLowerCase();

		int compareResult = normalizedUser1.compareToIgnoreCase(normalizedUser2);

		String sortedUser1 = (compareResult <= 0) ? user1 : user2;
		String sortedUser2 = (compareResult <= 0) ? user2 : user1;

		return chatRoomRepository.createChatRoom(sortedUser1, sortedUser2);
	}

	// 메세지를 읽음 처리와 동시에 저장한다.
	public void saveMessage(ChatMessage message) {
		logger.debug("roomId = {}", message.getRoomId());
		String[] users = message.getRoomId().split(":");
		for (String user : users) {
			//메세지 송신자 확인
			logger.debug("user = {}, sender = {}", user, message.getSender());
			if (user.equals(message.getSender())) {
				continue;
			}

			logger.debug("채팅방에 상대방 접속 여부 확인, message.getRoomId = {}, user = {}", message.getRoomId(), user);

			//현재 채팅방에 접속해 있는지 확인
			if (isUserSubscribedToChatRoom(message.getRoomId(), user)) {
				logger.debug("채팅방에 상대방 접속 여부 확인, message.getRoomId = {}, user = {}", message.getRoomId(), user);
				continue;
			}

			//메세지 읽음 처리
			message.updateRead();
		}

		ChatRoom curChatRoom = chatRoomRepository.getChatRoom(message.getRoomId());
		for (ChatMessage chatMessage : curChatRoom.getChatMessages()) {
			logger.debug("메세지 = {}, 메세지 읽음 상태 = {}", chatMessage.getMessage(), chatMessage.isRead());
		}
		chatRoomRepository.updateChatRoomAndNewMessage(curChatRoom, message);
	}

	//메세지를 반환한다.
	public List<ChatMessage> findMessage(String roomId) {
		List<ChatMessage> ChatMessages = chatRoomRepository.getChatLogs(roomId);

		if (ChatMessages == null) {
			throw new GmException(ExceptionCode.CHAT_MESSAGE_NOT_EXIST);
		}

		return ChatMessages;
	}

	public List<ChatRoom> findChatRoomList(String githubId) {
		return chatRoomRepository.findMyChatRooms(githubId);
	}

	// 사용자가 특정 topic(채팅방)에 들어왔을 때 구독자로 등록한다.
	public void userJoinedChatRoom(String topic, String userId) {
		redisSubscriberManager.addUserToTopic(topic, userId);
	}

	// 사용자가 특정 topic(채팅방)에서 나갔을 때 구독자에서 제거한다.
	public void userLeftChatRoom(String topic, String userId) {
		redisSubscriberManager.removeUserFromTopic(topic, userId);
	}

	// 사용자가 특정 topic(채팅방)에 구독 중인지 확인한다.
	public boolean isUserSubscribedToChatRoom(String topic, String userId) {
		return redisSubscriberManager.isUserSubscribedToTopic(topic, userId);
	}
}
