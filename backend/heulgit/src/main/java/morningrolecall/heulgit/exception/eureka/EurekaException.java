package morningrolecall.heulgit.exception.eureka;

import org.springframework.http.HttpStatus;

import morningrolecall.heulgit.exception.ExceptionCode;

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
