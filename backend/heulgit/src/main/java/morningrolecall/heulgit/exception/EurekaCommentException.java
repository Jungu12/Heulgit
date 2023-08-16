package morningrolecall.heulgit.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;

@AllArgsConstructor

public class EurekaCommentException extends RuntimeException{
	private final ExceptionCode exceptionCode;

	public String getMessage() {
		return "[Eureka_Comment] " + exceptionCode.getMessage();
	}

	public HttpStatus getHttpStatus() {
		return exceptionCode.getStatus();
	}
}
