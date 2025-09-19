package com.example.expensetracker.dto;

import java.time.LocalDate;

import com.example.expensetracker.entity.User;

public class UserDTO {
    private Integer userId;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate date;

    public UserDTO(User user) {
        this.userId = user.getId();
        this.firstName = user.getFirstname();
        this.lastName = user.getLastname();
        this.email = user.getEmail();
        this.date = user.getDate();
    }

    public Integer getUserId() { return userId; }
    public String getUserFirstName() { return firstName; }
    public String getUserLastName() { return lastName; }
    public String getUserEmail() { return email; }
    public LocalDate getUserCreationDate() { return date; }
}
