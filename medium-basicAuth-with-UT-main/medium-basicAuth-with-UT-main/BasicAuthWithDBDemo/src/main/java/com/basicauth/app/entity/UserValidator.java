package com.basicauth.app.entity;

import java.util.regex.*;
public class UserValidator {

    private static final String NAME_REGEX = "^[a-zA-Z]{1,20}$";
    private static final String PHONE_REGEX = "^\\+355\\d{9}$";
    private static final String DATE_OF_BIRTH_PATTERN = "^\\d{4}-\\d{2}-\\d{2}$";

    private static final String EMAIL_REGEX = "^(?!.*?@[\\w.]+(?:\\.[a-zA-Z]{2,}){2,})(?:[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*(?:\\.[a-zA-Z]{2,7}))$";
    private static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!?])(?=\\S+$).{8,}$";

    public static boolean validateFirstName(String firstName) {
        return Pattern.matches(NAME_REGEX, firstName);
    }

    public static boolean validateAtesia(String firstName) {
        return Pattern.matches(NAME_REGEX, firstName);
    }

    public static boolean validateLastName(String lastName) {
        return Pattern.matches(NAME_REGEX, lastName);
    }

    public static boolean validatePhoneNumber(String phoneNumber) {
        return Pattern.matches(PHONE_REGEX, phoneNumber);
    }

    public static boolean validateDateOfBirth(String dateOfBirth) {
        boolean isMatch = dateOfBirth != null && dateOfBirth.matches(DATE_OF_BIRTH_PATTERN);
        System.out.println("Pattern match result for " + dateOfBirth + ": " + isMatch);
        return isMatch;
    }

    public static boolean validateEmail(String email) {
        return Pattern.matches(EMAIL_REGEX, email);
    }

    public static boolean validatePassword(String password) {
        return Pattern.matches(PASSWORD_REGEX, password);
    }
}
