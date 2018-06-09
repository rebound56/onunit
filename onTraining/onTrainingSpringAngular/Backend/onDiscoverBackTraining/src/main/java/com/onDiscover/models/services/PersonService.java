package com.ondiscover.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ondiscover.models.daos.IPersonDao;
import com.ondiscover.models.entities.Person;

@Service
public class PersonService implements IPersonService {
	@Autowired
	private IPersonDao personDao;

	@Override
	@Transactional(readOnly = true)
	public List<Person> findAll() {
		return (List<Person>) personDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Person findById(Long id) {
		return personDao.findById(id).get();
	}

	@Override
	@Transactional
	public void save(Person person) {
		personDao.save(person);
	}

	@Override
	@Transactional
	public void delete(Person person) {
		personDao.delete(person);
	}

}
