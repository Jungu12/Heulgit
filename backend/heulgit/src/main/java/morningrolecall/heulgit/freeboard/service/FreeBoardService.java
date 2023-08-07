package morningrolecall.heulgit.freeboard.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.NoResultException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;
import morningrolecall.heulgit.freeboard.domain.FreeBoardImage;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardDetailResponse;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardRequest;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardUpdateRequest;
import morningrolecall.heulgit.freeboard.repository.FreeBoardCommentRepository;
import morningrolecall.heulgit.freeboard.repository.FreeBoardImageRepository;
import morningrolecall.heulgit.freeboard.repository.FreeBoardRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class FreeBoardService {
	private final int SIZE = 20;
	private final FreeBoardRepository freeBoardRepository;
	private final FreeBoardCommentRepository freeBoardCommentRepository;
	private final FreeBoardImageRepository freeBoardImageRepository;
	private final UserRepository userRepository;

	/**
	 * 자유게시판 목록 조회
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 * */
	public Slice<FreeBoardDetailResponse> findFreeBoards(String sort, int pages) {
		if (sort.equals("likes")) {
			Slice<FreeBoard> freeBoards = freeBoardRepository.findSortedByLikesFreeBoards(
				PageRequest.of(pages - 1, SIZE));
			return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		}

		if (sort.equals("comments")) {
			Slice<FreeBoard> freeBoards = freeBoardRepository.findSortedByCommentsFreeBoards(
				PageRequest.of(pages - 1, SIZE));
			return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		}

		if (sort.equals("views")) {
			Slice<FreeBoard> freeBoards = freeBoardRepository.findSliceBy(
				PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
			return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		}

		Slice<FreeBoard> freeBoards = freeBoardRepository.findSliceBy(
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
	}

	/**
	 * 단일 FreeBoard 조회
	 * 1. FreeBoard 조회
	 * 2. 조회 수 증가
	 * 3. 댓글 조회
	 * 4. 저장 및 반환
	 * */
	public FreeBoardDetailResponse findFreeBoard(Long freeBoardId) {
		FreeBoard freeBoard = freeBoardRepository.findFreeBoardAndFreeBoardCommentsByFreeBoardId(freeBoardId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		freeBoard.increaseView();

		List<FreeBoardComment> freeBoardComments = freeBoardCommentRepository.findFreeBoardCommentsByFreeBoardOrderByUpdatedDateDesc(
			freeBoard);
		freeBoard.setFreeBoardComments(freeBoardComments);

		freeBoardRepository.save(freeBoard);

		return FreeBoardDetailResponse.builder()
			.freeBoardId(freeBoardId)
			.user(freeBoard.getUser())
			.title(freeBoard.getTitle())
			.content(freeBoard.getContent())
			.updatedDate(freeBoard.getUpdatedDate())
			.view(freeBoard.getView())
			.freeBoardImages(freeBoard.getFreeBoardImages())
			.likedUsers(freeBoard.getLikedUsers())
			.freeBoardComments(freeBoardComments)
			.build();
	}

	/**
	 * FreeBoard 게시물 등록
	 * 1. 사용자 조회
	 * 2. 게시물 생성 및 저장
	 * 3. 이미지 파일 리스트 생성 및 게시물 연결, 저장
	 * */
	@Transactional
	public void addFreeBoard(String githubId, FreeBoardRequest freeBoardRequest) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 등록되어 있지 않습니다."));
		FreeBoard freeBoard = FreeBoard.builder()
			.user(user)
			.title(freeBoardRequest.getTitle())
			.content(freeBoardRequest.getContent())
			.updatedDate(LocalDateTime.now())
			.build();

		freeBoardRepository.save(freeBoard);

		List<FreeBoardImage> freeBoardImages = makeFreeBoardImages(freeBoard, freeBoardRequest.getFileUri());
		freeBoardImageRepository.saveAll(freeBoardImages);

		freeBoard.addAllImage(freeBoardImages);
		freeBoardRepository.save(freeBoard);
	}

	/**
	 * FreeBoard 게시물 수정
	 * 1. 게시물 ID로 게시물 조회
	 * 2. 작성자와 현재 사용자 비교
	 * 3. 게시물 수정 (작성자 제외 수정 가능)
	 * 4. 기존 이미지 파일은 모두 제거, 새로운 이미지 파일 저장
	 * */
	@Transactional
	public void updateFreeBoard(String githubId, FreeBoardUpdateRequest freeBoardUpdateRequest) {
		FreeBoard freeBoard = freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardUpdateRequest.getFreeBoardId())
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		if (!githubId.equals(freeBoard.getUser().getGithubId())) {
			System.out.println("작성자가 아님!!!");
			return;
			// throw new IllegalAccessException("작성자와 사용자가 일치하지 않습니다.");
		}

		freeBoard.setTitle(freeBoardUpdateRequest.getTitle());
		freeBoard.setContent(freeBoardUpdateRequest.getContent());
		freeBoard.setUpdatedDate(LocalDateTime.now());

		List<FreeBoardImage> freeBoardImages = makeFreeBoardImages(freeBoard, freeBoardUpdateRequest.getFileUri());

		freeBoardImageRepository.deleteAllByFreeBoard(freeBoard);
		freeBoardImageRepository.saveAll(freeBoardImages);

		freeBoard.removeAllImage();
		freeBoard.addAllImage(freeBoardImages);

		freeBoardRepository.save(freeBoard);
	}

	/**
	 * 유레카 게시물 삭제
	 * 1. 게시물 ID로 게시물 조회
	 * 2. 작성자와 현재 사용자 비교
	 * 3. 게시물 삭제 (EurekaImage도 삭제되어야 함)
	 * */
	@Transactional
	public void removeFreeBoard(String githubId, Long freeBoardId) {
		FreeBoard freeBoard = freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardId)
			.orElseThrow(() -> new NoResultException("해당 게시물을 찾을 수 없습니다."));

		if (!githubId.equals(freeBoard.getUser().getGithubId())) {
			System.out.println("작성자가 아님!!!");
			return;
			// throw new IllegalAccessException("작성자와 사용자가 일치하지 않습니다.");
		}

		freeBoardRepository.delete(freeBoard);
	}

	/**
	 * Slice<FreeBoard>를 List<FreeboardDetailResponse>로 변환
	 * */
	private List<FreeBoardDetailResponse> toResponse(Slice<FreeBoard> freeBoards) {
		return freeBoards.getContent().stream().map(freeBoard -> FreeBoardDetailResponse.builder()
			.freeBoardId(freeBoard.getFreeBoardId())
			.user(freeBoard.getUser())
			.title(freeBoard.getTitle())
			.content(freeBoard.getContent())
			.updatedDate(freeBoard.getUpdatedDate())
			.view(freeBoard.getView())
			.freeBoardImages(new ArrayList<>())
			.likedUsers(freeBoard.getLikedUsers())
			.freeBoardComments(freeBoard.getFreeBoardComments())
			.build()).collect(Collectors.toList());
	}

	/**
	 * FreeBoardImages를 List에 담아 반환
	 * 1. 이미지 파일 정보를 FreeBoardImage로 변환
	 * 2. List 저장 및 반환
	 * */
	private List<FreeBoardImage> makeFreeBoardImages(FreeBoard freeBoard, List<String> freeBoardFileUris) {
		return freeBoardFileUris.stream().map(freeBoardFileUri -> FreeBoardImage.builder()
			.fileUri(freeBoardFileUri)
			.freeBoard(freeBoard)
			.build()
		).collect(Collectors.toList());
	}
}
