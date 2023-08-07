package morningrolecall.heulgit.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {
	/* Auth */
	TOKEN_NOT_PROVIDED(HttpStatus.BAD_REQUEST, "요청 Header에 토큰 정보가 존재하지 않습니다."),
	TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
	USER_CREATED_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "사용자 객체 생성에 실패했습니다."),
	GITHUB_USER_FETCH_FAILED(HttpStatus.BAD_GATEWAY, "GITHUB 사용자 정보 요청에 실패했습니다."),
	GITHUB_ACCESS_TOKEN_FETCH_FAILED(HttpStatus.BAD_GATEWAY, "GITHUB Access Token 요청에 실패했습니다."),
	GITHUB_TOKEN_RESPONSE_FAILED(HttpStatus.BAD_GATEWAY, "GITHUB 토큰 정보 추출에 실패했습니다."),

	/* Eureka */
	WRITER_USER_MISMATCH(HttpStatus.FORBIDDEN, "작성자와 사용자가 다릅니다."),
	EUREKA_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 게시물이 존재하지 않습니다."),
	ISSUE_OR_PULL_REQUEST_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 이슈 또는 풀리퀘스트가 존재하지 않습니다."),
	PARENT_COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 부모 댓글이 존재하지 않습니다."),
	COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 댓글이 존재하지 않습니다."),
	LIKE_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 좋아요를 누른 게시물입니다."),
	LIKE_NOT_EXIST(HttpStatus.CONFLICT, "좋아요를 누르지 않은 게시물입니다."),

	/* User */
	USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 사용자가 존재하지 않습니다.");

	private final HttpStatus status;
	private final String message;
}
