package com.example.expensetracker.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.expensetracker.dto.CreateFolderRequest;
import com.example.expensetracker.dto.ExpenseFolderDTO;
import com.example.expensetracker.dto.UpdateFolderRequest;
import com.example.expensetracker.entity.ExpenseFolder;
import com.example.expensetracker.service.ExpenseFolderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/users/{userId}/expenseFolders")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseFolderController {
    private final ExpenseFolderService expenseFolderService;

    public ExpenseFolderController(ExpenseFolderService expenseFolderService) {
        this.expenseFolderService = expenseFolderService;
    }

    @GetMapping
    public List<ExpenseFolderDTO> getExpenseFolders(@PathVariable Integer userId) {
        List<ExpenseFolderDTO> result = new ArrayList<>();

        for (ExpenseFolder folder : expenseFolderService.getAllFolders(userId)) {
            result.add(new ExpenseFolderDTO(folder));
        }

        return result;
        // return expenseFolderService.getAllFolders(userId);
    }

    @PostMapping
    public ExpenseFolderDTO createExpenseFolder(@PathVariable Integer userId, @RequestBody CreateFolderRequest request) {
        ExpenseFolder folder = expenseFolderService.addExpenseFolder(userId, request.getFolderName(), request.getFolderDescription());
        return new ExpenseFolderDTO(folder);
        // return expenseFolderService.addExpenseFolder(userId, request.getFolderName());
    }
    
    @PutMapping("/{folderId}")
    public ExpenseFolderDTO modifyExpenseFolder(@PathVariable Integer userId, @PathVariable Integer folderId, @RequestBody UpdateFolderRequest request) {
        ExpenseFolder folder = expenseFolderService.modifyExpenseFolder(userId, folderId, request.getFolderName(), request.getFolderDescription());
        return new ExpenseFolderDTO(folder);
        // return expenseFolderService.modifyExpenseFolder(userId, folderId, request.getFolderName());
    }

    @DeleteMapping("/{folderId}")
    public ResponseEntity<Void> deleteExpenseFolder(@PathVariable Integer  userId, @PathVariable Integer folderId) {
        boolean deleted = expenseFolderService.deleteExpenseFolder(userId, folderId);
        //return deleted;
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
