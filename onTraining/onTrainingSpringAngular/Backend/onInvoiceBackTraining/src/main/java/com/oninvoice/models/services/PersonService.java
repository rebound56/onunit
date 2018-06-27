package com.oninvoice.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oninvoice.models.api.IPersonApi;
import com.oninvoice.models.daos.IPersonDao;
import com.oninvoice.models.entities.Person;

@Service
public class PersonService implements IPersonApi {
	@Autowired
	private IPersonDao personDao;

	@Override
	@Transactional(readOnly=true)
	public Page<Person> findAll(Pageable pageable) {
		return this.personDao.findAll(pageable);
	}

	@Override
	@Transactional(readOnly=true)
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
