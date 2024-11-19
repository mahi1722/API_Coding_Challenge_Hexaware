package com.hexa.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.dto.AuthResponse;
import com.hexa.dto.LoginDTO;
import com.hexa.dto.SignUpDTO;
import com.hexa.enums.USER_ROLE;
import com.hexa.service.AdminService;



@RestController
@RequestMapping("/api/user")
public class AdminController {

	@Autowired
	AdminService authService;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignUpDTO req) throws Exception {

		String jwt = authService.createUser(req);
		AuthResponse authResponse = new AuthResponse();

		authResponse.setJwt(jwt);
		authResponse.setMessage("Register successful!");
		authResponse.setRole(USER_ROLE.ROLE_ADMIN);
		return ResponseEntity.ok(authResponse);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginDTO loginRequest) throws Exception {
		AuthResponse authResponse = authService.loginUser(loginRequest);
		return ResponseEntity.ok(authResponse);
	}

}


