package com.basicauth.app.controller;

import com.basicauth.app.entity.LoginCreds;
import com.basicauth.app.service.UserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@CrossOrigin("*")
@RestController
public class LoginController {

    private final UserDetail userDetail;

    @Autowired
    public LoginController(UserDetail userDetail) {
        this.userDetail = userDetail;
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginCreds loginCreds) {
//
//
//        try {
//            // Attempt to load user by email
//            UserDetails userDetails = userDetail.loadUserByUsername(loginCreds.getEmail());
//
//
//            // Check if the password matches
//            if (new BCryptPasswordEncoder().matches(loginCreds.getPassword(), userDetails.getPassword())) {
//                Long userId = userDetail.getUserIdByEmail(loginCreds.getEmail());
//                return ResponseEntity.ok("Login successful!");
//            } else {
//                return ResponseEntity.status(401).body("Login failed: Incorrect password");
//            }
//        } catch (UsernameNotFoundException e) {
//            // If the email does not exist, return 401 with a clear message
//            return ResponseEntity.status(401).body("Login failed: Invalid email or password");
//        }
//    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginCreds loginCreds) {
        try {
            // Load user by email
            UserDetails userDetails = userDetail.loadUserByUsername(loginCreds.getEmail());

            // Check if the password matches
            if (new BCryptPasswordEncoder().matches(loginCreds.getPassword(), userDetails.getPassword())) {
                // Assuming `userDetail` has a method to get the userId
                Long userId = userDetail.getUserIdByEmail(loginCreds.getEmail());
                return ResponseEntity.ok(Map.of("message", "Login successful!", "userId", userId));
            } else {
                return ResponseEntity.status(401).body("Login failed: Incorrect password");
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(401).body("Login failed: Invalid email or password");
        }
    }




}

