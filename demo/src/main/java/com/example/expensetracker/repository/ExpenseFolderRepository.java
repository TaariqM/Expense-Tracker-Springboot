package com.example.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.expensetracker.entity.ExpenseFolder;
import java.util.List;


public interface ExpenseFolderRepository extends JpaRepository<ExpenseFolder, Integer>{
    // List<ExpenseFolder> findByUserId(Integer userId);
    List<ExpenseFolder> findAllFoldersByUserId(Integer userId);
} 
