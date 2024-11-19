package com.hexa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {

	public Admin findByEmail(String email);

}