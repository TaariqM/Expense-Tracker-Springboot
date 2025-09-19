package com.example.expensetracker.repository;

// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.expensetracker.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    //List<Expense> findByExpenseFolderId(Integer folderId);
}
