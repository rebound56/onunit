package com.ondiscover.models.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Locale;

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
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "person")
public class Person implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1287699149355418689L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "name")
	@NotEmpty
	@Size(max = 150)
	@NotNull
	private String name;

	@Column(name = "last_name")
	@NotEmpty
	@Size(max = 200)
	@NotNull
	private String lastName;

	@Column(name = "email")
	@NotEmpty
	@Size(max = 150)
	@Email
	@NotNull
	private String email;

	@Column(name = "number_document")
	@Size(max = 20, min = 3)
	@NotEmpty
	@NotNull
	private String numberDocument;

	@Column(name = "gender")
	@NotEmpty
	private String gender;

	@Column(name = "birth_date")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date birthDate;

	private String photo;

	@Column(name = "issue_date")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date issueDate;

	@Column(name = "created_at")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date createdAt;

	@Column(name = "modified_at")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date modifiedAt;

	public Person() {
		super();
	}

	@PrePersist
	public void prePersist() {
		this.createdAt = new Date();
		this.modifiedAt = new Date();
	}

	@PreUpdate
	public void preUpdate() {
		this.modifiedAt = new Date();
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

	@Override
	public String toString() {
		return "Person [id=" + id + ", name=" + name + ", lastName=" + lastName + ", email=" + email
				+ ", numberDocument=" + numberDocument + ", gender=" + gender + ", birthDate=" + birthDate
				+ ", issueDate=" + issueDate + ", createdAt=" + createdAt + ", modifiedAt=" + modifiedAt + "]";
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

	public String getNumberDocument() {
		return numberDocument;
	}

	public void setNumberDocument(String numberDocument) {
		this.numberDocument = numberDocument;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

}
