import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const getFolders = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/expenseFolders`);
    const result = response.data;
    return result;
    //console.log(response);
  } catch (err) {
    console.error("Error fetching users expense folders: ", err);
  }
};

export const addFolder = async (userId, expenseFolder, csrfToken) => {
  try {
    const response = await axios.post(
      `${API_URL}/${userId}/expenseFolders`,
      expenseFolder,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      }
    );
    const result = response.data;
    return result;
    // console.log(response);
  } catch (err) {
    console.error("Error adding a new expense folders: ", err);
  }
};

export const modifyFolder = async (
  userId,
  expenseFolderId,
  expenseFolder,
  csrfToken
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${userId}/expenseFolders/${expenseFolderId}`,
      expenseFolder,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      }
    );
    const result = await response.data;
    return result;
  } catch (err) {
    console.error("Error editing the expense folder: ", err);
  }
};

export const deleteFolder = async (userId, expenseFolderId, csrfToken) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${userId}/expenseFolders/${expenseFolderId}`,
      {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      }
    );
    const result = await response.data;
    return result;
  } catch (err) {
    console.error("Error deleting the expense folder: ", err);
  }
};
