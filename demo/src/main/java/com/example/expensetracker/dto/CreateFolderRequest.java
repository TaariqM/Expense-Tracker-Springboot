package com.example.expensetracker.dto;

public class CreateFolderRequest {
    private String folderName;
    private String folderDescription;

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public void setFolderDescription(String folderDescription) {
        this.folderDescription = folderDescription;
    }

    public String getFolderName() {
        return folderName;
    }

    public String getFolderDescription() {
        return folderDescription;
    }
}
