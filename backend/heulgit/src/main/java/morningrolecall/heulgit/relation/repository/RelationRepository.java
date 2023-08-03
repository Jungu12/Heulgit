package morningrolecall.heulgit.relation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.relation.domain.Relation;

public interface RelationRepository extends JpaRepository<Relation, Long> {

	boolean existsByFromIdAndToId(String from, String to);

	int deleteByFromIdAndToId(String fromId, String toId);

	Relation save(Relation relation);

	List<Relation> findByFromId(String userId);

	List<Relation> findByToId(String userId);
}
