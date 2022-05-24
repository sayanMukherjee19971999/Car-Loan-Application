package com.examly.springapp.exception;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestControllerAdvice
public class MyExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> myMessage(CustomException c) {
        return new ResponseEntity<>(c.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<Object> myMessage(LoginException l) {
        return new ResponseEntity<>(l.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(SignupException.class)
    public ResponseEntity<Object> myMessage(SignupException s) {
        return new ResponseEntity<>(s.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
