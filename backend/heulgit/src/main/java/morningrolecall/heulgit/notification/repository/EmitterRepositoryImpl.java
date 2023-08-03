package morningrolecall.heulgit.notification.repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.NoArgsConstructor;

@Repository
@NoArgsConstructor
public class EmitterRepositoryImpl implements EmitterRepository{
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
	private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

	@Override
	public SseEmitter save(String emitterId, SseEmitter sseEmitter) {
		emitters.put(emitterId, sseEmitter);
		return sseEmitter;
	}

	@Override
	public void saveEventCache(String eventCacheId, Object event) {
		eventCache.put(eventCacheId, event);

	}

	@Override
	public Map<String, SseEmitter> findAllEmitterStartWithByGithubId(String githubId) {
		return emitters.entrySet().stream()
			.filter(entry -> entry.getKey().startsWith(githubId))
			.collect(Collectors.toMap(Map.Entry::getKey,Map.Entry::getValue));
	}

	@Override
	public Map<String, Object> findAllEventCacheStartWithByGithubId(String githubId) {
		return emitters.entrySet().stream()
			.filter(entry -> entry.getKey().startsWith(githubId))
			.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
	}

	@Override
	public void deleteById(String id) {
		emitters.remove(id);
	}

	@Override
	public void deleteAllEmitterStartWithGithubId(String githubId) {
		emitters.forEach((key, emitter) -> {
			if (key.startsWith(githubId)){
				emitters.remove(key);
			}
		});
	}

	@Override
	public void deleteAllEventCacheStartWithGithubId(String githubId) {
		emitters.forEach((key, emitter) -> {
			if (key.startsWith(githubId)){
				emitters.remove(key);
			}
		});
	}
}
