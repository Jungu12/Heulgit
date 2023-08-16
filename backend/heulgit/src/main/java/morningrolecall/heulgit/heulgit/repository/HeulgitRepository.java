package morningrolecall.heulgit.heulgit.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.StringJoiner;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import io.lettuce.core.dynamic.annotation.Param;
import morningrolecall.heulgit.heulgit.domain.Heulgit;
import morningrolecall.heulgit.user.domain.User;

public interface HeulgitRepository extends JpaRepository<Heulgit, Long>, JpaSpecificationExecutor<Heulgit> {


	Slice<Heulgit> findSliceBy(Pageable pageable);



	@Query("SELECT h FROM Heulgit h ORDER BY SIZE(h.heulgitComments) DESC, h.updatedDate DESC")
	Page<Heulgit> findSortedByCommentsHeulgits(Pageable pageable);

	// @Query("SELECT h FROM Heulgit h ORDER BY ")

	Optional<Heulgit> findHeulgitByHeulgitId(Long heulgitId);

	@Query("SELECT h FROM Heulgit h LEFT JOIN FETCH h.heulgitComments WHERE h.heulgitId = :heulgitId")
	Optional<Heulgit> findHeulgitAndHeulgitCommentsByHeulgitId(Long heulgitId);

	// 1. 아무것도 정렬 안했을 때

	// 2.좋아요 순
	@Query("SELECT h FROM Heulgit  h ORDER BY SIZE(h.likedUsers) DESC, h.updatedDate DESC")
	Page<Heulgit> findSortedByLikesHeulgits(Pageable pageable);
	// 3. 스타 순
	@Query("SELECT h FROM Heulgit  h ORDER BY h.star DESC, h.updatedDate DESC")
	Page<Heulgit> findSortedByStarsHeulgits(Pageable pageable);
	// 4. 언어 검색
	@Query("SELECT h FROM Heulgit h WHERE h.language  = :language ORDER BY  h.updatedDate DESC")
	Page<Heulgit> findSearchByLanguageHeulgits(@Param("language") String language,Pageable pageable);

	// 5. 날짜 검색
	@Query("SELECT h FROM Heulgit h WHERE h.updatedDate BETWEEN :startDate AND :endDate")
	Page<Heulgit> findSearchByDateHeulgits(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);
	// 6. 좋아요, 언어 검색
	@Query("SELECT h FROM Heulgit h  WHERE h.language  = :language ORDER BY SIZE(h.likedUsers) DESC, h.updatedDate DESC")
	Page<Heulgit> findSortedByLikesSearchByLanguageHeulgits(@Param("language") String language,Pageable pageable);
	// 7: 좋아요, 날짜 검색
	@Query("SELECT h FROM Heulgit h WHERE h.updatedDate BETWEEN :startDate AND :endDate ORDER BY SIZE(h.likedUsers) DESC")
	Page<Heulgit> findSortedByLikesSearchByDate(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);
	// 8: 스타 순, 언어 검색
	@Query("SELECT h FROM Heulgit h  WHERE h.language  = :language ORDER BY h.star DESC ,h.updatedDate DESC")
	Page<Heulgit> findSortedByStarsSearchByLanguageHeulgits(@Param("language") String language,Pageable pageable);
	// 9: 스타 순, 날짜 검색
	@Query("SELECT h FROM Heulgit h WHERE h.updatedDate BETWEEN :startDate AND :endDate ORDER BY h.star DESC")
	Page<Heulgit> findSortedByStarsSearchByDateHeulgits(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);
	// 10: 언어, 날짜
	@Query("SELECT h FROM Heulgit h  WHERE h.language  = :language AND h.updatedDate BETWEEN :startDate AND :endDate")
	Page<Heulgit> findSearchByLanguageAndDateHeulgits(@Param("language") String language,@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);
	// 11: 좋아요 순, 언어 검색, 날짜 검색
	@Query("SELECT h FROM Heulgit h WHERE h.language  = :language AND h.updatedDate BETWEEN :startDate AND :endDate ORDER BY SIZE(h.likedUsers) DESC")
	Page<Heulgit> findSortedByLikesSearchByLanguageAndDateHeulgits(@Param("language") String language,@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);
	// 12: 스타 순, 언어 검색, 날짜 검색
	@Query("SELECT h FROM Heulgit h WHERE h.language  = :language AND h.updatedDate BETWEEN :startDate AND :endDate ORDER BY h.star DESC")
	Page<Heulgit> findSortedByStarsSearchByLanguageAndDateHeulgits(@Param("language") String language,@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);
	// 13: 랜덤으로 뽑기
	@Query("SELECT h from Heulgit  h ORDER BY RAND()")
	Page<Heulgit> findRandomHeulgits( Pageable pageable);

	// 사용자 github_ID로 검색
	Slice<Heulgit> findSliceByGithubId(String id, Pageable pageable);
	// 제목으로 검색
	Slice<Heulgit> findSliceByHeulgitNameContains(String title, Pageable pageable);

	//사용자가 좋아요한 흘깃 목록을 흘깃 순서대로 가져옴...
	Slice<Heulgit> findByLikedUsersContains(User user, Pageable pageable);
	// 단일 게시물 좋아요한 사용자 목록
	@Query("SELECT u FROM Heulgit h JOIN h.likedUsers u WHERE h.heulgitId = :heulgitId")
	Slice<User> findLikedUsersByHeulgitId(Long heulgitId, Pageable pageable);

	Optional<Heulgit> findByGithubIdAndHeulgitName(String githubId, String heulgitName);

	List<Heulgit> findHeulgitsByGithubId(String githubId);

	@Query(value = "SELECT h FROM Heulgit h ORDER BY RAND()")
	List<Heulgit> findRandomHeulgitsLimitedTo1000();
}
