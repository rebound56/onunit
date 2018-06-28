package com.oninvoice.models.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oninvoice.models.entities.UserApplication;

public interface IUserApplicationDao extends JpaRepository<UserApplication, Long> {
	public UserApplication findByUsername(String username);
}
