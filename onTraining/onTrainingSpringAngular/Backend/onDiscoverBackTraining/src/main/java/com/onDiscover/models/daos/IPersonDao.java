package com.ondiscover.models.daos;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.ondiscover.models.entities.Person;

public interface IPersonDao extends PagingAndSortingRepository<Person, Long> {

}
