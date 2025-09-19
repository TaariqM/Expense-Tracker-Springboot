package com.example.expensetracker.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
// import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id // sets id as the primary key for this table
    @GeneratedValue(strategy = GenerationType.IDENTITY) // every time a new entry is added to this table, it automatically increments the id
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private LocalDate date;

    @OneToMany(mappedBy = "user")
    private List<ExpenseFolder> expenseFolders;

    @PrePersist
    private void onCreate() {
        this.date = LocalDate.now();
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }
    
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setExpenseFolders(List<ExpenseFolder> expenseFolders) {
        this.expenseFolders = expenseFolders;
    }

    // public void setDate(LocalDate date) {
    //     this.date = date.now();
    // }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public LocalDate getDate() {
        return date;
    }

    public List<ExpenseFolder> getExpenseFolders() {
        return expenseFolders;
    }
}
