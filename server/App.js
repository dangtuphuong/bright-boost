import express from "express";

import testAPI from "./src/api/TestAPI";
import login from "./src/api/Login";

const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.use("/api", testAPI);
app.use("/api/login/", login);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
