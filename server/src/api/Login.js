import express from "express";
import Student from "../model/Student";
import Tutor from "../model/Tutor";

const router = express.Router();

router.get("/student_login", async function (req, res, next) {
    const { email, password } = req.query;
    try {
      const student = await Student.findOne({
        attributes: ["id", "email", "name", "birthday", "gender", "address"],
        where: {
          email,
          password
        }
      })
      res.status(200).json(student);
    } catch (err) {
      next(err)
    }
});

router.post("/tutor_login", async function (req, res, next) {
    const { email, password } = req.query
    try {
        const tutor = await Tutor.findOne({
        attributes: ["id", "email", "name", "birthday", "gender", "address"],
        where: {
            email,
            password
        }
        })
        res.status(200).json(tutor);
    } catch (err) {
        next(err)
    }
});
  

module.exports = router;