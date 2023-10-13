import express from "express";
import Attendant from "../model/Attendant";

const router = express.Router();
const { Op } = require("sequelize");

router.post('/mark', async function (req, res, next) {
    const { studentId, sessionId } = req.body;

    try {
        const startDay = new Date();
        startDay.setHours(0, 0, 0);
        
        const endDay = new Date();
        endDay.setHours(23, 59, 59);

        const attend = await Attendant.findOne({
            where: {
                sessionId: sessionId,
                studentId: studentId,
                time_attend: {
                    [Op.between]: [startDay.getTime(), endDay.getTime()] 
                }
            }
        });

        if (!attend) {
            throw new Error("No such attendant found")
        } else {
            attend.is_mark = 1;
            attend.save();
            res.status(200).json({message: "Successfully mark attendant!"});
        }

    } catch (err) {
        next(err);
    }
});

module.exports = router;