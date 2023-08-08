package morningrolecall.heulgit.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@ExceptionHandler(EurekaException.class)
	public ResponseEntity<?> handleEurekaException(EurekaException exception) {
		logger.debug("handleEurekaException(), exception status : {}, exception message: {}", exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(exception.getMessage());
	}
}
