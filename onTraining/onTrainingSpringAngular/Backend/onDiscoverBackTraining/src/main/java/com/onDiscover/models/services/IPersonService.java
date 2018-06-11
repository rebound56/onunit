package com.ondiscover.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.ondiscover.models.entities.Person;

public interface IPersonService {
	/**
	 * It returns all list of person
	 * @return
	 */
	public List<Person> findAll();
	
	/**
	 * It returns Page<Person> depending on the variable pageable
	 * @param pageable
	 * @return
	 */
	public Page<Person> findAll(Pageable pageable);
	
	/**
	 * It returns a person by id
	 * @return
	 */
	public Person findById(Long id);
	
	/**
	 * It saves a person
	 * @param person
	 */
	public void save(Person person);
	
	/**
	 * It deletes a person
	 * @param id
	 */
	public void delete(Person person);
}
