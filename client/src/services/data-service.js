import axios from "axios";
import authHeader from "./auth-header";

import { timetable } from "./fake-data";

const API_URL = "http://localhost:3001/api/";

const getTimetable = () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(timetable), 1000)
  );
};

const getSession = () => {
  return axios.get(API_URL + "session", { headers: authHeader() });
};

const DataService = { getTimetable, getSession };

export default DataService;
