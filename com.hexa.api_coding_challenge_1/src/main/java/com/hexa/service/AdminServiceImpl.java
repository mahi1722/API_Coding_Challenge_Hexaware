package com.hexa.service;



import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexa.config.JwtProvider;
import com.hexa.dto.AuthResponse;
import com.hexa.dto.LoginDTO;
import com.hexa.dto.SignUpDTO;
import com.hexa.entity.Admin;
import com.hexa.enums.USER_ROLE;
import com.hexa.repository.AdminRepository;



@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private CustomUserServiceImpl customUserServiceImpl;

	@Override
	public String createUser(SignUpDTO req) {
		Admin user = adminRepository.findByEmail(req.getEmail());

		if (user == null) {
			Admin createdUser = new Admin();
			createdUser.setEmail(req.getEmail());
			createdUser.setRole(USER_ROLE.ROLE_ADMIN);
			createdUser.setPassword(passwordEncoder.encode(req.getPassword()));

			user = adminRepository.save(createdUser);

			}

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_" + USER_ROLE.ROLE_ADMIN.toString()));

		Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		return jwtProvider.generateToken(authentication);
	}

	@Override
	public AuthResponse loginUser(LoginDTO req) {
		String email = req.getEmail();
		String password = req.getPassword();

		Authentication authentication = authenticate(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Login successful!");

		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String roleName = authorities.iterator().next().getAuthority();

		authResponse.setRole(USER_ROLE.valueOf(roleName));

		return authResponse;
	}

	private Authentication authenticate(String email, String password) {
		UserDetails userDetails = customUserServiceImpl.loadUserByUsername(email);
		if (userDetails == null) {
			throw new BadCredentialsException("User not found");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password.....");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

	}

}

