package com.oninvoice.models.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table
public class Item implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2315843760079826404L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	@NotNull
	private Integer amount;

	@Column(name = "gross_price_per_unit")
	@NotNull
	private Double grossPricePerUnit;

	@Column(name = "price_taxes_per_unit")
	@NotNull
	private Double priceTaxesPerUnit;

	@Column(name = "total_price_taxes")
	@NotNull
	private Double totalPriceTaxes;

	@Column(name = "total_gross_price")
	@NotNull
	private Double totalGrossPrice;

	@Column
	@NotNull
	private Double total;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Product product;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Double getGrossPricePerUnit() {
		return grossPricePerUnit;
	}

	public void setGrossPricePerUnit(Double grossPricePerUnit) {
		this.grossPricePerUnit = grossPricePerUnit;
	}

	public Double getPriceTaxesPerUnit() {
		return priceTaxesPerUnit;
	}

	public void setPriceTaxesPerUnit(Double priceTaxesPerUnit) {
		this.priceTaxesPerUnit = priceTaxesPerUnit;
	}

	public Double getTotalPriceTaxes() {
		return totalPriceTaxes;
	}

	public void setTotalPriceTaxes(Double totalPriceTaxes) {
		this.totalPriceTaxes = totalPriceTaxes;
	}

	public Double getTotalGrossPrice() {
		return totalGrossPrice;
	}

	public void setTotalGrossPrice(Double totalGrossPrice) {
		this.totalGrossPrice = totalGrossPrice;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Item() {
		super();
	}

	/**
	 * This method calculates the total based on the product
	 */
	public void calculateTotal() {
		this.total = Double.valueOf(0d);
		this.totalGrossPrice = Double.valueOf(0d);
		this.totalPriceTaxes = Double.valueOf(0d);
		this.amount = this.amount != null ? this.amount : Integer.valueOf(1);

		this.grossPricePerUnit = this.getProduct() != null ? this.getProduct().getGrossPricePerUnit()
				: Double.valueOf(0d);
		this.priceTaxesPerUnit = this.getProduct().getPriceTaxesPerUnit();
		this.priceTaxesPerUnit = this.getProduct() != null ? this.getProduct().getPriceTaxesPerUnit()
				: Double.valueOf(0d);

		this.totalGrossPrice = this.amount * this.grossPricePerUnit;
		this.totalPriceTaxes = this.amount * this.priceTaxesPerUnit;
		this.total = this.totalGrossPrice + this.totalPriceTaxes;
	}

}
