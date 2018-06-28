package com.oninvoice.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.assertj.core.util.Arrays;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.jackson2.SimpleGrantedAuthorityMixin;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oninvoice.models.entities.RoleApplication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

public class AuthorizationFilter extends BasicAuthenticationFilter {

	public AuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		String header = req.getHeader(SecurityConstants.HEADER_STRING);

		if (!requiresAuthentication(header)) {
			chain.doFilter(req, res);
			return;
		}
		
		
		boolean validToken = false;
		Claims token = null;
		try {
			String strToken = header.replace(SecurityConstants.TOKEN_PREFIX, "");
			token = Jwts.parser().setSigningKey(SecurityConstants.SECRET.getBytes())
					.parseClaimsJws(strToken).getBody();
			validToken=true;
			
		} catch (JwtException | IllegalArgumentException ex) {	
			logger.error("ERROR"+ex);
			validToken=false;
		}
		
		UsernamePasswordAuthenticationToken authentication = null;				
		if(validToken) {
			String username = token.getSubject();
			Object roles = token.get("authorities");
			
			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			RoleApplication[] listRole = new ObjectMapper().readValue(roles.toString().getBytes(), RoleApplication[].class);
			
			

			for (RoleApplication role : listRole) {				
				authorities.add(new SimpleGrantedAuthority(role.getAuthority()));
			}
				
			
			authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
		}
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);

	}

	protected boolean requiresAuthentication(String header) {
		if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX))
			return false;
		return true;
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(SecurityConstants.HEADER_STRING);
		if (token != null) {
			// parse the token.
			String user = Jwts.parser().setSigningKey(SecurityConstants.SECRET.getBytes())
					.parseClaimsJws(token.replace(SecurityConstants.TOKEN_PREFIX, "")).getBody().getSubject();

			if (user != null) {
				return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
			}
			return null;
		}
		return null;
	}
}
