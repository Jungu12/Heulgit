package morningrolecall.heulgit.user.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.auth.repository.AuthRepository;
import morningrolecall.heulgit.exception.AuthException;
import morningrolecall.heulgit.exception.ExceptionCode;
import morningrolecall.heulgit.exception.UserException;
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
			.orElseThrow(() -> new UserException(ExceptionCode.USER_NOT_FOUND));
		return user;
	}

	// public Object findCommitInfo() {
	// 	HttpHeaders headers = new HttpHeaders();
	// 	headers.set("Accept", "application/json");
	//
	// 	HttpEntity<String> requestEntity = new HttpEntity<>(headers);
	//
	// 	ResponseEntity<String> response = restT
	// 	// 1. db에 저장 된 commitTypes들을 들고 온다.
	// 	List<String> commitTypes =
	// 	Map<String, Integer> commitInfo =
	// 	// 2. 해당 사용자의 모든 repo를 긁어 온다(공식 api)
	// 	// 3. 모든 레포를 돌면서 commit type이 일치하는게 있는지 확인하고 있다면 ++ 해준다.
	// }
}
