package com.huyphan.dao.predicateconstructors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import com.huyphan.utils.ConstructorNameGetter;

/** Construct predicate for dynamic query. */
public interface PredicateConstructor<R> extends ConstructorNameGetter {

	/**
	 * Construct predicate using criteria API.
	 * 
	 * @param criteriaBuilder @see CriteriaBuilder.
	 * @param root @see Root.
	 * @param criteriaValue Value used to construct predicate.
	 */
	Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<R> root,
			Object criteriaValue);
}
