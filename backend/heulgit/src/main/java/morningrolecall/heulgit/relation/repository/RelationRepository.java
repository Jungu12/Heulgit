package morningrolecall.heulgit.relation.repository;

import javax.management.relation.Relation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {
	Relation findByFromIdAndToId(String fromId, String toId)
}
