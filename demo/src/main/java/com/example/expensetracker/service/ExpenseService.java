package com.example.expensetracker.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.expensetracker.dto.ExpenseDTO;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.ExpenseFolder;
import com.example.expensetracker.repository.ExpenseFolderRepository;
import com.example.expensetracker.repository.ExpenseRepository;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final ExpenseFolderRepository expenseFolderRepository;

    public ExpenseService(ExpenseRepository expenseRepository, ExpenseFolderRepository expenseFolderRepository) {
        this.expenseRepository = expenseRepository;
        this.expenseFolderRepository = expenseFolderRepository;
    }

    public List<ExpenseDTO> getAllExpensesForFolder(Integer folderId) {
        // List<ExpenseDTO> result = new ArrayList<>();
        // List<Expense> expenses = expenseRepository.findByExpenseFolderId(folderId);
        // for (Expense exp : expenses) {
        //     result.add(new ExpenseDTO(exp));
        // }

        // return result;
        Optional<ExpenseFolder> currentFolder = expenseFolderRepository.findById(folderId);
        if (currentFolder.isPresent()) {
            return fetchExpenses(currentFolder.get().getExpenses());
        }
        else {
            throw new RuntimeException("Folder not found");
        }
    }

    public ExpenseDTO addExpense(Integer userId, Integer folderId, String title, Double amount) {
        // Optional<User> currentUser = userRepository.findById(userId);
        Optional<ExpenseFolder> currentFolder = expenseFolderRepository.findById(folderId);
        Expense newExpense = new Expense();
        newExpense.setTitle(title);
        newExpense.setAmount(amount);
        // newExpense.setExpenseFolder(currentFolder.get());
        currentFolder.get().addExpense(newExpense);

        // expenseFolderRepository.save(currentFolder.get());
        Expense savedExpense = expenseRepository.save(newExpense);
        return new ExpenseDTO(savedExpense);
    }

    public ExpenseDTO updateExpense(Integer folderId, Integer expenseId, String title, Double amount) {
        Optional<ExpenseFolder> currentFolder = expenseFolderRepository.findById(folderId);
        Optional<Expense> currentExpense = expenseRepository.findById(expenseId);

        if (currentFolder.isPresent() && currentExpense.isPresent() && currentExpense.get().getExpenseFolder().getFolderId().equals(folderId)) {
            currentExpense.get().setTitle(title);
            currentExpense.get().setAmount(amount);
        }
        else {
            throw new RuntimeException("Either the folder or expense does not exist, or the expense does not exist in this folder");
        }

        Expense updatedExpense = expenseRepository.save(currentExpense.get());
        return new ExpenseDTO(updatedExpense);
    }

    public boolean deleteExpense(Integer folderId, Integer expenseId) {
        Optional<ExpenseFolder> currentFolder = expenseFolderRepository.findById(folderId);
        Optional<Expense> currentExpense = expenseRepository.findById(expenseId);

        if (currentFolder.isPresent() && currentExpense.isPresent() && currentExpense.get().getExpenseFolder().getFolderId().equals(folderId)) {
            expenseRepository.delete(currentExpense.get());
        }
        else {
            throw new RuntimeException("Either the folder or expense does not exist, or the expense does not exist in this folder");
        }

        return true;
    }

    private List<ExpenseDTO> fetchExpenses(List<Expense> expenses) {
        List<ExpenseDTO> result = new ArrayList<>();

        for (Expense exp : expenses) {
            result.add(new ExpenseDTO(exp));
        }

        return result;
    }
}
