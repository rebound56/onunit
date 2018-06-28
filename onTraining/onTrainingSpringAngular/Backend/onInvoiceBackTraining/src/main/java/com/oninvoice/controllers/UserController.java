package com.oninvoice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oninvoice.models.entities.UserApplication;
import com.oninvoice.models.services.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping(value = "/save")
	public ResponseEntity<?> save(@RequestBody UserApplication user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		return new ResponseEntity<UserApplication>(user, HttpStatus.OK);
	}
}
