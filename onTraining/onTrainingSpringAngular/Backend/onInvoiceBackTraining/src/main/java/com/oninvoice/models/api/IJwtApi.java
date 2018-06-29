package com.oninvoice.models.api;

import java.io.IOException;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.jsonwebtoken.Claims;

public interface IJwtApi {
	/**
	 * This method creates a token from authentication
	 * 
	 * @param authentication
	 * @return
	 * @throws JsonProcessingException 
	 */
	public String create(Authentication authentication) throws JsonProcessingException;

	/**
	 * This method validates if token is valid
	 * 
	 * @param token
	 * @return
	 */
	public boolean validate(String token);

	/**
	 * This method get claims from token
	 * 
	 * @param token
	 * @return
	 */
	public Claims getClaims(String token);

	/**
	 * This method get username from token
	 * 
	 * @param token
	 * @return
	 */
	public String getUsername(String token);

	/**
	 * This method get list of authorities from token
	 * 
	 * @param token
	 * @return
	 * @throws IOException 
	 */
	public List<GrantedAuthority> getAuthorities(String token) throws IOException;

	/**
	 * This method resolves token
	 * 
	 * @param token
	 * @return
	 */
	public String resolve(String token);
}
