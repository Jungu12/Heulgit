package morningrolecall.heulgit.gm.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import morningrolecall.heulgit.gm.dto.ChatMessage;
import morningrolecall.heulgit.gm.repository.ChatRoomRepository;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {

	private final ChatRoomRepository chatRoomRepository;
	private final RedisTemplate redisTemplate;
	private final ObjectMapper objectMapper;
	private final SimpMessageSendingOperations messagingTemplate;

	private static final String CHAT_LOGS = "chatLog";

	private final Logger logger = LoggerFactory.getLogger(getClass());

	// Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리한다.
	@Override
	public void onMessage(Message message, byte[] pattern) {
		try {
			String channel = new String(message.getChannel());
			ChatMessage messageContent = objectMapper.readValue(message.getBody(), ChatMessage.class);
			// redis에서 발행된 데이터를 받아 deserialize
			String publishMessage = (String)redisTemplate.getStringSerializer().deserialize(message.getBody());
			ChatMessage roomMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
			// Websocket 구독자에게 채팅 메시지 Send
			messagingTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getRoomId(), roomMessage);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
}