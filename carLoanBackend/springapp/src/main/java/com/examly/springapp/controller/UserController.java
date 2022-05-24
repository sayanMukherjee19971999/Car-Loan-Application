package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.User;
import com.examly.springapp.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getProfile")
    public ResponseEntity<List<User>> viewProfile() {
        List<User> ls = userService.getAllUser();
        if (ls.size() <= 0) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(ls);
    }

    @GetMapping("/getProfile/{userId}")
    public ResponseEntity<User> viewProfile(@PathVariable("userId") int id) {
        User u = userService.getUserById(id);
        if (u != null) {
            return ResponseEntity.status(HttpStatus.OK).body(u);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/getCurrentUser")
    public ResponseEntity<User> getCurrentUser() {
        try {
            User u = userService.getCurrentUser();
            return ResponseEntity.status(HttpStatus.OK).body(u);
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addProfile")
    public ResponseEntity<User> addProfile(@RequestBody User user) {
        try {
            User u = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(u);
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/editProfile/{userId}")
    public ResponseEntity<String> editProfile(@RequestBody User user, @PathVariable("userId") int id) {
        try {
            userService.updateUser(user, id);
            return ResponseEntity.status(HttpStatus.CREATED).body("Updated Profile");
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("deleteProfile/{userId}")
    public ResponseEntity<String> deleteProfile(@PathVariable("userId") int id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted Profile");
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
