import express from "express";

import testAPI from "./src/api/TestAPI";
import login from "./src/api/Login";

const app = express();
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/api", testAPI);
app.use("/api/login/", login);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
