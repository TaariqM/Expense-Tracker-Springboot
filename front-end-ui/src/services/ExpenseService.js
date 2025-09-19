import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const getExpensesForFolder = async (userId, folderId) => {
  try {
    const response = await axios.get(
      `${API_URL}/${userId}/expenseFolders/${folderId}/expenses`
    );
    const result = response.data;
    return result;
  } catch (err) {
    console.error("Error getting expenses for folder", err);
    return [];
  }
};

export const addExpenseToFolder = async (userId, folderId, expense) => {
  try {
    const response = await axios.post(
      `${API_URL}/${userId}/expenseFolders/${folderId}/expenses`,
      expense,
      { header: { "Content-Type": "application/json" } }
    );
    const result = response.data;
    return result;
  } catch (err) {
    console.error("Error adding expense to folder", err);
  }
};

export const updateExpenseForFolder = async (
  userId,
  folderId,
  expenseId,
  updatedExpense
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${userId}/expenseFolders/${folderId}/expenses/${expenseId}`,
      updatedExpense,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data;
    return result;
  } catch (err) {
    console.error("Error updating expense", err);
  }
};
export const deleteExpenseForFolder = async (userId, folderId, expenseId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${userId}/expenseFolders/${folderId}/expenses/${expenseId}`
    );
    const result = response.data;
    return result;
  } catch (err) {
    console.error("Error deleting expense", err);
  }
};
