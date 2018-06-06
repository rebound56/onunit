package com.onDiscover.models.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.onDiscover.models.entities.Person;

@Repository
public class PersonDao implements IPersonDao {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public List<Person> findAll() {
		return em.createQuery("from Person p").getResultList();
	}

	@Override
	@Transactional
	public void save(Person person) {
		if (person != null && person.getId() != null) {
			em.merge(person);
			return;
		} 
		em.persist(person);
		

	}

	@Override
	public Person findById(Long id) {
		if(id != null) {
			return em.find(Person.class, id);
		}
		return null;
	}

}
