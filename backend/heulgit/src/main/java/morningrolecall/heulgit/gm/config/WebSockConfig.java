package morningrolecall.heulgit.gm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSocketMessageBroker
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.enableSimpleBroker("/sub");
		/* Destination의 Prefix를 지정
		 * /pub/message로 온 메세지는 /message를 처리하는 controller에서
		 * @messagemapping을 통해 처리하면 된다.
		 */
		registry.setApplicationDestinationPrefixes("/pub");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		//sockJs 클라이언트가 WebSocket hand-shake를 하기 위한 endpoint를 지정함
		registry.addEndpoint("/gm").setAllowedOriginPatterns("*").withSockJS();
	}
}