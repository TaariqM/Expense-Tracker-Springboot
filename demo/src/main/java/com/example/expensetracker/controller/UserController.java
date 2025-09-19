package com.example.expensetracker.controller;

import java.util.List;
// import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;

import com.example.expensetracker.dto.UserDTO;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.service.UserService;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend to communicate with Springboot backend
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Integer id) {
        return new UserDTO(userService.getUser(id).get());
        // return userService.getUser(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return userService.addUser(user);
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
}
