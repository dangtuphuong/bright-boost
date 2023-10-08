import express from "express";
import Question from "../model/Question";
import Student from "../model/Student";
import Tutor from "../model/Tutor";

const router = express.Router();
const { Op } = require("sequelize");

router.get("/", async function(req, res, next) {
    const { sessionId } = req.query;
    try {
        
        const startDay = new Date();
        startDay.setHours(0, 0, 0);
        
        const endDay = new Date();
        endDay.setHours(23, 59, 59);

        const questions = await Question.findAll({
            include: [
                {
                    model: Student,
                    attributes: ["id", "name"]
                },
                {
                    model: Tutor,
                    attributes: ["id", "name"]
                }
            ],
            where: {
                sessionId: sessionId,
                time_publish: {
                    [Op.between]: [startDay.getTime(), endDay.getTime()] 
                }
            }
        });

        res.status(200).json(questions);

    } catch (err) {
        next(err);
    }
})

router.post("/answer/start", async function(req, res, next) {
    const { id, tutorId } = req.body;
    try {
        const question = Question.findOne({
            where: {
                id: id
            }
        });

        const now = new Date();

        if (!question) {
            next('Could not find the specific question');
        } else {
            await Question.update(
                { 
                    tutorId: tutorId,
                    is_answer: 1,
                    time_start: now
                }
                ,{
                    where: {
                        id: id
                    }
                });
            
            res.status(200).json('Successfull');
        }
    } catch (err) {
        next(err);
    }
})

router.post("/answer/end", async function(req, res, next) {
    const { id, tutorId } = req.body;
    try {
        const question = Question.findOne({
            where: {
                id: id,
                is_answer: 1
            }
        });

        const now = Date.now();

        if (!question) {
            next('Could not find the specific question');
        } else {
            await Question.update(
                { 
                    is_answer: 2,
                    time_end: now,
                    tutorId
                }
                ,{
                    where: {
                        id: id,
                        is_answer: 1
                    }
                });
            
            res.status(200).json('Successfull');
        }
    } catch (err) {
        next(err);
    }
})

router.post("/add", async function(req, res, next) {
    const { sessionId, studentId, content } = req.body;
    try {

        await Question.create({
            studentId,
            sessionId,
            tutorId: 1,
            content,
            is_answered: 0,
            time_publish: Date.now(),
            content: content
        });

        res.status(200).json({message: 'Successful add new question'});

    } catch (err) {
        next(err);
    }
});

module.exports = router;