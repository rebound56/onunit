package com.oninvoice.models.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
@Table
public class Product implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6670147323342639415L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	@NotNull
	private String name;

	@Column
	@NotNull
	private String description;

	@Column(name = "gross_price_per_unit")
	@NotNull
	private Double grossPricePerUnit;

	@Column(name = "gross_taxes_per_unit")
	@NotNull
	private Double priceTaxesPerUnit;

	@Column(name = "created_at")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date createdAt;

	@Column(name = "modified_at")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date modifiedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Date modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public Product() {
		super();
	}

	@PrePersist
	public void prePersist() {
		this.createdAt = new Date();
		preUpdate();
	}

	@PreUpdate
	public void preUpdate() {
		this.modifiedAt = new Date();
	}

}
