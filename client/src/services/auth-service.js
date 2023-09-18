import axios from "axios";

const API_URL = "http://localhost:3001/api/";

const login = (username, password) =>
  axios.post(API_URL + "login", { username, password }).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  });

const logout = () => localStorage.removeItem("user");

const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

const AuthService = { login, logout, getCurrentUser };

export default AuthService;
