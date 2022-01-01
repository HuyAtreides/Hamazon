package com.huyphan.models;

/** Represents a application exception. */
public class AppException extends Exception {

	private static final long serialVersionUID = -644530043205783551L;

	public AppException(String message) {
		super(message);
	}

}
