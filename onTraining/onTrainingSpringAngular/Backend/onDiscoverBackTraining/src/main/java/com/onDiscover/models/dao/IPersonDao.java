package com.onDiscover.models.dao;

import java.util.List;

import com.onDiscover.models.entities.Person;

public interface IPersonDao {
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
}
