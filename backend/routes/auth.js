import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Faculty from "../models/Faculty.js";

const router = express.Router();

const createToken = (faculty) => {
  return jwt.sign(
    {
      id: faculty._id,
      role: "faculty"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );
};


/* REGISTER FACULTY */

router.post("/faculty/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      subject
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !subject
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const exists =
      await Faculty.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Faculty already registered"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const faculty = await Faculty.create({
      name,
      email,
      password: hashedPassword,
      subject,
      approved: false,
      active: false
    });

    res.status(201).json({
      message:
        "Registration successful. Wait for Admin approval.",
      facultyId: faculty._id
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


/* FACULTY LOGIN */

router.post("/faculty/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const faculty =
      await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    if (!faculty.approved) {
      return res.status(403).json({
        message:
          "Admin approval is required before login"
      });
    }

    const valid =
      await bcrypt.compare(
        password,
        faculty.password
      );

    if (!valid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    faculty.active = true;
    faculty.lastLogin = new Date();

    await faculty.save();

    const token = createToken(faculty);

    res.json({
      token,

      faculty: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        subject: faculty.subject
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


/* FACULTY LOGOUT */

router.post("/faculty/logout", async (req, res) => {
  try {
    const { facultyId } = req.body;

    if (facultyId) {
      await Faculty.findByIdAndUpdate(
        facultyId,
        {
          active: false
        }
      );
    }

    res.json({
      message: "Faculty logged out"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


export default router;