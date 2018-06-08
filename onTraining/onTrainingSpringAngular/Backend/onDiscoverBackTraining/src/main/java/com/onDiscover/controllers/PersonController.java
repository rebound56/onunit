package com.onDiscover.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.onDiscover.error.ErrorMessage;
import com.onDiscover.models.entities.Person;
import com.onDiscover.models.services.IPersonService;

@Controller
@RequestMapping(value = "/person")
public class PersonController {
	@Autowired
	private IPersonService personService;

	@GetMapping(value = "/get")
	public ResponseEntity<List<Person>> findAll() {
		List<Person> list = personService.findAll();
		return new ResponseEntity<List<Person>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/get/{id}")
	public ResponseEntity<?> findById(@PathVariable(name = "id") Long id) {
		Person person = personService.findById(id);
		if (person != null) {
			return new ResponseEntity<Person>(person, HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.NOT_FOUND);
	}

	@PostMapping(value = "/save")
	public ResponseEntity<?> save(@RequestBody Person input) {
		try {
			personService.save(input);
			return new ResponseEntity<Person>(input, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorMessage>(
					new ErrorMessage("Error in some validations: " + ex.getLocalizedMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity delete(@PathVariable(name = "id") Long id) {
		if (id != null) {
			Person person = personService.findById(id);
			if(person != null && person.getId() != null) {
				try {
					personService.delete(person);
					return new ResponseEntity(HttpStatus.OK);
				} catch (Exception ex) {
					return new ResponseEntity<ErrorMessage>(
							new ErrorMessage("Error in some validations: " + ex.getLocalizedMessage()),
							HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}			
		}
		return new ResponseEntity(HttpStatus.NOT_FOUND);	
	}

}
