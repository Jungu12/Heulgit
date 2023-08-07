package morningrolecall.heulgit.gm.util;

import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisInOutManager {

	private final RedisTemplate<String, String> redisTemplate;

	// 사용자를 특정 topic에 구독자로 등록
	public void addUserToTopic(String topic, String userId) {
		redisTemplate.opsForHash().put(topic, userId, "subscribed");
	}

	// 사용자가 특정 topic에 구독자인지 확인
	public boolean isUserSubscribedToTopic(String topic, String userId) {
		return redisTemplate.opsForHash().hasKey(topic, userId);
	}

	// 사용자를 특정 topic의 구독자에서 제거
	public void removeUserFromTopic(String topic, String userId) {
		redisTemplate.opsForHash().delete(topic, userId);
	}

	// 특정 topic의 모든 구독자 조회
	public Map<Object, Object> getAllSubscribersForTopic(String topic) {
		return redisTemplate.opsForHash().entries(topic);
	}
}