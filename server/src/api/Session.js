import express from "express";
import Session from "../model/Session";
import Tutor from "../model/Tutor";

const router = express.Router();

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
        } else {
            student.sessionId = sessionId;
            student.save();
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
            res.status(200).json('Done!');
        }

    } catch (err) {
        next(err);
    }
});


module.exports = router;