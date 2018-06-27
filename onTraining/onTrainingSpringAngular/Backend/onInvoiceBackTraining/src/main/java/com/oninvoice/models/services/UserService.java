package com.oninvoice.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oninvoice.models.api.IUserApi;
import com.oninvoice.models.daos.IUserDao;
import com.oninvoice.models.entities.User;

@Service
public class UserService implements IUserApi {
	@Autowired
	private IUserDao userDao;

	@Override
	public void save(User user) {
		this.userDao.save(user);
	}
}
