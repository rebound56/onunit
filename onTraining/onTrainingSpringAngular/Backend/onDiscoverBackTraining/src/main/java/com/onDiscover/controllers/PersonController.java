package com.onDiscover.controllers;

import java.util.List;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.onDiscover.error.ErrorMessage;
import com.onDiscover.models.daos.IPersonDao;
import com.onDiscover.models.entities.Person;

@Controller
@RequestMapping(value = "/person")
public class PersonController {
	@Autowired
	private IPersonDao personDao;

	@GetMapping(value = "/")
	public ResponseEntity<List<Person>> findAll() {
		List<Person> list = personDao.findAll();
		return new ResponseEntity<List<Person>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> findById(@PathVariable(name = "id") Long id) {
		Person person = personDao.findById(id);
		if (person != null) {
			return new ResponseEntity<Person>(person, HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}

	@PostMapping(value = "/save")
	public ResponseEntity<?> save(@RequestBody Person input) {
		try {
			personDao.save(input);
			return new ResponseEntity<Person>(input, HttpStatus.OK);
		}catch(Exception ex) {
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Error in some validations: "+ex.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

}