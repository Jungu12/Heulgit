package morningrolecall.heulgit.gm.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.gm.dto.ChatMessage;

@Service
@RequiredArgsConstructor
public class RedisPublisher {
	private final RedisTemplate<String, Object> redisTemplate;

	public void publish(ChannelTopic topic, ChatMessage message) {
		redisTemplate.convertAndSend(topic.getTopic(), message);
	}
}
