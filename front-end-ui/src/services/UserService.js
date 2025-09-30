import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  const result = response.data;
  return result;
};

export const loginUser = async (email, password) => {
  const response = await axios.get(`${API_URL}/${email}/${password}`);
  const result = response.data;
  console.log(result);
  return result;
  // try {
  //   const response = await axios.get(`${API_URL}/${email}/${password}`);
  //   const result = response.data;
  //   // console.log(result);
  //   return result;
  //   // const user = await axios.get(`${API_URL}/${id}`).then((response) => {
  //   //   return response.data;
  //   // });
  // } catch (error) {
  //   console.log("Error retrieving user by id: ", error);
  // }
};

export const addUser = async (user, csrfToken) => {
  const response = await axios.post(API_URL, user, {
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
    withCredentials: true,
  });
  const result = response.data;
  localStorage.setItem("userId", result.id);
  return result;
};

export const deleteUser = async (id, csrfToken) => {
  axios.delete(`${API_URL}/${id}`, {
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
    withCredentials: true,
  });
};
