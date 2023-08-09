package morningrolecall.heulgit.freeboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.eureka.domain.EurekaImage;
import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.freeboard.domain.FreeBoardImage;

public interface FreeBoardImageRepository extends JpaRepository<FreeBoardImage, FreeBoard> {
	List<FreeBoardImage> findFreeBoardImageByFreeBoard(FreeBoard freeBoard);

	void deleteAllByFreeBoard(FreeBoard freeBoard);
}
