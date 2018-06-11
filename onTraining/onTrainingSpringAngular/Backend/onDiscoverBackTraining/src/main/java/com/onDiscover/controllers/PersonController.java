package com.ondiscover.controllers;

import java.util.Map;
import java.util.NoSuchElementException;

import org.h2.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ondiscover.error.ErrorMessage;
import com.ondiscover.models.entities.Person;
import com.ondiscover.models.services.IPersonService;

@Controller
@RequestMapping(value = "/person")
public class PersonController {
	@Autowired
	private IPersonService personService;

	@GetMapping(value = "/get")
	public ResponseEntity<Page<Person>> findAll(@RequestParam Map<String,String> mapRequest) {
		int page = 0;
		int size= 5;
		if(mapRequest != null && mapRequest.get("page")!=null && StringUtils.isNumber(mapRequest.get("page")))
			page= Integer.parseInt(mapRequest.get("page"));
		if(mapRequest != null && mapRequest.get("size")!=null && StringUtils.isNumber(mapRequest.get("size")))
			size= Integer.parseInt(mapRequest.get("size"));
		
		Pageable pageable = PageRequest.of(page, size);
		Page<Person> list = personService.findAll(pageable);
		return new ResponseEntity<Page<Person>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/get/{id}")
	public ResponseEntity<?> findById(@PathVariable(name = "id") Long id) {
		try {
			Person person = personService.findById(id);
			if (person != null) {
				return new ResponseEntity<Person>(person, HttpStatus.OK);
			}
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		} catch (NoSuchElementException ex) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
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
			if (person != null && person.getId() != null) {
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
