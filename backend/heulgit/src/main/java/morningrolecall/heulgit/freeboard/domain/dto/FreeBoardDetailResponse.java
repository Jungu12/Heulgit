package morningrolecall.heulgit.freeboard.domain.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;
import morningrolecall.heulgit.freeboard.domain.FreeBoardImage;
import morningrolecall.heulgit.user.domain.User;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FreeBoardDetailResponse {
	private Long freeBoardId;
	private User user;
	private String title;
	private String content;
	private LocalDateTime updatedDate;
	private int view;
	private List<FreeBoardImage> freeBoardImages;
	private Set<User> likedUsers;
	private List<FreeBoardComment> freeBoardComments;
}
