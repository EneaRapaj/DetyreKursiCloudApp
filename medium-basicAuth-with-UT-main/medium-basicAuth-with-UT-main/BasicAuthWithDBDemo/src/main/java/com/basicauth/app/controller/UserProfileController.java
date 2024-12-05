package com.basicauth.app.controller;

import com.basicauth.app.entity.UserProfile;
import com.basicauth.app.entity.UserValidator;
import com.basicauth.app.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin ("*")
@RestController
@RequestMapping("/profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable("id") Long id) {
        UserProfile userProfile = userProfileService.getUserProfile(id);
        return ResponseEntity.ok(userProfile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUserProfile(@PathVariable("id") Long id, @RequestBody UserProfile userProfile) {

        // Validate fields using UserValidator
        if (!UserValidator.validateFirstName(userProfile.getName())) {
            return ResponseEntity.badRequest().body("Invalid first name.");
        }
        if (!UserValidator.validateLastName(userProfile.getSurname())) {
            return ResponseEntity.badRequest().body("Invalid last name.");
        }
        if (!UserValidator.validateLastName(userProfile.getAtesi())) {
            return ResponseEntity.badRequest().body("Invalid atesi name.");
        }
        if (!UserValidator.validatePhoneNumber(userProfile.getPhonenumber())) {
            return ResponseEntity.badRequest().body("Invalid phone number.");
        }
        if (!UserValidator.validateEmail(userProfile.getEmail())) {
            return ResponseEntity.badRequest().body("Invalid email format.");
        }

        // Only validate password if it is provided
        if (userProfile.getPassword() != null && !userProfile.getPassword().isEmpty()) {
            if (!UserValidator.validatePassword(userProfile.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid password format.");
            }
        } else {
            userProfile.setPassword(null);  // Let the service handle this condition
        }

        UserProfile updatedProfile = userProfileService.updateUserProfile(id, userProfile);
        if (updatedProfile != null) {
            return ResponseEntity.ok("UPDATE SUCCESS");
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUserProfile(@PathVariable Long id) {
        userProfileService.deleteUser(id);

          return ResponseEntity.ok("Delete success"); // returns 200 OK with message
    }
    }

