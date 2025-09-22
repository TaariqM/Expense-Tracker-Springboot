import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const result = response.data;
    // console.log(result);
    return result;
    // const user = await axios.get(`${API_URL}/${id}`).then((response) => {
    //   return response.data;
    // });
  } catch (error) {
    console.log("Error retrieving user by id: ", error);
  }
};

export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  const result = response.data;
  localStorage.setItem("userId", result.id);
  return result;
  // try {
  //   const response = await axios.post(API_URL, user);
  //   const result = response.data;
  //   localStorage.setItem("userId", result.id);
  //   return result;
  // } catch (error) {
  //   console.log("Error registering new user: ", error);
  // }
};

export const deleteUser = async (id) => {
  axios.delete(`${API_URL}/${id}`);
};
