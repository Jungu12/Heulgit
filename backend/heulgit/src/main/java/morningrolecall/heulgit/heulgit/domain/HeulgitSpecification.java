// package morningrolecall.heulgit.heulgit.domain;
//
// import org.springframework.data.jpa.domain.Specification;
//
// import lombok.RequiredArgsConstructor;
//
// @RequiredArgsConstructor
// public class HeulgitSpecification {
// 	public static Specification<Heulgit> hasLikes(boolean hasLikes){
// 		return (root, query, criteriaBuilder) -> hasLikes ?
// 			criteriaBuilder.gt(root.get("likes"), 0) :
// 			criteriaBuilder.conjunction();
// 	}
//
// 	public static Specification<Heulgit> hasStars(boolean hasStars) {
// 		return (root, query, criteriaBuilder) -> hasStars ?
// 			criteriaBuilder.gt(root.get("stars"), 0) :
// 			criteriaBuilder.conjunction();
// 	}
//
// 	public static Specification<Heulgit> hasLanguage(String language) {
// 		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("language"), language);
// 	}
//
// 	public static Specification<Heulgit> isUpdatedDateBetween(ZonedDateTime startDate, ZonedDateTime endDate) {
// 		return (root, query, criteriaBuilder) ->
// 			criteriaBuilder.between(root.get("updatedDate"), startDate, endDate);
// 	}
// }
