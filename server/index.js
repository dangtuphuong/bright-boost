import express from "express";

import testAPI from "./src/api/TestAPI";
import studentLogin from "./src/api/StudentLogin";
import tutorLogin from "./src/api/TutorLogin";

const app = express();
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/api", testAPI);
app.use("/student_login", studentLogin);
app.use("/student_login", tutorLogin);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
