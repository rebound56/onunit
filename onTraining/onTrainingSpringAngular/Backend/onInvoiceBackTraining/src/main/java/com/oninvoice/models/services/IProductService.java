package com.oninvoice.models.services;

import java.util.List;

import com.oninvoice.models.entities.Product;

public interface IProductService {
	
	/**
	 * THis method returns a list of all products
	 * @return
	 */
	public List<Product> findAll();
}
