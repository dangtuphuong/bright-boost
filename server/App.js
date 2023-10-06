import express from "express";

import testAPI from "./src/api/TestAPI";
import login from "./src/api/Login";
import schedule from "./src/api/Schedule";
import question from "./src/api/Question";
import session from "./src/api/Session";
import attendant from "./src/api/Attendant";

const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.use("/api", testAPI);
app.use("/api/login/", login);
app.use("/api/schedule/", schedule);
app.use("/api/question/", question);
app.use("/api/attendant/", attendant);
app.use("/api/session/", session);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
