package morningrolecall.heulgit.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.user.domain.CommitAnalyze;

public interface CommitAnalyzeRepository extends JpaRepository<CommitAnalyze, String> {

	List<CommitAnalyze> findAllByGithubId(String githubId);

	int deleteAllByGithubId(String githubId);

	CommitAnalyze save(CommitAnalyze commitAnalyze);
}