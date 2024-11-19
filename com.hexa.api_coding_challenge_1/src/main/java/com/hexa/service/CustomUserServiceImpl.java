package com.hexa.service;


import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hexa.entity.Admin;
import com.hexa.enums.USER_ROLE;
import com.hexa.repository.AdminRepository;





@Service
public class CustomUserServiceImpl implements UserDetailsService {

	@Autowired
	private AdminRepository adminRepository;
	
	private static final String ADMIN_PREFIX = "admin_";

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		if (username.startsWith(ADMIN_PREFIX)) {
			String actualUsername = username.substring(ADMIN_PREFIX.length());
			Admin ad = adminRepository.findByEmail(actualUsername);

			if (ad != null) {
				return buildUserDetails(ad.getEmail(), ad.getPassword(), ad.getRole());
			}

		} else {
			Admin user = adminRepository.findByEmail(username);

			if (user != null) {
				return buildUserDetails(user.getEmail(), user.getPassword(), user.getRole());
			}
		}

		throw new UsernameNotFoundException("User not found with username: " + username);
	}

	private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {
		if (role == null) {
			role = USER_ROLE.ROLE_ADMIN;
		}
		List<GrantedAuthority> authorityList = new ArrayList<>();
		authorityList.add(new SimpleGrantedAuthority(role.toString()));
		return new org.springframework.security.core.userdetails.User(email, password, authorityList);

	}

}
