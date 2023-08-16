package morningrolecall.heulgit.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class HeulgitException  extends RuntimeException {
	private final ExceptionCode exceptionCode;

	public String getMessage() {
		return "[Heulgit] " + exceptionCode.getMessage();
	}

	public HttpStatus getHttpStatus() {
		return exceptionCode.getStatus();
	}
}
