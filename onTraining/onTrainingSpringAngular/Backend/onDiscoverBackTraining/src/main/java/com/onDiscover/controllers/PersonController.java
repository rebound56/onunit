package com.onDiscover.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.onDiscover.models.dao.IPersonDao;
import com.onDiscover.models.entities.Person;

@Controller
@RequestMapping(value = "/person")
public class PersonController {
	@Autowired
	private IPersonDao personDao;

	@GetMapping(value = "/all")
	@ResponseBody
	public ResponseEntity<List<Person>> all() {
		try {
			List<Person> list = personDao.findAll();
			return new ResponseEntity<List<Person>>(list, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
