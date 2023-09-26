import axios from "axios";
import authHeader from "./auth-header";

import { timetable } from "./fake-data";

const API_URL = "http://localhost:3001/api/";

const getTimetable = () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(timetable), 1000)
  );
  // return axios.get(API_URL + "timetable/schedule", { headers: authHeader() });
};

const getYourSessions = () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(timetable), 1000)
  );
};

const onRegister = () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({ data: {}, status: 200 }), 1000)
  );
};

const getSessionDetail = () => {
  return axios.get(API_URL + "session", { headers: authHeader() });
};

const DataService = {
  getTimetable,
  getYourSessions,
  onRegister,
  getSessionDetail,
};

export default DataService;
