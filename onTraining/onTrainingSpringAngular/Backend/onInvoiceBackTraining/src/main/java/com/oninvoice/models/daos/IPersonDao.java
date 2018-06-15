package com.oninvoice.models.daos;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.oninvoice.models.entities.Person;

public interface IPersonDao extends PagingAndSortingRepository<Person, Long>{

}
