package com.huyphan.dao;

import java.util.List;
import javax.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import com.huyphan.dao.predicateconstructors.PredicateConstructor;
import com.huyphan.dao.predicateconstructors.factory.PredicateConstructorFactory;
import com.huyphan.models.AppException;
import com.huyphan.models.SearchCriteria;

/** Constructs specification {@link Specification} used for searching. */
public interface SearchSpecificationContructor<T> {

	/**
	 * Constructs a specification bases on the provided criteria list
	 * 
	 * @param criteriaList A list of criteria used to construct a specification.
	 * @param factory @see PredicateConstructorFactory.
	 */
	public default Specification<T> getSpecification(List<SearchCriteria> criteriaList,
			PredicateConstructorFactory<T> factory) {

		Specification<T> specification = (root, query, builder) -> {
			Predicate finalPredicate = builder.conjunction();
			for (SearchCriteria criteria : criteriaList) {
				try {
					PredicateConstructor<T> constructor = factory.getConstructor(criteria);
					Predicate predicate =
							constructor.constructPredicate(builder, root, criteria.getValue());
					finalPredicate = builder.and(finalPredicate, predicate);

				} catch (AppException e) {
					System.out.println(e);
				}
			}

			return finalPredicate;
		};

		return specification;
	}
}
