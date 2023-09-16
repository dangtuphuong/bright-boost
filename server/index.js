import express from "express";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "db-instance.crruajoumg3g.ap-southeast-2.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "Daovuhoangnam99",
  database: "bright_boost_schema",
});

connection.connect();

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  connection.query("select * from subject", (err, rows) => {
    if (err) throw err;

    console.log(rows[0]);
    res.json({ rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
