package com.hexa.config;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {

	SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());

	public String generateToken(Authentication auth) {
		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
		String roles = populateAuthorities(authorities);

		String jwt = Jwts.builder().setIssuedAt(new Date()).setExpiration(new Date((new Date()).getTime() + 846000000)) // 10
																														// //
																														// days
				.claim("email", auth.getName()).claim("authorities", roles) // Add roles to claims
				.signWith(key).compact();

		return jwt;
	}

	public String getEmailFromToken(String jwt) {
		jwt = jwt.substring(7);

		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

		String email = String.valueOf(claims.get("email"));

		return email;
	}

	private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {

		Set<String> auths = new HashSet<>();

		for (GrantedAuthority authority : authorities) {
			auths.add(authority.getAuthority());
		}

		return String.join(",", auths);
	}

}

