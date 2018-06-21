package com.oninvoice.models.daos;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.oninvoice.models.entities.Product;

public interface IProductDao extends PagingAndSortingRepository<Product, Long> {

}
