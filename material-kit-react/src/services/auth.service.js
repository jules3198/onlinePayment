import axios from "axios";

const API_URL = "http://localhost:3001";

const register = (societyName, email, password, phoneNumber, reversionaryCurrency, redirectUrlConfirmation, redirectUrlCancellation, kbis_file_name) => {
  return axios.post(API_URL + "/", {
    societyName,
    email,
    password,
    phoneNumber,
    reversionaryCurrency,
    redirectUrlConfirmation,
    redirectUrlCancellation,
    kbis_file_name
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("merchants", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("merchants");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("merchants"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};