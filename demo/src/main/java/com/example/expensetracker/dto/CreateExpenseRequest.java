package com.example.expensetracker.dto;

public class CreateExpenseRequest {
    private String title;
    private Double amount;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getTitle() {
        return title;
    }

    public Double getAmount() {
        return amount;
    }
}
