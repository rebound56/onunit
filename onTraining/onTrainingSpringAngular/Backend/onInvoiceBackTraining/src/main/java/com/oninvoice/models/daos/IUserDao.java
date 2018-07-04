package com.oninvoice.models.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.oninvoice.models.entities.User;

public interface IUserDao extends JpaRepository<User, Long> {
	@Query("SELECT u FROM User u JOIN FETCH u.roleList l WHERE u.username = :username")
	public User findByUsername(@Param("username") String username);
}
