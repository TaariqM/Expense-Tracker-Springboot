package com.example.expensetracker.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer expenseId;

    @ManyToOne
    @JoinColumn(name = "folderId")
    private ExpenseFolder expenseFolder; // foreign key for expense folder

    private String title;
    private Double amount;
    private LocalDate date;

    @PrePersist
    private void onCreate() {
        this.date = LocalDate.now();
    }

    // Setters
    public void setExpenseId(Integer expenseId) {
        this.expenseId = expenseId;
    }

    public void setExpenseFolder(ExpenseFolder expenseFolder) {
        this.expenseFolder = expenseFolder;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    // Getters
    public Integer getExpenseId() {
        return expenseId;
    }

    public ExpenseFolder getExpenseFolder() {
        return expenseFolder;
    }

    public String getTitle() {
        return title;
    }

    public Double getAmount() {
        return amount;
    }

    public LocalDate getDate() {
        return date;
    }
}
