import express from "express";
import Attendant from "../model/Attendant";
import Student from "../model/Student";

const router = express.Router();
const { Op } = require("sequelize");

router.post('/mark', async function (req, res, next) {
    const { students, sessionId } = req.body;

    try {
        const startDay = new Date();
        startDay.setHours(0, 0, 0);
        
        const endDay = new Date();
        endDay.setHours(23, 59, 59);

        students.map(async function(student) {
            if (student.mark) {
                const attend = await Attendant.findOne({
                    where: {
                        sessionId: sessionId,
                        studentId: student.id,
                        time_attend: {
                            [Op.between]: [startDay.getTime(), endDay.getTime()] 
                        }
                    }
                });
                if (!attend) {
                    throw new Error("!Cant find attendant");
                } else {
                    attend.tutor_mark = 1;
                    attend.save();
                }
                res.status(200).json("Marking attendant done!");
            }
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;