package com.onDiscover.models.daos;

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

	/*
	 * @see com.onDiscover.models.daos.IPersonDao#findAll()
	 */
	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public List<Person> findAll() {
		return em.createQuery("from Person p").getResultList();
	}

	/*
	 * @see
	 * com.onDiscover.models.daos.IPersonDao#save(com.onDiscover.models.entities.
	 * Person)
	 */
	@Override
	@Transactional
	public void save(Person person) {
		if (person != null && person.getId() != null) {
			em.merge(person);
			return;
		}
		em.persist(person);

	}

	/*
	 * @see com.onDiscover.models.daos.IPersonDao#findById(java.lang.Long)
	 */
	@Override
	public Person findById(Long id) {
		if (id != null) {
			return em.find(Person.class, id);
		}
		return null;
	}

	/*
	 * @see com.onDiscover.models.daos.IPersonDao#delete(java.lang.Long)
	 */
	@Override
	@Transactional
	public void delete(Person person) {
		em.remove(em.contains(person) ? person : em.merge(person));
	}

}
