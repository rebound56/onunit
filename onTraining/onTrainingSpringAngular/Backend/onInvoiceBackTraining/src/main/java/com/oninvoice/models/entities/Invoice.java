package com.oninvoice.models.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table
public class Invoice implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7695857690626058647L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String code;

	@Column
	private String comments;

	@Column(name = "total_price_taxes")
	@NotNull
	private Double totalPriceTaxes;

	@Column(name = "total_gross_price")
	@NotNull
	private Double totalGrossPrice;

	@Column
	@NotNull
	private Double total;

	@Column(name = "created_at")
	@Temporal(TemporalType.DATE)
	private Date createdAt;

	@Column(name = "modified_at")
	@Temporal(TemporalType.DATE)
	private Date modifiedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "person_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Person person;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "invoice_id")
	private List<Item> listItem;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}



	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
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

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	public List<Item> getListItem() {
		return listItem;
	}

	public void setListItem(List<Item> listItem) {
		this.listItem = listItem;
	}

	public Invoice() {
		super();
	}


	@Override
	public String toString() {
		return "Invoice [id=" + id + ", code=" + code + ", comments=" + comments + ", totalPriceTaxes="
				+ totalPriceTaxes + ", totalGrossPrice=" + totalGrossPrice + ", total=" + total + ", createdAt="
				+ createdAt + ", modifiedAt=" + modifiedAt + ", person=" + person + ", listItem=" + listItem + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Invoice other = (Invoice) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@PrePersist
	public void prePersist() {
		this.createdAt = new Date();
		this.code = String.valueOf(new Date().getTime());
		preUpdate();
	}

	@PreUpdate
	public void preUpdate() {
		this.modifiedAt = new Date();
	}

	/**
	 * This method calculates the total based on its items
	 */
	public void calculateTotal() {
		this.total = Double.valueOf(0d);
		this.totalGrossPrice = Double.valueOf(0d);
		this.totalPriceTaxes = Double.valueOf(0d);

		if (this.listItem != null) {
			for (Item item : listItem) {
				item.calculateTotal();
				this.total += item.getTotal();
				this.totalGrossPrice += item.getTotalGrossPrice();
				this.totalPriceTaxes += item.getTotalPriceTaxes();

			}
		}

	}

	/**
	 * THis method adds item
	 * 
	 * @param item
	 */
	public void addItem(Item item) {
		if (this.listItem == null)
			this.listItem = new ArrayList<>();
		this.listItem.add(item);
	}

}
