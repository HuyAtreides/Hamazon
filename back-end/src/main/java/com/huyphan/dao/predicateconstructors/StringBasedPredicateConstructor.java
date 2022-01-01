package com.huyphan.dao.predicateconstructors;

import com.huyphan.utils.ConstructorNameGetter;

/** Construct string-based predicate dynamically. */
public interface StringBasedPredicateConstructor extends ConstructorNameGetter {
	/**
	 * Construct predicate.
	 * 
	 * @param criteriaValue Value used to construct predicate.
	 */
	String constructPredicate(Object criteriaValue);
}
