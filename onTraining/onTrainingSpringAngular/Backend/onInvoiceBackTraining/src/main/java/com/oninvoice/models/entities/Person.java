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
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table
public class Person implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2884708955221489221L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	@NotNull
	@NotEmpty
	private String name;

	@Column(name = "last_name")
	@NotNull
	@NotEmpty
	private String lastName;

	@Column
	@NotNull
	@NotEmpty
	@Email
	private String email;

	@Column
	@NotNull
	@NotEmpty
	private String phone;

	@Column
	@NotNull
	@NotEmpty
	private String gender;

	@Column(name = "number_document")
	@NotNull
	@NotEmpty
	private String numberDocument;

	@Column(name = "created_at")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date createdAt;

	@Column(name = "modified_at")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date modifiedAt;

	@OneToMany(fetch = FetchType.LAZY, cascade= CascadeType.ALL, mappedBy="person")
	private List<Invoice> listInvoice;

	public Person() {
		super();
	}

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

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getNumberDocument() {
		return numberDocument;
	}

	public void setNumberDocument(String numberDocument) {
		this.numberDocument = numberDocument;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createAt) {
		this.createdAt = createAt;
	}

	public Date getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Date modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public List<Invoice> getListInvoice() {
		return listInvoice;
	}

	public void setListInvoice(List<Invoice> listInvoice) {
		this.listInvoice = listInvoice;
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", name=" + name + ", lastName=" + lastName + ", email=" + email + ", phone="
				+ phone + ", gender=" + gender + ", idCard=" + numberDocument + ", createAt=" + createdAt
				+ ", modifiedAt=" + modifiedAt + "]";
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
		Person other = (Person) obj;
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
		preUpdate();
	}

	@PreUpdate
	public void preUpdate() {
		this.modifiedAt = new Date();
	}

	/**
	 * THis method adds invoice to the listInvoice
	 * 
	 * @param invoice
	 */
	public void addInvoice(Invoice invoice) {
		if (listInvoice == null)
			listInvoice = new ArrayList<>();
		listInvoice.add(invoice);
	}

}
