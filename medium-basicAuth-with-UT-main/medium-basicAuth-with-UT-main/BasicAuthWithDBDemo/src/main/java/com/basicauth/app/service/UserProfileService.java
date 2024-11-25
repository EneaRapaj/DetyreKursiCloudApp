package com.basicauth.app.service;

import com.basicauth.app.entity.UserProfile;
import com.basicauth.app.enums.Role;
import com.basicauth.app.repository.RegisterNewUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProfileService {

    @Autowired
    private RegisterNewUserRepository registerNewUserRepository;

    @Autowired
    private PasswordEncoder pwdEncoder;

    public UserProfile getUserProfile(Long id) {
        return registerNewUserRepository.findById(id).orElse(null);
    }

    public UserProfile updateUserProfile(Long id, UserProfile userProfile) {
        UserProfile existingProfile = registerNewUserRepository.findById(id).orElse(null);
        if (existingProfile != null) {
            // Update the existing profile with the new data
            existingProfile.setName(userProfile.getName());
            existingProfile.setEmail(userProfile.getEmail());
            existingProfile.setSurname(userProfile.getSurname());
            existingProfile.setAtesi(userProfile.getAtesi());
            existingProfile.setPassword(pwdEncoder.encode(userProfile.getPassword()));
            existingProfile.setPhonenumber(userProfile.getPhonenumber());
            // Update other fields as needed
            // Save the updated profile
            return registerNewUserRepository.save(existingProfile);
        } else {
            return null; // Or throw an exception indicating the user profile was not found
        }
    }
    public void deleteUser(Long id) {
        if (registerNewUserRepository.existsById(id)) {
            registerNewUserRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("User not found with id: " + id);
        }
    }


    public List<UserProfile> getAllUsers() {
         return registerNewUserRepository.findByRole(Role.ROLE_USER);
    }
}

