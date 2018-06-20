package com.oninvoice.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oninvoice.models.daos.IInvoiceDao;
import com.oninvoice.models.entities.Invoice;

@Service
public class InvoiceService implements IInvoiceService {

	@Autowired
	IInvoiceDao invoiceDao;

	@Transactional(readOnly = true)
	@Override
	public Page<Invoice> findByPersonId(Long id, Pageable pageable) {
		return invoiceDao.findByPersonId(id, pageable);
	}

	@Transactional
	@Override
	public void save(Invoice invoice) {
		invoiceDao.save(invoice);
	}

	@Transactional(readOnly = true)
	@Override
	public Page<Invoice> findAll(Pageable pageable) {
		return invoiceDao.findAll(pageable);
	}

	@Override
	public Invoice findById(Long id) {
		return this.invoiceDao.findById(id).get();
	}

	@Override
	public void delete(Invoice invoice) {
		this.invoiceDao.delete(invoice);
	}

}
