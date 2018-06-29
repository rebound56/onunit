package com.oninvoice.models.api;

import com.oninvoice.models.entities.User;

public interface IUserApi {
	/**
	 * This method saves an user
	 * @param user
	 */
	public void save(User user);
}
