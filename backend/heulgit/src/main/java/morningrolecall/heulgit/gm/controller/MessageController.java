package morningrolecall.heulgit.gm.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.gm.dto.ChatMessage;
import morningrolecall.heulgit.gm.service.MessageService;
import morningrolecall.heulgit.gm.service.RedisPublisher;

@RequiredArgsConstructor
@Controller
public class MessageController {

	private final RedisPublisher redisPublisher;
	private final MessageService messageService;

	// websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
	@MessageMapping("/chat/message")
	public void message(ChatMessage message) {
		messageService.enterChatRoom(message.getRoomId());
		// Websocket에 발행된 메시지를 redis로 발행한다(publish)
		redisPublisher.publish(messageService.getTopic(message.getRoomId()), message);
	}
}