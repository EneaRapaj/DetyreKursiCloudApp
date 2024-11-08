package com.basicauth.app.controller;


import com.basicauth.app.entity.UserValidator;
import com.basicauth.app.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.basicauth.app.entity.UserProfile;
import com.basicauth.app.service.RegistrationService;

import java.util.List;

@CrossOrigin ("*")
@RestController
public class RegisterAdminController {

	@Autowired
	RegistrationService registerService;

	@Autowired
	UserProfileService userProfileService;

	@PostMapping("/register-admin")
	ResponseEntity<String> register(@RequestBody UserProfile admin) {

		if (!UserValidator.validateFirstName(admin.getName())) {
			return ResponseEntity.badRequest().body("Invalid first name");
		}
		if (!UserValidator.validateAtesia(admin.getAtesi())) {
			return ResponseEntity.badRequest().body("Invalid atesia");
		}

		if (!UserValidator.validatePhoneNumber(admin.getPhonenumber())) {
			return ResponseEntity.badRequest().body("Invalid  phonenumber");
		}
		if (!UserValidator.validateEmail(admin.getEmail())) {
			return ResponseEntity.badRequest().body("Invalid  email");
		}

		if (!UserValidator.validateLastName(admin.getSurname())) {
			return ResponseEntity.badRequest().body("Invalid  surname");
		}

		if (!UserValidator.validatePassword(admin.getPassword())) {
			return ResponseEntity.badRequest().body("Invalid  password");
		}

		if( registerService.registerAdmin(admin)) {
			return ResponseEntity.ok("Admin created successfully");
		}
		return ResponseEntity.badRequest().body("Admin already exists");
	}

	@GetMapping("/users")
	public ResponseEntity<List<UserProfile>> getAllUsers() {
		List<UserProfile> users = userProfileService.getAllUsers();
		return ResponseEntity.ok(users);
	}

}
