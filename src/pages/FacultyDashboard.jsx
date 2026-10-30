import {
  useEffect,
  useState
} from "react";

import BackButton from "../components/BackButton";
import { api } from "../api";

function FacultyDashboard({ faculty, setPage }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [attendance, setAttendance] = useState({});
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const classes = ["BCA", "BBA", "B.COM"];

  const semesters = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6"
  ];

  // Load students
  useEffect(() => {
    api.getStudents()
      .then(setStudents)
      .catch((error) => alert(error.message));
  }, []);

  // Filter students by class and semester
  const filteredStudents = students.filter(
    (student) =>
      student.course === selectedClass &&
      student.semester === selectedSemester
  );

  // Reset attendance when class or semester changes
  const resetAttendance = () => {
    setAttendance({});
    setAttendanceSaved(false);
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);
    resetAttendance();
  };

  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
    resetAttendance();
  };

  // Mark one student Present
  const handlePresent = (id) => {
    setAttendance((previous) => ({
      ...previous,
      [id]: previous[id] === "Present" ? "Absent" : "Present"
    }));

    setAttendanceSaved(false);
  };

  // Mark all students Present
  const handleAllPresent = () => {
    const updatedAttendance = {};

    filteredStudents.forEach((student) => {
      updatedAttendance[student._id] = "Present";
    });

    setAttendance(updatedAttendance);
    setAttendanceSaved(false);
  };

  // Mark all students Absent
  const handleAllAbsent = () => {
    const updatedAttendance = {};

    filteredStudents.forEach((student) => {
      updatedAttendance[student._id] = "Absent";
    });

    setAttendance(updatedAttendance);
    setAttendanceSaved(false);
  };

  // Save attendance
  const saveAttendance = async () => {
    if (!selectedClass || !selectedSemester) {
      alert("Please select Class and Semester");
      return;
    }

    if (filteredStudents.length === 0) {
      alert("No students found");
      return;
    }

    const date = new Date().toISOString().split("T")[0];

    const records = filteredStudents.map((student) => ({
      studentId: student._id,
      studentName: student.name,
      rollNo: student.rollNo,
      status:
        attendance[student._id] === "Present"
          ? "Present"
          : "Absent"
    }));

    try {
      setSaving(true);

      await api.saveAttendance({
        course: selectedClass,
        semester: selectedSemester,
        facultyId: faculty.id,
        facultyName: faculty.name,
        date,
        records
      });

      // Show final status after successful save
      setAttendance(
        Object.fromEntries(
          records.map((record) => [
            record.studentId,
            record.status
          ])
        )
      );

      setAttendanceSaved(true);
      alert("Attendance saved successfully!");
    } catch (error) {
      alert(error.message || "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  // Faculty logout
  const logoutFaculty = async () => {
    try {
      await api.facultyLogout(faculty.id);
    } catch (error) {
      console.error(error);
    }

    sessionStorage.removeItem("faculty");
    sessionStorage.removeItem("facultyToken");

    setPage("Dashboard");
    window.location.reload();
  };

  return (
    <div className="faculty-dashboard">
      <BackButton setPage={setPage} page="Dashboard" />

      <div className="faculty-header">
        <div>
          <h1>👨‍🏫 Welcome, {faculty.name}</h1>
          <p>Subject: {faculty.subject}</p>
        </div>

        <button className="delete-btn" onClick={logoutFaculty}>
          Logout
        </button>
      </div>

      <div className="selection-card">
        <h2>📚 Select Class</h2>

        <div className="selection-grid">
          <select
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option value="">Select Class</option>

            {classes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => handleSemesterChange(e.target.value)}
          >
            <option value="">Select Semester</option>

            {semesters.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedClass && selectedSemester && (
        <div className="table-card">
          <div className="table-header">
            <div>
              <h2>
                {selectedClass} - {selectedSemester}
              </h2>

              <p>Total Students: {filteredStudents.length}</p>
            </div>
          </div>

          {/* BULK ATTENDANCE BUTTONS */}
          {!attendanceSaved && filteredStudents.length > 0 && (
            <div className="bulk-attendance-actions">
              <button
                type="button"
                className="bulk-present-btn"
                onClick={handleAllPresent}
              >
                ✓ Mark All Present
              </button>

              <button
                type="button"
                className="bulk-absent-btn"
                onClick={handleAllAbsent}
              >
                ✕ Mark All Absent
              </button>
            </div>
          )}

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty">
                      No students in this class/semester.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => {
                    const status = attendance[student._id];

                    return (
                      <tr key={student._id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.rollNo}</td>

                        <td>
                          {attendanceSaved ? (
                            status === "Present" ? (
                              <span className="attendance-present-result">
                                ✓ Present
                              </span>
                            ) : (
                              <span className="attendance-absent-result">
                                ✕ Absent
                              </span>
                            )
                          ) : (
                            <>
                              <button
                                type="button"
                                className={
                                  status === "Present"
                                    ? "present-btn present-active"
                                    : status === "Absent"
                                      ? "present-btn absent-active"
                                      : "present-btn"
                                }
                                onClick={() => handlePresent(student._id)}
                              >
                                {status === "Present"
                                  ? "✓ Present"
                                  : status === "Absent"
                                    ? "✕ Absent"
                                    : "Present"}
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filteredStudents.length > 0 && !attendanceSaved && (
            <button
              className="primary-btn save-attendance"
              onClick={saveAttendance}
              disabled={saving}
            >
              {saving ? "Saving..." : "💾 Save Attendance"}
            </button>
          )}

          {attendanceSaved && (
            <div className="attendance-save-success">
              ✅ Attendance saved successfully
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FacultyDashboard;