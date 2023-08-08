package morningrolecall.heulgit.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class EurekaException extends RuntimeException {
	private final ExceptionCode exceptionCode;

	public String getMessage() {
		return "[Eureka] " + exceptionCode.getMessage();
	}

	public HttpStatus getHttpStatus() {
		return exceptionCode.getStatus();
	}
}
