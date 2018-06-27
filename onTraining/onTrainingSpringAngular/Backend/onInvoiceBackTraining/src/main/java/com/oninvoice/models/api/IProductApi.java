package com.oninvoice.models.api;

import java.util.List;

import com.oninvoice.models.entities.Product;

public interface IProductApi {
	
	/**
	 * THis method returns a list of all products
	 * @return
	 */
	public List<Product> findAll();
}
