package com.examly.springapp.exception;
public class LoginException extends Exception {
    public LoginException() {
        super("Invalid Username or Password !!");
    }
}
