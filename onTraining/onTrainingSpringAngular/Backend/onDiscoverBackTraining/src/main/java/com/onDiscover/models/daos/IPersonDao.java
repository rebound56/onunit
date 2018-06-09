package com.ondiscover.models.daos;

import org.springframework.data.repository.CrudRepository;

import com.ondiscover.models.entities.Person;

public interface IPersonDao extends CrudRepository<Person, Long> {

}
