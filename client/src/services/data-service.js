import axios from "axios";
import authHeader from "./auth-header";

import { students, questions } from "./fake-data";

const API_URL = "http://localhost:3001/api/";

const getTimetable = () => {
  return axios.get(API_URL + "schedule", { headers: authHeader() });
};

const getYourSessions = () => {
  return axios.get(API_URL + "schedule", { headers: authHeader() });
};

const onRegister = () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({ data: {}, status: 200 }), 1000)
  );
};

const getSessionDetail = () => {
  // return axios.get(API_URL + "session", { headers: authHeader() });
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({ students, questions }), 1000)
  );
};

const getQuestionList = (params) => {
  return axios.get(API_URL + "question", { params, headers: authHeader() });
};

const DataService = {
  getTimetable,
  getYourSessions,
  onRegister,
  getSessionDetail,
  getQuestionList,
};

export default DataService;
