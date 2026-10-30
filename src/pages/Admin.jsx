import {
  useEffect,
  useState
} from "react";

import BackButton from "../components/BackButton";
import { api } from "../api";

function Admin({
  setPage
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loggedIn, setLoggedIn] =
    useState(
      sessionStorage.getItem(
        "adminLoggedIn"
      ) === "true"
    );

  const [dashboard, setDashboard] =
    useState({
      students: [],
      faculties: [],
      presentStudents: [],
      absentStudents: [],
      presentFaculty: []
    });


  const loadDashboard =
    async () => {

      try {

        const data =
          await api.getAdminDashboard();

        setDashboard(data);

      } catch (error) {

        console.log(error);

      }

    };


  useEffect(() => {

    if (loggedIn) {

      loadDashboard();

      const interval =
        setInterval(
          loadDashboard,
          3000
        );

      return () =>
        clearInterval(
          interval
        );
    }

  }, [loggedIn]);


  const adminLogin =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await api.adminLogin({
            email,
            password
          });

        sessionStorage.setItem(
          "adminLoggedIn",
          "true"
        );

        sessionStorage.setItem(
          "adminToken",
          data.token
        );

        setLoggedIn(true);

      } catch (error) {

        alert(error.message);

      }

    };


  const approveFaculty =
    async (id) => {

      try {

        await api.approveFaculty(
          id
        );

        loadDashboard();

      } catch (error) {

        alert(error.message);

      }

    };


  const deleteFaculty =
    async (id) => {

      if (
        !window.confirm(
          "Delete this faculty?"
        )
      ) {
        return;
      }

      try {

        await api.deleteFaculty(
          id
        );

        loadDashboard();

      } catch (error) {

        alert(error.message);

      }

    };


  if (!loggedIn) {

    return (
      <div className="auth-page">

        <div className="auth-card">

          <BackButton
            setPage={setPage}
            page="Dashboard"
          />

          <h1>
            👑 Admin Login
          </h1>

          <form
            onSubmit={adminLogin}
          >

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button className="primary-btn">
              Admin Login
            </button>

          </form>

        </div>

      </div>
    );
  }


  const presentStudents =
    dashboard.presentStudents ||
    [];

  const absentStudents =
    dashboard.absentStudents ||
    [];

  const presentFaculty =
    dashboard.presentFaculty ||
    [];

  const faculties =
    dashboard.faculties ||
    [];

  const students =
    dashboard.students ||
    [];


  return (
    <div className="admin-page">

      <BackButton
        setPage={setPage}
        page="Dashboard"
      />

      <div className="admin-top">

        <div>

          <h1>
            👑 Admin Panel
          </h1>

          <p>
            Student Attendance Management
          </p>

        </div>

      </div>


      <div className="stats-grid">

        <div className="stat-card">
          <div>
            <p>
              Total Students
            </p>

            <h2>
              {students.length}
            </h2>
          </div>

          <div className="stat-icon">
            👨‍🎓
          </div>
        </div>


        <div className="stat-card">
          <div>
            <p>
              Present Today
            </p>

            <h2>
              {presentStudents.length}
            </h2>
          </div>

          <div className="stat-icon">
            ✅
          </div>
        </div>


        <div className="stat-card">
          <div>
            <p>
              Absent Today
            </p>

            <h2>
              {absentStudents.length}
            </h2>
          </div>

          <div className="stat-icon">
            ❌
          </div>
        </div>


        <div className="stat-card">
          <div>
            <p>
              Faculty Present
            </p>

            <h2>
              {presentFaculty.length}
            </h2>
          </div>

          <div className="stat-icon">
            👨‍🏫
          </div>
        </div>

      </div>


      <div className="form-card">

        <h2>
          👨‍🏫 Faculty Approval
        </h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {faculties.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="empty"
                  >
                    No Faculty Registration
                  </td>
                </tr>

              ) : (

                faculties.map(
                  (faculty) => (

                    <tr
                      key={faculty._id}
                    >

                      <td>
                        {faculty.name}
                      </td>

                      <td>
                        {faculty.email}
                      </td>

                      <td>
                        {faculty.subject}
                      </td>

                      <td>

                        {faculty.approved
                          ? "✅ Approved"
                          : "⏳ Pending"}

                      </td>

                      <td>

                        {!faculty.approved && (

                          <button
                            className="approve-btn"
                            onClick={() =>
                              approveFaculty(
                                faculty._id
                              )
                            }
                          >
                            Approve
                          </button>

                        )}

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteFaculty(
                              faculty._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      <div className="form-card">

        <h2>
          🟢 Faculty Present
        </h2>

        <div className="faculty-present-grid">

          {presentFaculty.length === 0 ? (

            <p>
              No faculty currently logged in.
            </p>

          ) : (

            presentFaculty.map(
              (faculty) => (

                <div
                  className="faculty-present"
                  key={faculty._id}
                >

                  <span>
                    🟢
                  </span>

                  <div>

                    <strong>
                      {faculty.name}
                    </strong>

                    <small>
                      {faculty.subject}
                    </small>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>


      <div className="form-card">

        <h2>
          📚 Today's Student Attendance
        </h2>

        <div className="attendance-summary">

          <div className="summary-box present-box">

            <h3>
              ✅ Present
            </h3>

            {presentStudents.length === 0
              ? (
                <p>
                  No students present
                </p>
              )
              : presentStudents.map(
                (student, index) => (
                  <p key={index}>
                    {student.studentName}
                    {" - "}
                    {student.rollNo}
                  </p>
                )
              )}

          </div>


          <div className="summary-box absent-box">

            <h3>
              ❌ Absent
            </h3>

            {absentStudents.length === 0
              ? (
                <p>
                  No students absent
                </p>
              )
              : absentStudents.map(
                (student, index) => (
                  <p key={index}>
                    {student.studentName}
                    {" - "}
                    {student.rollNo}
                  </p>
                )
              )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;