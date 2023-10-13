import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/api/";

const getTimetable = () => {
  return axios.get(API_URL + "schedule", { headers: authHeader() });
};

const getAvailableSessions = () => {
  return axios.get(API_URL + "schedule/available", { headers: authHeader() });
};

const onStartSession = ({ sessionId }) => {
  return axios.post(
    API_URL + "session/start",
    { sessionId },
    { headers: authHeader() }
  );
};

const onEndSession = ({ sessionId }) => {
  return axios.post(
    API_URL + "session/end",
    { sessionId },
    { headers: authHeader() }
  );
};

const onJoinSession = ({ sessionId, userId, role = "student" }) => {
  return axios.post(
    API_URL + `session/join/${role}`,
    {
      sessionId,
      ...(role === "student" ? { studentId: userId } : { tutorId: userId }),
    },
    { headers: authHeader() }
  );
};

const onLeaveSession = ({ sessionId, userId, role = "student" }) => {
  return axios.post(
    API_URL + `session/leave/${role}`,
    {
      sessionId,
      ...(role === "student" ? { studentId: userId } : { tutorId: userId }),
    },
    { headers: authHeader() }
  );
};

const getStudentList = (params) => {
  return axios.get(API_URL + "session/student", {
    params,
    headers: authHeader(),
  });
};

const getQuestionList = (params) => {
  return axios.get(API_URL + "question", { params, headers: authHeader() });
};

const markAttendance = (params) => {
  return axios.post(API_URL + "attendant/mark", params, {
    headers: authHeader(),
  });
};

const removeAttendance = (params) => {
  return axios.post(API_URL + "attendant/remove", params, {
    headers: authHeader(),
  });
};

const postQuestion = (params) => {
  return axios.post(API_URL + "question/add", params, {
    headers: authHeader(),
  });
};

const onStartAnswer = (params) => {
  return axios.post(API_URL + "question/answer/start", params, {
    headers: authHeader(),
  });
};

const onEndAnswer = (params) => {
  return axios.post(API_URL + "question/answer/end", params, {
    headers: authHeader(),
  });
};

const DataService = {
  getTimetable,
  getAvailableSessions,
  onStartSession,
  onEndSession,
  onJoinSession,
  onLeaveSession,
  getStudentList,
  getQuestionList,
  onStartAnswer,
  onEndAnswer,
  postQuestion,
  markAttendance,
  removeAttendance,
};

export default DataService;
