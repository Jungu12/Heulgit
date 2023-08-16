package morningrolecall.heulgit.auth.util;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRedisManager {

	private final RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, String> opsHashJwt;

	@PostConstruct
	private void init() {

		opsHashJwt = redisTemplate.opsForHash();
	}

	public void storeJwt(String userId, String token) {
		opsHashJwt.put("JWT", userId, token);
	}

	public boolean isJwtExists(String userId) {
		return opsHashJwt.hasKey("JWT", userId);
	}

	public int deleteJwt(String userId) {
		return Long.valueOf(opsHashJwt.delete("JWT", userId)).intValue();
	}
}
