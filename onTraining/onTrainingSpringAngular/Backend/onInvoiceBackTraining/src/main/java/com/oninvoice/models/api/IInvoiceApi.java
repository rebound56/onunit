package com.oninvoice.models.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.oninvoice.models.entities.Invoice;

public interface IInvoiceApi {

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
	 * This method returns an Invoice by id
	 * 
	 * @param id
	 * @return
	 */
	public Invoice findById(Long id);

	/**
	 * This method deletes an invoice
	 * 
	 * @param invoice
	 */
	public void delete(Invoice invoice);

	/**
	 * THis method saves an invoice
	 * 
	 * @param invoice
	 */
	public void save(Invoice invoice);
}
