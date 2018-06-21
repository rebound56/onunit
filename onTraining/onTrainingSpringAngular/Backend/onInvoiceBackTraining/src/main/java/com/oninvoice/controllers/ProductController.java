package com.oninvoice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oninvoice.models.entities.Product;
import com.oninvoice.models.services.IProductService;

@Controller
@RequestMapping(value = "/product")
public class ProductController {
	@Autowired
	private IProductService productService;

	@GetMapping(value = "/get/all")
	public ResponseEntity<?> getAll() {
		List<Product> list = productService.findAll();
		return new ResponseEntity<List<Product>>(list, HttpStatus.OK);
	}
}
