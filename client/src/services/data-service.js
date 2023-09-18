import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/api/";

const getSession = () => {
  return axios.get(API_URL + "session", { headers: authHeader() });
};

const DataService = { getSession };

export default DataService;
