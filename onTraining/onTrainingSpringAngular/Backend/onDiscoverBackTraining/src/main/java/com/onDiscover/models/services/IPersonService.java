package com.ondiscover.models.services;

import java.util.List;

import com.ondiscover.models.entities.Person;

public interface IPersonService {
	/**
	 * It returns all list of person
	 * @return
	 */
	public List<Person> findAll();
	
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
