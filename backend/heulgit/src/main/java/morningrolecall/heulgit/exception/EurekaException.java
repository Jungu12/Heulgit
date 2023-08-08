package morningrolecall.heulgit.exception;

import org.springframework.http.HttpStatus;

public class EurekaException extends RuntimeException {
	private final ExceptionCode exceptionCode;

	public EurekaException(ExceptionCode exceptionCode) {
		this.exceptionCode = exceptionCode;
	}

	public String getMessage() {
		return exceptionCode.getMessage();
	}

	public HttpStatus getHttpStatus() {
		return exceptionCode.getStatus();
	}
}
