package com.oninvoice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oninvoice.models.api.IUserApi;
import com.oninvoice.models.entities.User;

@RestController
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	private IUserApi userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping(value = "/save")
	public ResponseEntity<?> login(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userService.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
}
