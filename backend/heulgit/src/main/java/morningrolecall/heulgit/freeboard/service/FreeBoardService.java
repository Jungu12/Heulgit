package morningrolecall.heulgit.freeboard.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.FreeBoardException;
import morningrolecall.heulgit.freeboard.domain.FreeBoard;
import morningrolecall.heulgit.freeboard.domain.FreeBoardComment;
import morningrolecall.heulgit.freeboard.domain.FreeBoardImage;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardDetailResponse;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardLikeUserResponse;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardRequest;
import morningrolecall.heulgit.freeboard.domain.dto.FreeBoardUpdateRequest;
import morningrolecall.heulgit.freeboard.repository.FreeBoardCommentRepository;
import morningrolecall.heulgit.freeboard.repository.FreeBoardImageRepository;
import morningrolecall.heulgit.freeboard.repository.FreeBoardRepository;
import morningrolecall.heulgit.image.Service.ImageService;
import morningrolecall.heulgit.relation.repository.RelationRepository;
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
	private final ImageService imageService;
	private final RelationRepository relationRepository;

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
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.POST_NOT_FOUND));

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
	public void addFreeBoard(String githubId, FreeBoardRequest freeBoardRequest, List<MultipartFile> multipartFiles) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.USER_NOT_FOUND));

		FreeBoard freeBoard = FreeBoard.builder()
			.user(user)
			.title(freeBoardRequest.getTitle())
			.content(freeBoardRequest.getContent())
			.updatedDate(LocalDateTime.now())
			.build();

		freeBoardRepository.save(freeBoard);
		// 이미지 S3에 업로드
		List<String> imageUrls = imageService.uploadFile(githubId, "freeboard", multipartFiles);
		List<FreeBoardImage> freeBoardImages = makeFreeBoardImages(freeBoard, imageUrls);
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
	public void updateFreeBoard(Long freeBoardId, String githubId, FreeBoardUpdateRequest freeBoardUpdateRequest,
		List<MultipartFile> multipartFiles) {
		FreeBoard freeBoard = freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.POST_NOT_FOUND));

		if (!githubId.equals(freeBoard.getUser().getGithubId())) {
			throw new FreeBoardException(ExceptionCode.WRITER_USER_MISMATCH);
		}

		freeBoard.setTitle(freeBoardUpdateRequest.getTitle());
		freeBoard.setContent(freeBoardUpdateRequest.getContent());
		freeBoard.setUpdatedDate(LocalDateTime.now());

		List<FreeBoardImage> deleteFreeBoardImages = freeBoardImageRepository.findFreeBoardImageByFreeBoard(freeBoard);

		if (deleteFreeBoardImages != null || !deleteFreeBoardImages.isEmpty()) {
			List<String> imageUrls = new ArrayList<>();
			for (FreeBoardImage deleteFreeBoardImage : deleteFreeBoardImages) {
				imageUrls.add(deleteFreeBoardImage.getFileUri());
			}
			imageService.deleteFile(imageUrls);
		}

		// freeBoardImageRepository.deleteAllByFreeBoard(freeBoard);
		// freeBoard.removeAllImage();

		// 현재 받은 이미지 S3에 업로드
		List<String> imageUrls = imageService.uploadFile(githubId, "freeboard", multipartFiles);
		List<FreeBoardImage> freeBoardImages = makeFreeBoardImages(freeBoard, imageUrls);

		freeBoardImageRepository.saveAll(freeBoardImages);
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
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.POST_NOT_FOUND));

		if (!githubId.equals(freeBoard.getUser().getGithubId())) {
			throw new FreeBoardException(ExceptionCode.WRITER_USER_MISMATCH);
		}

		List<FreeBoardImage> freeBoardImages = freeBoardImageRepository.findFreeBoardImageByFreeBoard(freeBoard);
		if (freeBoardImages != null || !freeBoardImages.isEmpty()) {
			List<String> imageUrls = new ArrayList<>();
			for (FreeBoardImage freeBoardImage : freeBoardImages) {
				imageUrls.add(freeBoardImage.getFileUri());
			}
			imageService.deleteFile(imageUrls);
		}
		freeBoardRepository.delete(freeBoard);

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

	/**
	 * 전체 게시물 수 반환
	 * */
	public long countFreeBoards() {
		return freeBoardRepository.count();
	}

	/**
	 * 게시물 좋아요
	 * 1. 게시물, 사용자 조회
	 * 2. 좋아요 여부 확인
	 * 3. 좋아요 후, 저장
	 * */
	public void likeFreeBoard(String githubId, Long freeBoardId) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.USER_NOT_FOUND));

		FreeBoard freeBoard = freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.POST_NOT_FOUND));

		if (freeBoard.getLikedUsers().contains(user)) {
			throw new FreeBoardException(ExceptionCode.LIKE_ALREADY_EXIST);
		}

		freeBoard.addLikeUser(user);

		freeBoardRepository.save(freeBoard);
	}

	/**
	 * 게시물 좋아요 취소
	 * 1. 게시물, 사용자 조회
	 * 2. 좋아요 여부 확인
	 * 3. 좋아요 취소 후, 저장
	 * */
	public void unlikeFreeBoard(String githubId, Long freeBoardId) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.USER_NOT_FOUND));

		FreeBoard freeBoard = freeBoardRepository.findFreeBoardByFreeBoardId(freeBoardId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.POST_NOT_FOUND));

		if (!freeBoard.getLikedUsers().contains(user)) {
			throw new FreeBoardException(ExceptionCode.LIKE_NOT_EXIST);
		}

		freeBoard.removeLikeUser(user);

		freeBoardRepository.save(freeBoard);
	}

	/**
	 * 사용자 본인의 게시물 반환
	 * 1. 사용자 조회
	 * 2. 사용자의 게시물 반환
	 * */
	public Slice<FreeBoardDetailResponse> findMyFreeBoards(String githubId, int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.USER_NOT_FOUND));

		Slice<FreeBoard> freeBoards = freeBoardRepository.findSliceByUser_GithubId(githubId,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
	}

	/**
	 * 단일 게시물의 좋아요 사용자 목록 반환
	 * */
	/*public Set<User> findLikedUsers(Long eurekaId) {
		return freeBoardRepository.findFreeBoardByFreeBoardId(eurekaId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.POST_NOT_FOUND)).getLikedUsers();
	}*/
	public Slice<FreeBoardLikeUserResponse> findLikedUsers(Long freeBoardId, String githubId, int pages) {
		Slice<User> likedUser = freeBoardRepository.findLikedUsersByFreeBoardId(freeBoardId,
			PageRequest.of(pages - 1, SIZE));
		return new SliceImpl<>(toLikeUserResponse(likedUser, githubId), likedUser.getPageable(), likedUser.hasNext());
	}

	/** 사용자가 좋아요한 게시물 목록 반환
	 * */
	public Slice<FreeBoardDetailResponse> findMyLikeFreeBoards(String githubId,
		int pages) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new FreeBoardException(ExceptionCode.USER_NOT_FOUND));
		Slice<FreeBoard> freeBoards = freeBoardRepository.findByLikedUsersContains(user,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
	}

	/**
	 * 게시물을 제목으로 검색
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 * */
	public Slice<FreeBoardDetailResponse> searchTitleFreeBoards(String keyword, int pages) {
		// if (sort.equals("likes")) {
		// 	Slice<FreeBoard> freeBoards = freeBoardRepository.findContainsTitleSortedByLikesFreeBoards(keyword,
		// 		PageRequest.of(pages - 1, SIZE));
		// 	return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		// }
		//
		// if (sort.equals("comments")) {
		// 	Slice<FreeBoard> freeBoards = freeBoardRepository.findContainsTitleSortedByCommentsFreeBoards(keyword,
		// 		PageRequest.of(pages - 1, SIZE));
		// 	return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		// }
		//
		// if (sort.equals("views")) {
		// 	Slice<FreeBoard> freeBoards = freeBoardRepository.findSliceByTitleContains(keyword,
		// 		PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
		// 	return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		// }

		// 최신 순
		Slice<FreeBoard> freeBoards = freeBoardRepository.findSliceByTitleContains(keyword,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
	}

	/**
	 * 게시물을 작성자 github ID로 검색
	 * 1. 정렬 조건 확인
	 * 2. 정렬 후 페이지네이션 반환
	 * */
	public Slice<FreeBoardDetailResponse> searchUserFreeBoards(String keyword, int pages) {
		// if (sort.equals("likes")) {
		// 	Slice<FreeBoard> freeBoards = freeBoardRepository.findByUserNameSortedByLikesFreeBoards(keyword,
		// 		PageRequest.of(pages - 1, SIZE));
		// 	return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		// }
		//
		// if (sort.equals("comments")) {
		// 	Slice<FreeBoard> freeBoards = freeBoardRepository.findByUserNameSortedByCommentsFreeBoards(keyword,
		// 		PageRequest.of(pages - 1, SIZE));
		// 	return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		// }
		//
		// if (sort.equals("views")) {
		// 	Slice<FreeBoard> freeBoards = freeBoardRepository.findSliceByUser_GithubId(keyword,
		// 		PageRequest.of(pages - 1, SIZE, Sort.by("view").descending().and(Sort.by("updatedDate").descending())));
		// 	return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());
		// }

		// 최신 순
		Slice<FreeBoard> freeBoards = freeBoardRepository.findSliceByUser_GithubIdContaining(keyword,
			PageRequest.of(pages - 1, SIZE, Sort.by("updatedDate").descending()));
		return new SliceImpl<>(toResponse(freeBoards), freeBoards.getPageable(), freeBoards.hasNext());

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
			.freeBoardImages(freeBoard.getFreeBoardImages())
			.likedUsers(freeBoard.getLikedUsers())
			.freeBoardComments(freeBoard.getFreeBoardComments())
			.build()).collect(Collectors.toList());
	}

	/**
	 * Slice<User>를 List<FreeBoardLikeUserResponse>로 변환
	 * */
	private List<FreeBoardLikeUserResponse> toLikeUserResponse(Slice<User> likedUsers, String githubId) {
		return likedUsers.getContent().stream().map(likedUser -> {
			boolean isFollow = relationRepository.existsByFromIdAndToId(githubId, likedUser.getGithubId());

			return FreeBoardLikeUserResponse.builder()
				.user(likedUser)
				.follow(isFollow)
				.build();
		}).collect(Collectors.toList());
	}
}
