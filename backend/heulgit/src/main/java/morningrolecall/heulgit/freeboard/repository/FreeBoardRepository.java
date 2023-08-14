package morningrolecall.heulgit.freeboard.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.lettuce.core.dynamic.annotation.Param;
import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.user.domain.User;

public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long> {
	Slice<FreeBoard> findSliceBy(Pageable pageable);

	@Query("SELECT f FROM FreeBoard f ORDER BY SIZE(f.likedUsers) DESC, f.updatedDate DESC")
	Page<FreeBoard> findSortedByLikesFreeBoards(Pageable pageable);

	@Query("SELECT f FROM FreeBoard f ORDER BY SIZE(f.freeBoardComments) DESC, f.updatedDate DESC")
	Page<FreeBoard> findSortedByCommentsFreeBoards(Pageable pageable);

	Optional<FreeBoard> findFreeBoardByFreeBoardId(Long freeBoardId);

	@Query("SELECT f FROM FreeBoard f LEFT JOIN FETCH f.freeBoardComments WHERE f.freeBoardId = :freeBoardId")
	Optional<FreeBoard> findFreeBoardAndFreeBoardCommentsByFreeBoardId(Long freeBoardId);

	Slice<FreeBoard> findSliceByTitleContains(String title, Pageable pageable);

	@Query("SELECT f FROM FreeBoard f WHERE f.title like %:title% ORDER BY SIZE(f.likedUsers) DESC, f.updatedDate DESC")
	Page<FreeBoard> findContainsTitleSortedByLikesFreeBoards(@Param("title") String title, Pageable pageable);

	@Query("SELECT f FROM FreeBoard f WHERE f.title like %:title% ORDER BY SIZE(f.freeBoardComments) DESC, f.updatedDate DESC")
	Page<FreeBoard> findContainsTitleSortedByCommentsFreeBoards(@Param("title") String title, Pageable pageable);

	Slice<FreeBoard> findSliceByUser_GithubId(String id, Pageable pageable);

	@Query("SELECT f FROM FreeBoard f WHERE f.user.githubId = :id ORDER BY SIZE(f.likedUsers) DESC, f.updatedDate DESC")
	Page<FreeBoard> findByUserNameSortedByLikesFreeBoards(@Param("id") String id, Pageable pageable);

	@Query("SELECT f FROM FreeBoard f WHERE f.user.githubId = :id ORDER BY SIZE(f.freeBoardComments) DESC, f.updatedDate DESC")
	Page<FreeBoard> findByUserNameSortedByCommentsFreeBoards(@Param("id") String id, Pageable pageable);

	// 사용자가 좋아요한 프리보드 목록을 순서대로 가져옴
	Slice<FreeBoard> findByLikedUsersContains(User user, Pageable pageable);
	// 단일 게시물 좋아요한 사용자 목록
	@Query("SELECT u FROM FreeBoard f JOIN f.likedUsers u WHERE f.freeBoardId = :freeBoardId")
	Slice<User> findLikedUsersByFreeBoardId(Long freeBoardId,  Pageable pageable);

}
