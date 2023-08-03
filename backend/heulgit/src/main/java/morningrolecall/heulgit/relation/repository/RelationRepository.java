package morningrolecall.heulgit.relation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import morningrolecall.heulgit.relation.domain.Relation;

public interface RelationRepository extends JpaRepository<Relation, Long> {
	boolean existsByFromIdAndToId(String from, String to);
}
