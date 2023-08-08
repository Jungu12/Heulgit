package morningrolecall.heulgit.freeboard.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.freeboard.domain.FreeBoardImage;

public interface FreeBoardImageRepository extends JpaRepository<FreeBoardImage, FreeBoard> {
	Optional<FreeBoardImage> findFreeBoardImageByFreeBoard(FreeBoard freeBoard);

	void deleteAllByFreeBoard(FreeBoard freeBoard);
}
