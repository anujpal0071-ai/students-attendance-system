import express from "express";

import Student from "../models/Student.js";

const router = express.Router();


/* GET STUDENTS */

router.get("/", async (req, res) => {
  try {
    const students =
      await Student.find()
        .sort({
          course: 1,
          semester: 1,
          rollNo: 1
        });

    res.json(students);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


/* ADD STUDENT */

router.post("/", async (req, res) => {
  try {
    const student =
      await Student.create(req.body);

    res.status(201).json(student);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


/* UPDATE STUDENT */

router.put("/:id", async (req, res) => {
  try {
    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.json(student);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


/* DELETE STUDENT */

router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Student deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


export default router;