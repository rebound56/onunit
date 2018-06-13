package com.ondiscover.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.NoSuchElementException;

import org.h2.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ondiscover.error.ErrorMessage;
import com.ondiscover.models.entities.Person;
import com.ondiscover.models.services.IPersonService;
import com.ondiscover.util.FileUtility;

@Controller
@RequestMapping(value = "/person")
public class PersonController {
	@Autowired
	private IPersonService personService;

	@GetMapping(value = "/get/all")
	public ResponseEntity<Page<Person>> getAll(@RequestParam Map<String, String> mapRequest) {
		int page = 0;
		int size = 5;
		if (mapRequest != null && mapRequest.get("page") != null && StringUtils.isNumber(mapRequest.get("page")))
			page = Integer.parseInt(mapRequest.get("page"));
		if (mapRequest != null && mapRequest.get("size") != null && StringUtils.isNumber(mapRequest.get("size")))
			size = Integer.parseInt(mapRequest.get("size"));

		Pageable pageable = PageRequest.of(page, size);
		Page<Person> list = personService.findAll(pageable);
		return new ResponseEntity<Page<Person>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/get/{id}")
	public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {
		if (id == null)
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set id"), HttpStatus.CONFLICT);
		try {
			Person person = personService.findById(id);
			if (person != null) {
				return new ResponseEntity<Person>(person, HttpStatus.OK);
			}
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person not found"), HttpStatus.NOT_FOUND);
		} catch (NoSuchElementException ex) {
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person not found"), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping(value = "/get/photo/{id}")
	public ResponseEntity<?> getPhotoById(@PathVariable(name = "id") Long id) {
		if (id == null)
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set id"), HttpStatus.CONFLICT);
		try {
			Person person = personService.findById(id);
			if (person != null) {
				if (person.getPhoto() != null && person.getPhoto().trim().length() > 0) {
					Path fileDirectory = FileUtility.getPathFileName(person.getPhoto());
					File f = fileDirectory.toFile();
					if (f.exists()) {
						byte[] image = Files.readAllBytes(fileDirectory);
						return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
					} else {
						return new ResponseEntity<ErrorMessage>(new ErrorMessage("The person's image cannot be found"),
								HttpStatus.CONFLICT);
					}
				}
				return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person does not have photography"),
						HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person not found"), HttpStatus.NOT_FOUND);
		} catch (NoSuchElementException ex) {
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person not found"), HttpStatus.NOT_FOUND);
		} catch (IOException e) {
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("The person's image cannot be read"),
					HttpStatus.CONFLICT);
		}
	}

	@PostMapping(value = "/save")
	public ResponseEntity<?> save(@RequestBody Person person) {
		if (person == null)
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set person"), HttpStatus.CONFLICT);
		try {
			personService.save(person);
			return new ResponseEntity<Person>(person, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorMessage>(
					new ErrorMessage("Error in some validations: " + ex.getLocalizedMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/save/photo/{id}", headers = "Content-Type=multipart/form-data")
	public ResponseEntity<?> savePhoto(@PathVariable(name = "id") Long id, @RequestParam("photo") MultipartFile photo) {
		if (id == null)
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set id"), HttpStatus.CONFLICT);
		if (photo == null)
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please send file photo"), HttpStatus.CONFLICT);

		try {
			Person person = personService.findById(id);
			if (person != null) {
				try {
					// save image into fyle system
					String filename = FileUtility.generateRandomFileName(photo);
					FileUtility.writeFile(filename, photo);

					// delete old image into fyle system
					String oldFilename = person.getPhoto();
					if (oldFilename != null && oldFilename.trim().length() > 0) {
						FileUtility.deleteFile(oldFilename);
					}

					// save person with new image
					person.setPhoto(filename);
					this.personService.save(person);
					return new ResponseEntity<Object>(HttpStatus.OK);
				} catch (IOException e) {
					return new ResponseEntity<ErrorMessage>(new ErrorMessage("Error trying to upload image"),
							HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person not found"), HttpStatus.NOT_FOUND);
		} catch (NoSuchElementException ex) {
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person not found"), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
		if (id == null)
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set id"), HttpStatus.CONFLICT);
		try {
			Person person = personService.findById(id);
			if (person != null) {
				try {
					personService.delete(person);
					return new ResponseEntity<Object>(HttpStatus.OK);
				} catch (Exception ex) {
					return new ResponseEntity<ErrorMessage>(
							new ErrorMessage("Error in some validations: " + ex.getLocalizedMessage()),
							HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person not found"), HttpStatus.NOT_FOUND);
		} catch (NoSuchElementException ex) {
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Person not found"), HttpStatus.NOT_FOUND);
		}

	}

}
