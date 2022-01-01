package com.huyphan.dao.predicateconstructors.factory;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dao.predicateconstructors.PredicateConstructor;
import com.huyphan.models.AppException;
import com.huyphan.models.SearchCriteria;
import com.huyphan.models.enums.ConstructorName;

/** Resolve a predicate constructor for a search criteria object. */
@Component
public class PredicateConstructorFactory<R> {

	@Autowired
	private List<PredicateConstructor<R>> constructors;

	/**
	 * Resolve a predicate constructor for a search criteria object.
	 * 
	 * @param searchCriteria Search criteria object used to resolve predicate constructor.
	 */
	public PredicateConstructor<R> getConstructor(SearchCriteria searchCriteria)
			throws AppException {

		ConstructorName constructorName = searchCriteria.getConstructorName();

		for (PredicateConstructor<R> constructor : constructors) {
			if (constructor.getConstructorName() == constructorName) {
				return constructor;
			}
		}

		throw new AppException("Predicate constructor doesn't exist");
	}

}
