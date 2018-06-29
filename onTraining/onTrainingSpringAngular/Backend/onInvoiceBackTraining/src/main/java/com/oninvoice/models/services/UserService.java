package com.oninvoice.models.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oninvoice.models.api.IUserApi;
import com.oninvoice.models.daos.IUserDao;
import com.oninvoice.models.entities.Role;
import com.oninvoice.models.entities.User;

@Service("userService")
public class UserService implements UserDetailsService, IUserApi {
	@Autowired
	private IUserDao userDao;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userDao.findByUsername(username);

		if (user == null)
			throw new UsernameNotFoundException("Username " + username + " does not exist in the system");

		if (user.getRoleList() == null || user.getRoleList().size() == 0)
			throw new UsernameNotFoundException("Username '" + username + "' does not have roles");

		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (Role role : user.getRoleList())
			authorities.add(new SimpleGrantedAuthority(role.getAuthority()));

		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				user.getEnabled(), true, true, true, authorities);
	}

	@Override
	@Transactional
	public void save(User user) {
		this.userDao.save(user);
	}

}
