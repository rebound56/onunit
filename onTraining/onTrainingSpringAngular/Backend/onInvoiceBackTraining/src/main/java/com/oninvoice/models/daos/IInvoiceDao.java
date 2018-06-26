package com.oninvoice.models.daos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.oninvoice.models.entities.Invoice;

public interface IInvoiceDao extends PagingAndSortingRepository<Invoice, Long> {
	@Query(value = "SELECT i FROM Invoice i JOIN FETCH i.listItem l JOIN FETCH l.product WHERE i.person.id = :id", countQuery = "SELECT count(i) FROM Invoice i WHERE i.person.id = :id")
	public Page<Invoice> findByPersonId(@Param("id") Long id, Pageable pageable);
	
	@Query(value="SELECT i FROM Invoice i JOIN FETCH i.person p JOIN FETCH i.listItem l JOIN FETCH l.product WHERE i.id = :id")
	public Invoice fetchByIdWithPersonWithListItemWithProduct(@Param("id")Long id);
}
