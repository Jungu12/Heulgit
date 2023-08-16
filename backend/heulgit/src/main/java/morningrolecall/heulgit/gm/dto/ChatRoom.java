package morningrolecall.heulgit.gm.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoom implements Serializable {

	private static final long serialVersionUID = 211211211211L;
	private String roomId;
	private String user1;
	private String user2;
	private List<ChatMessage> chatMessages;

	// 채팅 메시지를 추가하는 메서드
	public void addChatMessage(ChatMessage message) {
		if (chatMessages == null) {
			chatMessages = new ArrayList<>();
		}
		chatMessages.add(message);
	}

	// 채팅 메시지 목록을 조회하는 메서드
	public List<ChatMessage> getChatMessages() {
		if (chatMessages == null) {
			chatMessages = new ArrayList<>();
		}
		return chatMessages;
	}

	public void markAllMessagesAsRead(String githubId) {
		if (chatMessages != null) {
			for (int i = chatMessages.size() - 1; i >= 0; i--) {
				ChatMessage curChatMessage = chatMessages.get(i);

				//내가 보낸 메세지인 경우 continue
				if (curChatMessage.getSender().equals(githubId)) {
					continue;
				}

				//신규 메세지들의 읽음처리를 완료한 경우
				if (curChatMessage.isRead()) {
					return;
				}

				curChatMessage.updateRead();
			}
		}
		return;
	}
}