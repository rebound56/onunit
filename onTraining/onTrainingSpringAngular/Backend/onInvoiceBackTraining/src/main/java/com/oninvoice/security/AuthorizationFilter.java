package com.oninvoice.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.oninvoice.models.api.IJwtApi;

public class AuthorizationFilter extends BasicAuthenticationFilter {

	private IJwtApi jwtService;

	public AuthorizationFilter(AuthenticationManager authenticationManager, IJwtApi jwtService) {
		super(authenticationManager);
		this.jwtService = jwtService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		
		String header = req.getHeader(SecurityConstants.HEADER_STRING);
		if (!requiresAuthentication(header)) {
			chain.doFilter(req, res);
			return;
		}
		
		UsernamePasswordAuthenticationToken authentication = null;
		if (this.jwtService.validate(header))
			authentication = new UsernamePasswordAuthenticationToken(this.jwtService.getAuthorities(header), null,
					this.jwtService.getAuthorities(header));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);

	}

	protected boolean requiresAuthentication(String header) {
		if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX))
			return false;
		return true;
	}
}
