package com.examly.springapp.exception;
public class SignupException extends Exception {
    public SignupException() {
        super("Same Email Id already exists !! Please Login");
    }
}