package com.example.expensetracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.expensetracker.dto.CreateExpenseRequest;
import com.example.expensetracker.dto.ExpenseDTO;
// import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.service.ExpenseFolderService;
import com.example.expensetracker.service.ExpenseService;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/users/{userId}/expenseFolders/{folderId}/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {
    private final ExpenseService expenseService;
    // private final ExpenseFolderService expenseFolderService;

    public ExpenseController(ExpenseService expenseService, ExpenseFolderService expenseFolderService) {
        this.expenseService = expenseService;
        // this.expenseFolderService = expenseFolderService;
    }

    @GetMapping
    public List<ExpenseDTO> getAllExpenses(@PathVariable Integer folderId) {
        return expenseService.getAllExpensesForFolder(folderId);
    }

    @PostMapping
    public ExpenseDTO addExpense(@PathVariable Integer userId, @PathVariable Integer folderId, @RequestBody CreateExpenseRequest request) {
        return expenseService.addExpense(userId, folderId, request.getTitle(), request.getAmount());
    }

    @PutMapping("/{expenseId}")
    public ExpenseDTO updateExpense(@PathVariable Integer folderId, @PathVariable Integer expenseId, @RequestBody CreateExpenseRequest request) {
        return expenseService.updateExpense(folderId, expenseId, request.getTitle(), request.getAmount());
    }

    @DeleteMapping("/{expenseId}")
    public Boolean deleteExpense(@PathVariable Integer folderId, @PathVariable Integer expenseId) {
        return expenseService.deleteExpense(folderId, expenseId);
    }
}
