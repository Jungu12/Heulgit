package morningrolecall.heulgit.relation.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Relation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "relation_id", nullable = false)
	private long relationId;

	@Column(name = "from_id", nullable = false)
	private String fromId;

	@Column(name = "to_id", nullable = false)
	private String toId;
}
