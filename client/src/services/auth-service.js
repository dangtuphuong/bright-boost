import axios from "axios";

const API_URL = "http://localhost:3001/api/";

const login = ({ email, password, role = "student" }) =>
  axios
    .post(API_URL + `login/${role}_login`, { email, password })
    .then((res) => {
      if (res?.data?.accessToken) {
        localStorage.setItem("user", JSON.stringify({ role, ...res?.data }));
      }
      return res.data;
    });

const logout = async () => localStorage.removeItem("user");

const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

const AuthService = { login, logout, getCurrentUser };

export default AuthService;
