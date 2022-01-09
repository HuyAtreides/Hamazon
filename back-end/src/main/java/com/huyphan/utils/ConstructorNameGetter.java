package com.huyphan.utils;

import com.huyphan.models.enums.ConstructorName;

/**
 * Interface implemented by predicate constructors return predicate constructor name.
 */
public interface ConstructorNameGetter {

	/**
	 * return predicate constructor name.
	 */
	ConstructorName getConstructorName();
}
