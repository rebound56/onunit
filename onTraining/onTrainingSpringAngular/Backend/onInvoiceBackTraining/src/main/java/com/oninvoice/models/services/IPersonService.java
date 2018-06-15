package com.oninvoice.models.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.oninvoice.models.entities.Person;

public interface IPersonService {
	/**
	 * This method returns a Page<Person>
	 * 
	 * @return
	 */
	public Page<Person> findAll(Pageable pageable);

	/**
	 * This method find a person by id
	 * 
	 * @param id
	 * @return
	 */
	public Person findById(Long id);

	/**
	 * This method saves a person
	 * 
	 * @param person
	 */
	public void save(Person person);

	/**
	 * This method deletes a person
	 * 
	 * @param person
	 */
	public void delete(Person person);
}
