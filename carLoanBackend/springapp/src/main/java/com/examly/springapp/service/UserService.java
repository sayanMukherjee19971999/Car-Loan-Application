package com.examly.springapp.service;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public User getCurrentUser() {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.getUserByEmail(email);
	}

    public User saveUser(User user) {
        return this.userRepo.save(user);
    }

    public User getUserByEmailId(String email) {
        return this.userRepo.getUserByEmail(email);
    }

    public User getUserByEmailIdAndPassword(String email, String password) {
        return this.userRepo.findByEmailAndPassword(email, password);
    }

    public User getUserById(int id) {
        return this.userRepo.findUserById(id);
    }

    public List<User> getAllUser() {
        return this.userRepo.findAll();
    }

    public void updateUser(User user, int id) {
        user.setId(id);
        userRepo.save(user);
    }

    public void deleteUser(int id) {
        this.userRepo.deleteById(id);
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }
}


