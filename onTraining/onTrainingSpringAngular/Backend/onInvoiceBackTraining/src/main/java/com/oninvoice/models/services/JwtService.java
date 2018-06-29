package com.oninvoice.models.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oninvoice.models.api.IJwtApi;
import com.oninvoice.models.entities.Role;
import com.oninvoice.security.SecurityConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService implements IJwtApi {

	@Override
	public String create(Authentication authentication) throws JsonProcessingException {

		String username = ((User) authentication.getPrincipal()).getUsername();
		Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();
		Claims claims = Jwts.claims();
		claims.put("authorities", new ObjectMapper().writeValueAsString(roles));
		claims.setSubject(username);

		return Jwts.builder().setIssuedAt(new Date()).setClaims(claims)
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET.getBytes()).compact();
	}

	@Override
	public boolean validate(String token) {
		try {
			getClaims(token);
			return true;
		} catch (JwtException | IllegalArgumentException ex) {
			return false;
		}
	}

	@Override
	public Claims getClaims(String token) {
		return Jwts.parser().setSigningKey(SecurityConstants.SECRET.getBytes())
				.parseClaimsJws(resolve(token)).getBody();
	}

	@Override
	public String getUsername(String token) {
		return getClaims(token).getSubject();
	}

	@Override
	public List<GrantedAuthority> getAuthorities(String strToken) throws IOException {
		Claims token = getClaims(strToken);
		Object roles = token.get("authorities");
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		Role[] listRole = new ObjectMapper().readValue(roles.toString().getBytes(), Role[].class);
		if (listRole != null) {
			for (Role role : listRole) {
				authorities.add(new SimpleGrantedAuthority(role.getAuthority()));
			}
		}
		return authorities;
	}

	@Override
	public String resolve(String token) {
		if (token != null && token.startsWith(SecurityConstants.TOKEN_PREFIX))
			return token.replace(SecurityConstants.TOKEN_PREFIX, "");
		return null;
	}

}
