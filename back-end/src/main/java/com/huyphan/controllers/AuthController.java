package com.huyphan.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Controller handles authorization operations. */
@RestController
@RequestMapping("/auth")
public class AuthController {

	/** Handles login. */
	@GetMapping("/login")
	public String login() {
		return "Api works!";
	}
}
