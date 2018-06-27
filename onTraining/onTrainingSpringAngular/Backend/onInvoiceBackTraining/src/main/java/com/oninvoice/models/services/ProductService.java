package com.oninvoice.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oninvoice.models.api.IProductApi;
import com.oninvoice.models.daos.IProductDao;
import com.oninvoice.models.entities.Product;

@Service
public class ProductService implements IProductApi {

	@Autowired
	private IProductDao productDao;

	@Transactional(readOnly = true)
	@Override
	public List<Product> findAll() {
		return (List<Product>) productDao.findAll();
	}

}
