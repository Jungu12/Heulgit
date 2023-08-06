package morningrolecall.heulgit.gm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.gm.dto.ChatMessage;
import morningrolecall.heulgit.gm.dto.ChatRoom;
import morningrolecall.heulgit.gm.repository.ChatRoomRepository;
import morningrolecall.heulgit.gm.util.RedisSubscriberManager;

@RequiredArgsConstructor
@Service
public class ChatRoomService {
	private final ChatRoomRepository chatRoomRepository;
	// 채팅방(topic)에 발행되는 메시지를 처리할 Listner
	private final RedisMessageListenerContainer redisMessageListener;
	// 구독 처리 서비스
	private final RedisSubscriber redisSubscriber;
	private final RedisSubscriberManager redisSubscriberManager;
	private Map<String, ChannelTopic> topics;

	@PostConstruct
	private void init() {
		topics = new HashMap<>();
	}

	// 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
	public void enterChatRoom(String roomId) {
		ChannelTopic topic = topics.get(roomId);
		if (topic == null) {
			topic = new ChannelTopic(roomId);
		}

		redisMessageListener.addMessageListener(redisSubscriber, topic);
		topics.put(roomId, topic);
	}

	// roomId로 해당 채팅방의 Topic을 반환한다.
	public ChannelTopic getTopic(String roomId) {
		return topics.get(roomId);
	}

	// 채팅방을 생성한다.
	public ChatRoom addChatRoom(String user1, String user2) {
		return chatRoomRepository.createChatRoom(user1, user2);
	}

	// 메세지를 저장한다.
	public void saveMessage(ChatMessage message) {
		ChatRoom curChatRoom = chatRoomRepository.getChatRoom(message.getRoomId());
		chatRoomRepository.updateChatRoom(curChatRoom, message);
	}

	//메세지를 반환한다.
	public List<ChatMessage> findMessage(String roomId) {
		List<ChatMessage> ChatMessages = chatRoomRepository.getChatLogs(roomId);

		if (ChatMessages == null) {
			throw new RuntimeException("채팅방에 메세지가 없습니다.");
		}

		return ChatMessages;
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

	// 사용자와 타 유저의 채팅방이 있는지 없는지 확인하고 없다면 생성한다.
	public ChatRoom findAndAddChatRoom(String user1, String user2) {
		return chatRoomRepository.createChatRoom(user1, user2);
	}
}
