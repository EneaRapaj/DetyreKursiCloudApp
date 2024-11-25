package com.basicauth.app.entity;

import com.basicauth.app.enums.Role;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;


@Entity
@Data
public class UserProfile {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	private String atesi;
	private String surname;

	@Column(unique = true, nullable = false) // Enforce unique and non-null constraint
	private String email;
	private String phonenumber;
	private String password;

	private LocalDate dateOfBirth;

	//ROLE will be stored as String in DB
	@Enumerated(EnumType.STRING)
	private Role role;



	
}
