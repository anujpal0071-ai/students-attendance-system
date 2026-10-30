import {
  useEffect,
  useState
} from "react";

import StatCard from "../components/StatCard";
import BackButton from "../components/BackButton";
import { api } from "../api";

function Dashboard({ setPage }) {

  const [data, setData] = useState({
    totalStudents: 0,
    presentCount: 0,
    absentCount: 0,
    facultyPresentCount: 0,

    students: [],
    presentStudents: [],
    absentStudents: [],
    presentFaculty: []
  });

  const [selectedType, setSelectedType] =
    useState(null);


  const load = async () => {

    try {

      const result =
        await api.getAdminDashboard();

      setData(result);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    load();

    const interval =
      setInterval(load, 3000);

    return () =>
      clearInterval(interval);

  }, []);


  /* =========================
     GET SELECTED DATA
  ========================= */

  const getList = () => {

    if (selectedType === "total") {
      return data.students || [];
    }

    if (selectedType === "present") {
      return data.presentStudents || [];
    }

    if (selectedType === "absent") {
      return data.absentStudents || [];
    }

    if (selectedType === "faculty") {
      return data.presentFaculty || [];
    }

    return [];

  };


  /* =========================
     GET TITLE
  ========================= */

  const getTitle = () => {

    if (selectedType === "total") {
      return "All Students";
    }

    if (selectedType === "present") {
      return "Present Students Today";
    }

    if (selectedType === "absent") {
      return "Absent Students Today";
    }

    if (selectedType === "faculty") {
      return "Faculty Present";
    }

    return "";

  };


  return (

    <div>

      {/* BACK BUTTON */}

      <BackButton
        setPage={setPage}
        page="Dashboard"
      />


      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h1>
            Dashboard
          </h1>

          <p>
            Student Attendance System
          </p>

        </div>

      </div>


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="stats-grid">


        {/* TOTAL STUDENTS */}

        <div
          className="dashboard-stat-click"
          onClick={() =>
            setSelectedType("total")
          }
        >

          <StatCard
            title="Total Students"
            value={data.totalStudents}
            icon="👨‍🎓"
          />

        </div>


        {/* PRESENT STUDENTS */}

        <div
          className="dashboard-stat-click"
          onClick={() =>
            setSelectedType("present")
          }
        >

          <StatCard
            title="Present Today"
            value={data.presentCount}
            icon="✅"
          />

        </div>


        {/* ABSENT STUDENTS */}

        <div
          className="dashboard-stat-click"
          onClick={() =>
            setSelectedType("absent")
          }
        >

          <StatCard
            title="Absent Today"
            value={data.absentCount}
            icon="❌"
          />

        </div>


        {/* FACULTY PRESENT */}

        <div
          className="dashboard-stat-click"
          onClick={() =>
            setSelectedType("faculty")
          }
        >

          <StatCard
            title="Faculty Present"
            value={data.facultyPresentCount}
            icon="👨‍🏫"
          />

        </div>

      </div>


      {/* =========================
          DETAILS LIST
      ========================= */}

      {selectedType && (

        <div className="dashboard-student-list">


          {/* LIST HEADER */}

          <div className="student-list-header">

            <div>

              <h2>
                {getTitle()}
              </h2>

              <p>
                Total: {getList().length}
              </p>

            </div>


            <button
              className="close-list-btn"
              onClick={() =>
                setSelectedType(null)
              }
            >
              ✕ Close
            </button>

          </div>


          {/* =========================
              NO DATA
          ========================= */}

          {getList().length === 0 ? (

            <div className="no-students">

              {selectedType === "faculty"
                ? "No faculty is currently present."
                : "No students found."
              }

            </div>

          ) : (

            <div className="student-table-wrapper">


              {/* =========================
                  FACULTY TABLE
              ========================= */}

              {selectedType === "faculty" ? (

                <table className="student-table">

                  <thead>

                    <tr>

                      <th>
                        #
                      </th>

                      <th>
                        Faculty Name
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Subject
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {getList().map(
                      (faculty, index) => (

                        <tr
                          key={
                            faculty._id ||
                            faculty.id ||
                            index
                          }
                        >

                          <td>
                            {index + 1}
                          </td>


                          <td>

                            <strong>
                              {faculty.name || "-"}
                            </strong>

                          </td>


                          <td>
                            {faculty.email || "-"}
                          </td>


                          <td>
                            {faculty.subject || "-"}
                          </td>


                          <td>

                            <span
                              style={{
                                color: "#16a34a",
                                fontWeight: "600"
                              }}
                            >
                              🟢 Present
                            </span>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              ) : (


                /* =========================
                   STUDENT TABLE
                ========================= */

                <table className="student-table">

                  <thead>

                    <tr>

                      <th>
                        #
                      </th>

                      <th>
                        Name
                      </th>

                      <th>
                        Roll No
                      </th>

                      <th>
                        Course
                      </th>

                      <th>
                        Semester
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {getList().map(
                      (student, index) => (

                        <tr
                          key={
                            student._id ||
                            student.studentId ||
                            student.id ||
                            index
                          }
                        >

                          <td>
                            {index + 1}
                          </td>


                          <td>

                            <strong>

                              {
                                student.name ||
                                student.studentName ||
                                "-"
                              }

                            </strong>

                          </td>


                          <td>

                            {
                              student.rollNo ||
                              "-"
                            }

                          </td>


                          <td>

                            {
                              student.course ||
                              "-"
                            }

                          </td>


                          <td>

                            {
                              student.semester ||
                              "-"
                            }

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              )}

            </div>

          )}

        </div>

      )}


      {/* =========================
          WELCOME CARD
      ========================= */}

      <div className="welcome-card">

        <h2>

          Welcome to Student
          Attendance System 👋

        </h2>


        <p>

          Manage students, faculty,
          classes and attendance from
          one system.

        </p>

      </div>

    </div>

  );

}

export default Dashboard;