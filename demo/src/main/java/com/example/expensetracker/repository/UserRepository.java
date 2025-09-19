package com.example.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.expensetracker.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
    
}
