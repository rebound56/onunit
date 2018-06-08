package com.onDiscover.models.daos;

import org.springframework.data.repository.CrudRepository;

import com.onDiscover.models.entities.Person;

public interface IPersonDao extends CrudRepository<Person, Long> {

}
