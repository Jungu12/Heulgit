package morningrolecall.heulgit.gm.service;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MessageService {
	// 채팅방(topic)에 발행되는 메시지를 처리할 Listner
	private final RedisMessageListenerContainer redisMessageListener;
	// 구독 처리 서비스
	private final RedisSubscriber redisSubscriber;
	private Map<String, ChannelTopic> topics;

	@PostConstruct
	private void init() {
		topics = new HashMap<>();
	}

	/**
	 * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
	 */
	public void enterChatRoom(String roomId) {
		ChannelTopic topic = topics.get(roomId);
		if (topic == null)
			topic = new ChannelTopic(roomId);
		redisMessageListener.addMessageListener(redisSubscriber, topic);
		topics.put(roomId, topic);
	}

	public ChannelTopic getTopic(String roomId) {
		return topics.get(roomId);
	}
}
