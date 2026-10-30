import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    studentName: String,

    rollNo: String,

    course: String,

    semester: String,

    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true
    },

    facultyName: String,

    date: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Attendance",
  attendanceSchema
);