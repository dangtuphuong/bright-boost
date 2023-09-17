import express from "express";
import Student from "../model/Student";

const router = express.Router();

router.get("/", async function (req, res, next) {
    const email = req.query.email;
    const password = req.query.password;
    try {
      const student = await Student.findOne({
        attributes: ["id", "email", "name", "birthday", "gender", "address"],
        where: {
          email: `${email}`,
          password: `${password}`
        }
      })
      res.status(200).json(student);
    } catch (err) {
      next(err)
    }
  });

module.exports = router;