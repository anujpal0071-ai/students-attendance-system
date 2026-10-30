import express from "express";

import Faculty from "../models/Faculty.js";
import Student from "../models/student.js";
import Attendance from "../models/Attendance.js";

const router = express.Router();


/* ADMIN LOGIN */

router.post("/login", (req, res) => {

  const {
    email,
    password
  } = req.body;

  if (
    email === "admin@gmail.com" &&
    password === "admin123"
  ) {

    return res.json({
      token: "ADMIN_TOKEN_2026",
      admin: {
        email
      }
    });

  }

  res.status(401).json({
    message: "Invalid Admin Login"
  });
});


/* GET FACULTIES */

router.get("/faculties", async (req, res) => {

  try {

    const faculties =
      await Faculty.find()
        .select("-password")
        .sort({
          createdAt: -1
        });

    res.json(faculties);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


/* APPROVE FACULTY */

router.put(
  "/faculty/:id/approve",
  async (req, res) => {

    try {

      const faculty =
        await Faculty.findByIdAndUpdate(
          req.params.id,
          {
            approved: true
          },
          {
            new: true
          }
        )
        .select("-password");

      res.json(faculty);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


/* DELETE FACULTY */

router.delete(
  "/faculty/:id",
  async (req, res) => {

    try {

      await Faculty.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Faculty deleted"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


/* ADMIN DASHBOARD */

router.get("/dashboard", async (req, res) => {

  try {

    const faculties =
      await Faculty.find()
        .select("-password");

    const students =
      await Student.find();

    const attendance =
      await Attendance.find();

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const todayAttendance =
      attendance.filter(
        (item) =>
          item.date === today
      );

    const presentStudents =
      todayAttendance.filter(
        (item) =>
          item.status === "Present"
      );

    const absentStudents =
      todayAttendance.filter(
        (item) =>
          item.status === "Absent"
      );

    const presentFaculty =
      faculties.filter(
        (faculty) =>
          faculty.active === true
      );

    res.json({

      students,

      faculties,

      attendance,

      todayAttendance,

      presentStudents,

      absentStudents,

      presentFaculty,

      totalStudents:
        students.length,

      presentCount:
        presentStudents.length,

      absentCount:
        absentStudents.length,

      facultyPresentCount:
        presentFaculty.length

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


export default router;