import {
  useEffect,
  useState
} from "react";

import BackButton from "../components/BackButton";
import { api } from "../api";

function Reports({
  setPage
}) {

  const [students, setStudents] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);


  useEffect(() => {

    Promise.all([
      api.getStudents(),
      api.getAttendance()
    ])
      .then(
        ([studentData, attendanceData]) => {

          setStudents(
            studentData
          );

          setAttendance(
            attendanceData
          );

        }
      )
      .catch(
        (error) =>
          alert(error.message)
      );

  }, []);


  const getReport =
    (student) => {

      const records =
        attendance.filter(
          (item) =>
            String(
              item.studentId
            ) ===
            String(
              student._id
            )
        );

      const total =
        records.length;

      const present =
        records.filter(
          (item) =>
            item.status ===
            "Present"
        ).length;

      const absent =
        records.filter(
          (item) =>
            item.status ===
            "Absent"
        ).length;

      const percentage =
        total > 0
          ? (
              (present / total) *
              100
            ).toFixed(2)
          : "0.00";

      return {
        total,
        present,
        absent,
        percentage
      };

    };


  return (
    <div>

      <BackButton
        setPage={setPage}
        page="Dashboard"
      />

      <div className="page-header">

        <div>

          <h1>
            Attendance Reports
          </h1>

          <p>
            Complete student attendance report
          </p>

        </div>

      </div>


      <div className="table-card">

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>#</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Semester</th>
                <th>Total</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Percentage</th>

              </tr>

            </thead>


            <tbody>

              {students.map(
                (student, index) => {

                  const report =
                    getReport(
                      student
                    );

                  return (

                    <tr
                      key={
                        student._id
                      }
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {student.name}
                      </td>

                      <td>
                        {student.rollNo}
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>
                        {student.semester}
                      </td>

                      <td>
                        {report.total}
                      </td>

                      <td className="text-present">
                        {report.present}
                      </td>

                      <td className="text-absent">
                        {report.absent}
                      </td>

                      <td>

                        <span
                          className={
                            report.percentage >=
                            75
                              ? "percentage good"
                              : "percentage low"
                          }
                        >
                          {
                            report.percentage
                          }%
                        </span>

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;