package com.examly.springapp.controller;

import com.examly.springapp.entity.User;
import com.examly.springapp.exception.LoginException;
import com.examly.springapp.exception.SignupException;
import com.examly.springapp.service.UserService;
import com.examly.springapp.utility.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class SignupController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public User registerUser(@RequestBody User user) throws SignupException {
        String email = user.getEmail();
        if (email != null && !"".equals(email)) {
            User us = this.userService.getUserByEmailId(email);
            if (us != null) {
                throw new SignupException();
            }
        }
        User u = null;
        u = this.userService.saveUser(user);
        return u;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) throws LoginException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        } catch (Exception e) {
            throw new LoginException();
        }
        return jwtUtil.generateToken(user.getEmail());
    }

}
