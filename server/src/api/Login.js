import express from "express";
import Student from "../model/Student";
import Tutor from "../model/Tutor";
import Admin from "./Admin";

const router = express.Router();

async function checkAdmin(email, password) {
  const admin = await Admin.findOne({
    where: {
      email,
      password
    }
  })
  if (admin !== null) return true
  else return false;
}

router.post("/student_login", async function (req, res, next) {
    const { email, password } = req.body;
    try {
      if (checkAdmin(email, password)) {
        res.status(200).json({email: 'admin', password: 'admin', isAdmin: true});
      } else {
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
      }
    } catch (err) {
      next(err)
    }
});

router.post("/tutor_login", async function (req, res, next) {
    const { email, password } = req.body;
    try {
      if (checkAdmin(email, password)) {
        res.status(200).json({email: 'admin', password: 'admin', isAdmin: true});
      } else {
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
      }
    } catch (err) {
        next(err)
    }
});
  

module.exports = router;