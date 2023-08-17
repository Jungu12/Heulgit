package morningrolecall.heulgit.relation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import morningrolecall.heulgit.relation.domain.Relation;

public interface RelationRepository extends JpaRepository<Relation, Long> {

	boolean existsByFromIdAndToId(String from, String to);

	int deleteByFromIdAndToId(String fromId, String toId);

	Relation save(Relation relation);

	List<Relation> findByFromId(String userId);

	List<Relation> findByToId(String userId);

	@Query("SELECT r.toId FROM Relation r WHERE r.fromId = :githubId AND r.toId LIKE %:keyword%")
	List<String> findAllByIdContainingKeyword(String githubId, String keyword);
}
