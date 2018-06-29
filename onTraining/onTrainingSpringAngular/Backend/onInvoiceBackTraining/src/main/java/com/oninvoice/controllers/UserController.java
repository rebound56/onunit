package com.oninvoice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oninvoice.models.entities.User;
import com.oninvoice.models.services.UserService;

@RestController
@RequestMapping(value = "/api/user")
@Secured({ "ROLE_ADMIN" })
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping(value = "/save")
	public ResponseEntity<?> save(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		this.userService.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
}
