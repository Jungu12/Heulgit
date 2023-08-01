package morningrolecall.heulgit.gm.dto;

import java.io.Serializable;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatMessage implements Serializable {
	private static final long serialVersionUID = 211211211211L;
	private String roomId; // 방번호
	private String sender; // 메시지 보낸사람
	private String message; // 메시지
	private String updated_time; // 전송 시간
	private boolean isRead; // 채팅 확인 여부

}