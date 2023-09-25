import express from "express";
import Session from "../model/Session";

const router = express.Router();

router.get("/schedule", async function (req, res, next) {
    try {
        sessions = await Session.findAll({
            attributes: ["id", "schedule", "status"]
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