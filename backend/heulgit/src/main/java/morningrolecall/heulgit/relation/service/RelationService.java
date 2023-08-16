package morningrolecall.heulgit.relation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.relation.domain.Relation;
import morningrolecall.heulgit.relation.domain.dto.RelationUserInfo;
import morningrolecall.heulgit.relation.repository.RelationRepository;
import morningrolecall.heulgit.user.domain.User;
import morningrolecall.heulgit.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class RelationService {

	private final RelationRepository relationRepository;
	private final UserRepository userRepository;

	public boolean checkFollowState(String from, String to) {
		return relationRepository.existsByFromIdAndToId(from, to);
	}

	@Transactional
	public void cancelFollow(String from, String to) {
		int deleteCount = relationRepository.deleteByFromIdAndToId(from, to);

		if (deleteCount == 0) {
			throw new RuntimeException("삭제할 정보가 없습니다.");
		}
	}

	@Transactional
	public void addFollow(String from, String to) {
		// 이미 팔로우 관계가 존재하면 아무 작업을 하지 않는다.
		if (relationRepository.existsByFromIdAndToId(from, to)) {
			//Todo : 예외처리 코드 추가 필요
			System.out.println("이미 팔로우가 이루어졌습니다.");
			return;
		}

		// 팔로우 관계가 존재하지 않는 경우 새로운 Relation 엔티티를 생성하여 저장한다.
		Relation relation = Relation.builder()
			.fromId(from)
			.toId(to)
			.build();

		relationRepository.save(relation);
	}

	public List<RelationUserInfo> getFollowers(String myId, String userId) {
		List<Relation> relations = relationRepository.findByToId(userId);

		if (relations.isEmpty()) {
			throw new RuntimeException("조회할 정보가 없습니다.");
		}
		//나를 팔로우 하는 유저 목록
		List<String> followers = relations.stream().map(Relation::getFromId).collect(Collectors.toList());
		List<RelationUserInfo> userInfos = new ArrayList<>();

		for (String follower : followers) {
			User user = userRepository.findUserByGithubId(follower).orElseThrow();
			boolean follow = relationRepository.existsByFromIdAndToId(myId, user.getGithubId());
			userInfos.add(RelationUserInfo.builder()
				.id(user.getGithubId())
				.avater_url(user.getAvatarUrl())
				.follow(follow)
				.build());
		}
		return userInfos;
	}

	public List<RelationUserInfo> getFollowings(String myId, String userId) {
		List<Relation> relations = relationRepository.findByFromId(userId);

		if (relations.isEmpty()) {
			throw new RuntimeException("조회할 정보가 없습니다.");
		}

		//내가 팔로우 하는 유저 목록
		List<String> followings = relations.stream().map(Relation::getToId).collect(Collectors.toList());
		List<RelationUserInfo> userInfos = new ArrayList<>();

		for (String following : followings) {
			User user = userRepository.findUserByGithubId(following).orElseThrow();
			boolean follow = relationRepository.existsByFromIdAndToId(myId, user.getGithubId());
			userInfos.add(RelationUserInfo.builder()
				.id(user.getGithubId())
				.avater_url(user.getAvatarUrl())
				.follow(follow)
				.build());
		}
		return userInfos;
	}
}

