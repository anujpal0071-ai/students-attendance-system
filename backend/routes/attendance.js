import express from "express";

import Attendance from "../models/Attendance.js";

const router = express.Router();


/* SAVE ATTENDANCE */

router.post("/save", async (req, res) => {
  try {

    const {
      course,
      semester,
      facultyId,
      facultyName,
      date,
      records
    } = req.body;

    await Attendance.deleteMany({
      course,
      semester,
      facultyId,
      date
    });

    const data = records.map((item) => ({
      studentId: item.studentId,
      studentName: item.studentName,
      rollNo: item.rollNo,
      course,
      semester,
      facultyId,
      facultyName,
      date,
      status: item.status
    }));

    const saved =
      await Attendance.insertMany(data);

    res.json({
      message: "Attendance saved",
      data: saved
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


/* GET ATTENDANCE */

router.get("/", async (req, res) => {
  try {

    const attendance =
      await Attendance.find()
        .sort({
          date: -1
        });

    res.json(attendance);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


export default router;