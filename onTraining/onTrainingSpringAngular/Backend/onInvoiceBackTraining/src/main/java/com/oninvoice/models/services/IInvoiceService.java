package com.oninvoice.models.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.oninvoice.models.entities.Invoice;

public interface IInvoiceService {

	/**
	 * THis method returns a Page<Invoice>
	 * 
	 * @param pageable
	 * @return
	 */
	public Page<Invoice> findAll(Pageable pageable);

	/**
	 * THis method returns a Page<Invoice> by person id
	 * 
	 * @param id
	 * @param pageable
	 * @return
	 */
	public Page<Invoice> findByPersonId(Long id, Pageable pageable);

	/**
	 * THis method saves an invoice
	 * 
	 * @param invoice
	 */
	public void save(Invoice invoice);
}
