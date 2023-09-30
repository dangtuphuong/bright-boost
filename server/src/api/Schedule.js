import express from "express";
import TutorTeachSession from "../model/TutorTeachSession";
import TutorTeachSubject from "../model/TutorTeachSubject";
import Tutor from "../model/Tutor";
import Session from "../model/Session";
import Subject from "../model/Subject";

const router = express.Router();

router.get("/", async function (req, res, next) {
    try {
        const sessions = await Session.findAll({
            include: [
                {
                    model: TutorTeachSession,
                    as: 'TutorDetails',
                    attributes: ["tutorId"],
                    include: {
                        model: Tutor,
                        attributes: ["name", "email"],
                        include: {
                            model: TutorTeachSubject,
                            as: 'SubjectDetails',
                            attributes: ["subjectId"],
                            include: {
                                model: Subject
                            }
                        }
                    }
                }
            ],
            where: {
                is_cancelled: 0
            }
        });
        if (sessions === null) {
            throw new Error('No Session Available');
        } else {
            res.status(200).json(sessions);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;