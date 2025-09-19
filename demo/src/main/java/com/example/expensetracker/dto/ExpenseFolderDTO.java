package com.example.expensetracker.dto;

import com.example.expensetracker.entity.ExpenseFolder;

public class ExpenseFolderDTO {
    private Integer folderId;
    private String folderName;
    private String folderDesc;

    public ExpenseFolderDTO(ExpenseFolder folder) {
        this.folderId = folder.getFolderId();
        this.folderName = folder.getFolderName();
        this.folderDesc = folder.getFolderDescription();
    }

    public Integer getExpenseFolderId() {
        return folderId;
    } 

    public String getExpenseFolderName() {
        return folderName;
    }

    public String getExpenseFolderDesc() {
        return folderDesc;
    }
}
