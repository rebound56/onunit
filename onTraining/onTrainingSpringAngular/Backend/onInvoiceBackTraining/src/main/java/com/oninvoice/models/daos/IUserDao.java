package com.oninvoice.models.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oninvoice.models.entities.User;

public interface IUserDao extends JpaRepository<User, Long> {

}
