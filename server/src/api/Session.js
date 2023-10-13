import express from "express";
import Session from "../model/Session";
import Tutor from "../model/Tutor";
import Student from "../model/Student";
import Attendant from "../model/Attendant";

const router = express.Router();
const { Op } = require('sequelize');

router.get("/student", async function (req, res, next) {
    const { sessionId } = req.query;

    const startDay = new Date()
    startDay.setHours(0, 0, 0);  
    const endDay = new Date()
    endDay.setHours(23, 59, 59);

    try {
        const student = await Student.findAll({
            include: [
                {
                    model: Attendant,
                    attributes: ["id", "tutor_mark"],
                    where: {
                        sessionId,
                        time_attend: {
                            [Op.between]: [startDay.getTime(), endDay.getTime()] 
                        }
                    },
                },
            ],
            where: {
                sessionId: sessionId
            }
        });
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

router.post('/start', async function (req, res, next) {
    const { sessionId } = req.body;

    try {
        const session = await Session.findOne({
            where: {
                id: sessionId
            }
        });

        if (!session) {
            throw new Error('No such session');
        } else {
            session.status = 1;
            session.save();
            res.status(200).json('Done!');
        }

    } catch (err) {
        next(err);
    }
});

router.post('/end', async function (req, res, next) {
    const { sessionId } = req.body;

    try {
        const session = await Session.findOne({
            where: {
                id: sessionId
            }
        });

        if (!session) {
            throw new Error('No such session');
        } else {
            session.status = 0;
            session.save();
            const students = await Student.findAll({
                where: {
                    sessionId: sessionId
                }
            });
            students.map(function(student) {
                student.sessionId = 0;
                student.save();
            })
            res.status(200).json('Done!');
        }

    } catch (err) {
        next(err);
    }
});

router.post('/join/tutor', async function (req, res, next) {
    const { sessionId, tutorId } = req.body;

    try {
        const session = await Session.findOne({
            where: {
                id: sessionId,
                status: 1
            }
        });

        const tutor = await Tutor.findOne({
            where: {
                id: tutorId
            }
        });

        if (!session) {
            throw new Error('No such session');
        } else if (!tutor) {
            throw new Error('No such tutor');
        } else {
            tutor.sessionId = sessionId;
            tutor.save();
            res.status(200).json('Done!');
        }

    } catch (err) {
        next(err);
    }
});

router.post('/leave/tutor', async function (req, res, next) {
    const { sessionId, tutorId } = req.body;

    try {
        const session = await Session.findOne({
            where: {
                id: sessionId,
                status: 1
            }
        });

        const tutor = await Tutor.findOne({
            where: {
                id: tutorId
            }
        });

        if (!session) {
            throw new Error('No such session');
        } else if (!tutor) {
            throw new Error('No such tutor');
        } else {
            tutor.sessionId = 0;
            tutor.save();
            res.status(200).json('Done!');
        }

    } catch (err) {
        next(err);
    }
});


router.post('/join/student', async function (req, res, next) {
    const { sessionId, studentId } = req.body;
    
    try {
        const session = await Session.findOne({
            where: {
                id: sessionId,
                status: 1
            }
        });

        const student = await Student.findOne({
            where: {
                id: studentId
            }
        });

        if (!session) {
            throw new Error('No such session');
        } else if (!student) {
            throw new Error('No such student');
        } else if (session.num_students === 25) {
            throw new Error('Session is full')
        } else {
            student.sessionId = sessionId;
            session.num_students += 1;
            student.save();
            session.save();
            
            const startDay = new Date();
            startDay.setHours(0, 0, 0);
            
            const endDay = new Date();
            endDay.setHours(23, 59, 59);

            await Attendant.create({
                studentId,
                sessionId,
                time_attend: Date.now()
            })

            res.status(200).json('Done!');
        }

    } catch (err) {
        next(err);
    }
});

router.post('/leave/student', async function (req, res, next) {
    const { sessionId, studentId } = req.body;

    try {
        const session = await Session.findOne({
            where: {
                id: sessionId,
                status: 1
            }
        });

        const student = await Student.findOne({
            where: {
                id: studentId
            }
        });

        if (!session) {
            throw new Error('No such session');
        } else if (!student) {
            throw new Error('No such student');
        } else {
            student.sessionId = 0;
            student.save();
            session.num_students -= 1;
            session.save();

            res.status(200).json('Done!');
        }

    } catch (err) {
        next(err);
    }
});


module.exports = router;