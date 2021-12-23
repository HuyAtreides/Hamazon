package com.huyphan.models;

/** Represents a application error. */
public class AppError extends Exception {

	private static final long serialVersionUID = -644530043205783551L;

	public AppError(String message) {
		super(message);
	}

}
