package com.oninvoice.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oninvoice.models.api.IJwtApi;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	/** It allows to authenticate */
	private AuthenticationManager authenticationManager;
	private IJwtApi jwtService;

	public AuthenticationFilter(AuthenticationManager authenticationManager, IJwtApi jwtService) {
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
		setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(SecurityConstants.LOGIN_URL, "POST"));
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		String username = obtainUsername(request);
		String password = obtainPassword(request);

		if (username == null || password == null) {
			try {
				com.oninvoice.models.entities.User user = new ObjectMapper().readValue(request.getInputStream(),
						com.oninvoice.models.entities.User.class);
				if (user != null) {
					username = user.getUsername();
					password = user.getPassword();
				}

			} catch (IOException e) {				
				logger.error("Error to try parse json to user", e);
			}
		}

		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
		return this.authenticationManager.authenticate(authToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authentication) throws IOException, ServletException {

		String token = this.jwtService.create(authentication);

		String username = ((User) authentication.getPrincipal()).getUsername();

		response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
		Map<String, Object> body = new HashMap<String, Object>();
		body.put("token", token);
		body.put("user", username);
		body.put("message", String.format("Hello %s has logged up!", username));

		response.getWriter().write(new ObjectMapper().writeValueAsString(body));
		response.setStatus(200);
		response.setContentType("application/json");
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {

		Map<String, Object> body = new HashMap<String, Object>();
		body.put("message", "Username or password incorrect");
		body.put("error", failed.getMessage());

		response.getWriter().write(new ObjectMapper().writeValueAsString(body));
		response.setStatus(401);
		response.setContentType("application/json");
	}

}
