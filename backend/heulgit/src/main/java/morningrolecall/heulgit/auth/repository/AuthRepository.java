package morningrolecall.heulgit.auth.repository;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AuthRepository {

	private final RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, String> opsHashJwt;

	@PostConstruct
	private void init() {
		opsHashJwt = redisTemplate.opsForHash();
	}

	// public String findJwt(String userId, String token) {
	// 	opsHashJwt.put("JWT", userId, token);
	// }

	public int deleteJwt(String userId) {
		return Long.valueOf(opsHashJwt.delete("JWT", userId)).intValue();
	}
}
