package com.example.expensetracker.dto;

import java.time.LocalDate;

import com.example.expensetracker.entity.Expense;

public class ExpenseDTO {
    private Integer expenseId;
    private String title;
    private Double amount;
    private LocalDate date;

    public ExpenseDTO(Expense expense) {
        this.expenseId = expense.getExpenseId();
        this.title = expense.getTitle();
        this.amount = expense.getAmount();
        this.date = expense.getDate();
    }

    public Integer getExpenseId() { return expenseId; }
    public String getTitle() { return title; }
    public Double getAmount() { return amount; }
    public LocalDate getDate() { return date; }
}
