package morningrolecall.heulgit.gm.dto;

import java.io.Serializable;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChatRoom implements Serializable {

	private static final long serialVersionUID = 211211211211L;
	private String roomId;
	private String user1;
	private String user2;
	private List<ChatMessage> ChatMessages;

}