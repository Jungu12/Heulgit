package morningrolecall.heulgit.notification.repository;

import java.util.List;
import java.util.Map;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EmitterRepository {
	SseEmitter save(String emitterId, SseEmitter sseEmitter); // Emitter 저장

	void saveEventCache(String eventCacheId, Object event); //이벤트 저장

	Map<String, SseEmitter> findAllEmitterStartWithByEmail(String githubId); //해당 회원과  관련된 모든 emitter 를 찾는다

	Map<String, Object> findAllEventCacheStartWithByEmail(String githubId); //해당 회원과관련된 모든 이벤트를 찾는다

	void deleteById(String id); //Emitter를 지운다

	void deleteAllEmitterStartWithId(String githubId); //해당 회원과 관련된 모든 Emitter를 지운다

	void deleteAllEventCacheStartWithId(String githubId); //해당 회원과 관련된 모든 이벤트를 지운다


}


