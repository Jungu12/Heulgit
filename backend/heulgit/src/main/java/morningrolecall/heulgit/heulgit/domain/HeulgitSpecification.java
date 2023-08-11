package morningrolecall.heulgit.heulgit.domain;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class HeulgitSpecification {
	public static Specification<Heulgit> hasSort(String hasSorts){
		return (root, query, criteriaBuilder) -> {
			if ("likes".equals(hasSorts)) {
				return criteriaBuilder.gt(root.get("like"), 0);
			} else if ("stars".equals(hasSorts)) {
				return criteriaBuilder.gt(root.get("star"), 0);
			} else {
				return criteriaBuilder.conjunction();
			}
		};

	}

	public static Specification<Heulgit> hasLanguage(String language) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("language"), language);
	}

	public static Specification<Heulgit> isUpdatedDateBetween(LocalDateTime startDate, LocalDateTime endDate) {
		return (root, query, criteriaBuilder) ->
			criteriaBuilder.between(root.get("updatedDate"), startDate, endDate);
	}
}
