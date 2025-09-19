package com.example.expensetracker.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class ExpenseFolder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer folderId;

    @ManyToOne
    @JoinColumn(name = "userId") // foreign key to User table
    private User user;

    // @JoinColumn(name = "expenseId")
    @OneToMany(mappedBy = "expenseFolder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses = new ArrayList<>();

    private String folderName;
    private String folderDescription;

    // Setters

    public void setFolderId(Integer folderId) {
        this.folderId = folderId;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public void setFolderDescription(String folderDescription) {
        this.folderDescription = folderDescription;
    }

    public void setExpenses(List<Expense> expenses) {
        this.expenses = expenses;
    }

    // Getters

    public Integer getFolderId() {
        return folderId;
    }

    public User getUser() {
        return user;
    }

    public String getFolderName() {
        return folderName;
    }

    public String getFolderDescription() {
        return folderDescription;
    }

    public List<Expense> getExpenses() {
        return expenses;
    }

    // helper methods
    public void addExpense(Expense expense) {
        expenses.add(expense);
        expense.setExpenseFolder(this);
    }

    public void removeExpense(Expense expense) {
        expenses.remove(expense);
        expense.setExpenseFolder(null);
    }
}
