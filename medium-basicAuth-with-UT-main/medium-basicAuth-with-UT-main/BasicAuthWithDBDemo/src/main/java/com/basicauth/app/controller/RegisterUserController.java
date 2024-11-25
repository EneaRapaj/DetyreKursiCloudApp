package com.basicauth.app.controller;

import com.basicauth.app.entity.UserValidator;
import com.basicauth.app.enums.Role;
import com.basicauth.app.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basicauth.app.entity.UserProfile;
import com.basicauth.app.service.RegistrationService;

@CrossOrigin("*")
@RestController
public class RegisterUserController {

	@Autowired
	RegistrationService registerService;



	@PostMapping("/register")
	ResponseEntity<String> register(@RequestBody UserProfile user) {
		System.out.println("INSIDE");

		if (!UserValidator.validateFirstName(user.getName())) {
			return ResponseEntity.badRequest().body("Invalid first name");
		}
		if (!UserValidator.validateAtesia(user.getAtesi())) {
			return ResponseEntity.badRequest().body("Invalid atesia");
		}

		if (!UserValidator.validatePhoneNumber(user.getPhonenumber())) {
			return ResponseEntity.badRequest().body("Invalid  phonenumber");
		}
		if (!UserValidator.validateEmail(user.getEmail())) {
			return ResponseEntity.badRequest().body("Invalid  email");
		}

		if (!UserValidator.validateLastName(user.getSurname())) {
			return ResponseEntity.badRequest().body("Invalid  surname");
		}

		if (!UserValidator.validatePassword(user.getPassword())) {
			return ResponseEntity.badRequest().body("Invalid  password");
		}



		// Attempt to register the user
		if (registerService.registerUser(user)) {
			return ResponseEntity.ok("User created successfully");
		}

		return ResponseEntity.badRequest().body("Failed to create user");
	}



//	@GetMapping("/register")
//	ResponseEntity<String> register() {
//		System.out.println("INSIDE");
//		return ResponseEntity.badRequest().body("User created successfully");
//	}
}
