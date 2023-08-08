package morningrolecall.heulgit.user.service;

import javax.persistence.NoResultException;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.auth.repository.AuthRepository;
import morningrolecall.heulgit.exception.AuthException;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final AuthRepository authRepository;

	public void logout(String userId) {
		int deleteCount = authRepository.deleteJwt(userId);

		if (deleteCount == 0) {
			throw new AuthException(ExceptionCode.TOKEN_DELETE_FAILED);
		}
	}

	public User findUser(String githubId) {
		User user = userRepository.findUserByGithubId(githubId)
			.orElseThrow(() -> new NoResultException("해당 사용자가 등록되어 있지 않습니다."));
		return user;
	}
}
