package com.oninvoice.models.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oninvoice.models.daos.IUserApplicationDao;
import com.oninvoice.models.entities.RoleApplication;
import com.oninvoice.models.entities.UserApplication;

@Service("userService")
public class UserService implements UserDetailsService {
	@Autowired
	private IUserApplicationDao userApplicationDao;

	private Logger logger = LoggerFactory.getLogger(UserService.class);

	@Override
	@Transactional(readOnly=true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserApplication user = userApplicationDao.findByUsername(username);
		if (user == null) {
			logger.error("Error en el Login: no existe el usuario '" + username + "' en el sistema!");
			throw new UsernameNotFoundException("Username: " + username + " no existe en el sistema!");
		}
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

		for (RoleApplication role : user.getRoleList()) {
			logger.info("Role: ".concat(role.getAuthority()));
			authorities.add(new SimpleGrantedAuthority(role.getAuthority()));
		}

		if (authorities.isEmpty()) {
			logger.error("Error en el Login: Usuario '" + username + "' no tiene roles asignados!");
			throw new UsernameNotFoundException(
					"Error en el Login: usuario '" + username + "' no tiene roles asignados!");
		}

		return new User(user.getUsername(), user.getPassword(), user.getEnabled(), true, true, true, authorities);
	}

}
