import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    rollNo: {
      type: String,
      required: true
    },

    course: {
      type: String,
      required: true,
      enum: ["BCA", "BBA", "B.COM"]
    },

    semester: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Student =
  mongoose.models.Student ||
  mongoose.model("Student", studentSchema);

export default Student;