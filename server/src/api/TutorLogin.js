import express from "express";
import Tutor from "../model/Tutor";

const router = express.Router();

router.get("/", async function (req, res, next) {
    const email = req.query.email;
    const password = req.query.password;
    try {
      const tutor = await Tutor.findOne({
        attributes: ["id", "email", "name", "birthday", "gender", "address"],
        where: {
          email: `${email}`,
          password: `${password}`
        }
      })
      res.status(200).json(tutor);
    } catch (err) {
      next(err)
    }
  });

module.exports = router;