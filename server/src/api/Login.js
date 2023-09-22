import express, { query } from "express";
import Student from "../model/Student";
import Tutor from "../model/Tutor";

const router = express.Router();

router.post("/student_login", async function (req, res, next) {
    const { email, password } = req.body;
    try {
      const student = await Student.findOne({
        attributes: ["id", "email", "name", "birthday", "gender", "address"],
        where: {
          email,
          password
        }
      })
      if (student === null) {
        throw new Error('No match student');
      } else {
        student.dataValues.accessToken = 'Student_' + student.id; 
        res.status(200).json(student);
      }
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
        if (tutor === null) {
          throw new Error('No match tuor');
        } else {
          tutor.dataValues.accessToken = 'Tutor_' + tutor.id;
          res.status(200).json(tutor);
        }
    } catch (err) {
        next(err)
    }
});
  

module.exports = router;