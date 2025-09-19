package com.example.expensetracker.service;

import java.util.List;
import java.util.Optional;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.expensetracker.entity.ExpenseFolder;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.repository.ExpenseFolderRepository;
import com.example.expensetracker.repository.UserRepository;

@Service
public class ExpenseFolderService {
    private final ExpenseFolderRepository expenseFolderRepository;
    private final UserRepository userRepository;

    public ExpenseFolderService(ExpenseFolderRepository expenseFolderRepository, UserRepository userRepository) {
        this.expenseFolderRepository = expenseFolderRepository;
        this.userRepository = userRepository;
    }

    // Get all expense folders for a user
    public List<ExpenseFolder> getAllFolders(Integer userId) {
        // return expenseFolderRepository.findByUserId(userId);
        return expenseFolderRepository.findAllFoldersByUserId(userId);
    }

    // Add a new expense folder for a user
    public ExpenseFolder addExpenseFolder(Integer userId, String folderName, String folderDesc) {
        ExpenseFolder savedExpenseFolder = new ExpenseFolder();
        Optional<User> currentUser = userRepository.findById(userId);
        try {
            if (currentUser.isPresent()) {
                //expenseFolder.setUser(currentUser.get());
                // System.out.println("Folder name to be added: " + folderName);
                ExpenseFolder newFolder = new ExpenseFolder();
                newFolder.setUser(currentUser.get());
                newFolder.setFolderName(folderName);
                newFolder.setFolderDescription(folderDesc);
                savedExpenseFolder = expenseFolderRepository.save(newFolder);
            }
            else {
                throw new RuntimeException("User not found");
                //return ResponseEntity.notFound().build();
            }
        }
        catch(Exception e) {
            System.out.println("Java Error add new expense folder: " + e);
        }

        return savedExpenseFolder;
        //return ResponseEntity.status(HttpStatus.CREATED).body(savedExpenseFolder);
    }

    // edit a users expense folder
    public ExpenseFolder modifyExpenseFolder(Integer userId, Integer folderId, String folderName, String folderDesc) {
        Optional<ExpenseFolder> currentFolder = expenseFolderRepository.findById(folderId);
        Optional<User> currentUser = userRepository.findById(userId);
        ExpenseFolder savedFolder = new ExpenseFolder();

        try {
            if (currentUser.isPresent() && currentFolder.isPresent()) {
                ExpenseFolder folderToUpdate = foldertoModify(folderId, currentUser.get().getExpenseFolders());
                // ExpenseFolder folderToUpdate = currentFolder.get();
                folderToUpdate.setFolderName(folderName);
                folderToUpdate.setFolderDescription(folderDesc);
                savedFolder = expenseFolderRepository.save(folderToUpdate);
            }
            else {
                throw new RuntimeException("User not found or current folder does not exist or both don't exist");
                // return ResponseEntity.notFound().build();
            }
        }
        catch (Exception e) {
            System.out.println("Folder selected to be modified, does not exist");
        }
        
        return savedFolder;
        //return ResponseEntity.ok(savedFolder);
    }

    // delete a users expense folder
    public boolean deleteExpenseFolder(Integer userId, Integer folderId) {
        Optional<ExpenseFolder> currentFolder = expenseFolderRepository.findById(folderId);
        Optional<User> currentUser = userRepository.findById(userId);
        if (currentUser.isPresent() && currentFolder.isPresent() && currentFolder.get().getUser().getId().equals(userId)) {
            System.out.println("Deleting folder " + folderId + " for user " + userId);
            expenseFolderRepository.deleteById(folderId);
            return true;
        }
        return false;
    }

    private ExpenseFolder foldertoModify(Integer folderId, List<ExpenseFolder> folderList) {
        for (ExpenseFolder folder : folderList) {
            if (folder.getFolderId() == folderId) {
                return folder;
            }
        }

        return new ExpenseFolder();
    }
}
