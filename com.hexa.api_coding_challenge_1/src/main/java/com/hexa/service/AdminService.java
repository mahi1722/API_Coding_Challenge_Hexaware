package com.hexa.service;

import com.hexa.dto.AuthResponse;
import com.hexa.dto.LoginDTO;
import com.hexa.dto.SignUpDTO;

public interface AdminService {

	String createUser(SignUpDTO signUpRequest);

	AuthResponse loginUser(LoginDTO loginRequest);

}