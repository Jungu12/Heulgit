package morningrolecall.heulgit.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import morningrolecall.heulgit.exception.dto.ExceptionResponse;

@RestControllerAdvice
public class ExceptionAdvice {
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@ExceptionHandler(EurekaException.class)
	public ResponseEntity<ExceptionResponse> handleEurekaException(EurekaException exception) {
		logger.debug("handleEurekaException(), exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(FreeBoardException.class)
	public ResponseEntity<ExceptionResponse> handleFreeBoardException(FreeBoardException exception) {
		logger.debug("handleFreeBoardException(), exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(RelationException.class)
	public ResponseEntity<ExceptionResponse> handleRelationException(RelationException exception) {
		logger.debug("handleRelationException(), exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(AuthException.class)
	public ResponseEntity<ExceptionResponse> handleAuthException(AuthException exception) {
		logger.debug("handleAuthException(), exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(GmException.class)
	public ResponseEntity<ExceptionResponse> handleGMException(AuthException exception) {
		logger.debug("handleAuthException(), exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(HeulgitException.class)
	public ResponseEntity<ExceptionResponse> handleHeulgitException(HeulgitException exception) {
		logger.debug("handleHeulgitException, exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(NotificationException.class)
	public ResponseEntity<ExceptionResponse> handleNotificationException(NotificationException exception) {
		logger.debug("handleHeulgitException, exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(EurekaCommentException.class)
	public ResponseEntity<ExceptionResponse> handleEurekaCommentException(EurekaCommentException exception) {
		logger.debug("handleEurekaCommentException, exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(FreeBoardCommentException.class)
	public ResponseEntity<ExceptionResponse> handleFreeBoardCommentException(FreeBoardCommentException exception) {
		logger.debug("handleFreeBoardCommentException, exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}

	@ExceptionHandler(HeulgitCommentException.class)
	public ResponseEntity<ExceptionResponse> handleHeulgitCommentException(HeulgitCommentException exception) {
		logger.debug("handleHeulgitCommentException, exception status : {}, exception message: {}",
			exception.getHttpStatus(),
			exception.getMessage());
		return ResponseEntity.status(exception.getHttpStatus()).body(new ExceptionResponse(exception.getMessage()));
	}
}
