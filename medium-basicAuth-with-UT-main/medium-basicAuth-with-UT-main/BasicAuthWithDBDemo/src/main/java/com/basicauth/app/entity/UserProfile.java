package com.basicauth.app.entity;

import com.basicauth.app.enums.Role;

import jakarta.persistence.*;
import lombok.Data;



@Entity
@Data
public class UserProfile {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	private String atesi;
	private String surname;
	private String email;
	private String phonenumber;
	private String password;


	
	//ROLE will be stored as String in DB
	@Enumerated(EnumType.STRING)
	private Role role;



	
}
