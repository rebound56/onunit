package com.oninvoice.controllers;

import java.util.Map;
import java.util.NoSuchElementException;

import org.h2.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.oninvoice.models.entities.Invoice;
import com.oninvoice.models.entities.Person;
import com.oninvoice.models.services.IInvoiceService;
import com.oninvoice.util.ErrorMessage;

@Controller
@RequestMapping(value = "/invoice")
public class InvoiceController {

	@Autowired
	IInvoiceService invoiceService;

	@GetMapping(value = "/get/person/{id}")
	public ResponseEntity<?> getByPersonId(@PathVariable(name = "id") Long id,
			@RequestParam Map<String, String> mapRequest) {
		if (id == null)
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set id"), HttpStatus.CONFLICT);
		int page = 0;
		int size = 5;
		if (mapRequest != null && mapRequest.get("page") != null && StringUtils.isNumber(mapRequest.get("page")))
			page = Integer.parseInt(mapRequest.get("page"));
		if (mapRequest != null && mapRequest.get("size") != null && StringUtils.isNumber(mapRequest.get("size")))
			size = Integer.parseInt(mapRequest.get("size"));
		Pageable pageable = PageRequest.of(page, size);
		Page<Invoice> list = invoiceService.findByPersonId(id, pageable);
		return new ResponseEntity<Page<Invoice>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/get/all")
	public ResponseEntity<?> getAll(@RequestParam Map<String, String> mapRequest) {
		int page = 0;
		int size = 5;
		if (mapRequest != null && mapRequest.get("page") != null && StringUtils.isNumber(mapRequest.get("page")))
			page = Integer.parseInt(mapRequest.get("page"));
		if (mapRequest != null && mapRequest.get("size") != null && StringUtils.isNumber(mapRequest.get("size")))
			size = Integer.parseInt(mapRequest.get("size"));
		Pageable pageable = PageRequest.of(page, size);
		Page<Invoice> list = invoiceService.findAll(pageable);
		return new ResponseEntity<Page<Invoice>>(list, HttpStatus.OK);
	}

	@PostMapping(value = "/save")
	public ResponseEntity<?> save(@RequestBody Invoice invoice) {
		try {
			if (invoice == null)
				return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set invoice"), HttpStatus.CONFLICT);
			invoice.calculateTotal();
			invoiceService.save(invoice);
			return new ResponseEntity<Invoice>(invoice, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorMessage>(
					new ErrorMessage("Error in some validations: " + ex.getLocalizedMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/get/{id}")
	public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {
		try {
			if (id == null)
				return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set id"), HttpStatus.CONFLICT);
			Invoice invoice = invoiceService.findById(id);
			if (invoice == null)
				return new ResponseEntity<ErrorMessage>(new ErrorMessage("Invoice not found"), HttpStatus.NOT_FOUND);
			return new ResponseEntity<Invoice>(invoice, HttpStatus.OK);
		} catch (NoSuchElementException ex) {
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Invoice not found"), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
		try {
			if (id == null)
				return new ResponseEntity<ErrorMessage>(new ErrorMessage("Please set id"), HttpStatus.CONFLICT);
			Invoice invoice = invoiceService.findById(id);
			if (invoice == null)
				return new ResponseEntity<ErrorMessage>(new ErrorMessage("Invoice not found"), HttpStatus.NOT_FOUND);
			invoiceService.delete(invoice);
			return new ResponseEntity<Object>(HttpStatus.OK);
		} catch (NoSuchElementException ex) {
			return new ResponseEntity<ErrorMessage>(new ErrorMessage("Invoice not found"), HttpStatus.NOT_FOUND);
		}

	}
}
