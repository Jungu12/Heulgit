package morningrolecall.heulgit.gm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.gm.dto.ChatMessage;
import morningrolecall.heulgit.gm.service.ChatRoomService;
import morningrolecall.heulgit.gm.service.RedisPublisher;

@RequiredArgsConstructor
@Controller
public class MessageController {

	private final RedisPublisher redisPublisher;
	private final ChatRoomService chatRoomService;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	// websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
	@MessageMapping("/chat/message")
	public void message(ChatMessage message) {
		try {
			chatRoomService.enterChatRoom(message.getRoomId(), message.getSender());
			logger.debug("read = {}", message.isRead());
			// Websocket에 발행된 메시지를 redis로 발행한다(publish)
			redisPublisher.publish(chatRoomService.getTopic(message.getRoomId()), message);
		} catch (Exception e) {
			logger.error("메세지 발행 실패", e);
		} finally {
			logger.debug("finally");
			chatRoomService.saveMessage(message);
		}
	}
}