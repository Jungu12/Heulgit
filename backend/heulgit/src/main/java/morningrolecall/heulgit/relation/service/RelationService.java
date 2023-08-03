package morningrolecall.heulgit.relation.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.relation.repository.RelationRepository;

@Service
@RequiredArgsConstructor
public class RelationService {

	private final RelationRepository relationRepository;

	public boolean checkFollowState(String from, String to) {
		return relationRepository.existsByFromIdAndToId(from, to);
	}
}
