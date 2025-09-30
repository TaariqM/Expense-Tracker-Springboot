package com.example.expensetracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.exception.EmailAlreadyExistsException;

@Service
public class UserService {
    private final UserRepository userRepository;
    // private final int number = 2;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(Integer id) {
        Optional<User> currentUser = java.util.Optional.empty();
        try {
            currentUser = userRepository.findById(id);
            // System.out.println(number);
        }
        catch (Exception e) {
            System.out.println("Java Error at getting user: " + e);
        }
        
        return currentUser;
    }
    
    public ResponseEntity<?> loginUser(String email, String password) {
        if (userRepository.findByEmail(email) == null) { 
            // 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + email);
        }

        User user = userRepository.findByEmail(email);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            // 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password for email: " + email);
        }
        // if (!user.getPassword().equals(password)) {
        //     // 401 Unauthorized
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password for email: " + email);
        // }

        
        return ResponseEntity.ok(user);
    }

    public ResponseEntity<User> addUser(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new EmailAlreadyExistsException("Email already exists: " + user.getEmail());
        }
        
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        User newUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
