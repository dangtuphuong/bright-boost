import express from "express";
import Subject from "../model/Subject";

const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const subject = await Subject.findAll();
    res.status(200).json(subject);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
