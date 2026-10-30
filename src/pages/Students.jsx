import {
  useEffect,
  useState
} from "react";

import BackButton from "../components/BackButton";
import { api } from "../api";

function Students({
  setPage
}) {

  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const [form, setForm] =
    useState({
      name: "",
      rollNo: "",
      course: "BCA",
      semester: "Semester 1"
    });


  const courses = [
    "BCA",
    "BBA",
    "B.COM"
  ];

  const semesters = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6"
  ];


  const loadStudents =
    async () => {

      try {

        const data =
          await api.getStudents();

        setStudents(data);

      } catch (error) {

        alert(error.message);

      }

    };


  useEffect(() => {

    loadStudents();

  }, []);


  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value
      });

    };


  const submitStudent =
    async (e) => {

      e.preventDefault();

      if (
        !form.name ||
        !form.rollNo
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }


      try {

        if (editId) {

          await api.updateStudent(
            editId,
            form
          );

          alert(
            "Student updated"
          );

        } else {

          await api.addStudent(
            form
          );

          alert(
            "Student added"
          );

        }

        setEditId(null);

        setForm({
          name: "",
          rollNo: "",
          course: "BCA",
          semester: "Semester 1"
        });

        loadStudents();

      } catch (error) {

        alert(error.message);

      }

    };


  const editStudent =
    (student) => {

      setEditId(
        student._id
      );

      setForm({
        name: student.name,
        rollNo: student.rollNo,
        course: student.course,
        semester: student.semester
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };


  const deleteStudent =
    async (id) => {

      if (
        !window.confirm(
          "Delete this student?"
        )
      ) {
        return;
      }

      try {

        await api.deleteStudent(
          id
        );

        loadStudents();

      } catch (error) {

        alert(error.message);

      }

    };


  const filteredStudents =
    students.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.rollNo
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );


  return (
    <div>

      <BackButton
        setPage={setPage}
        page="Dashboard"
      />


      <div className="page-header">

        <div>

          <h1>
            Students
          </h1>

          <p>
            Add, update and delete students
          </p>

        </div>

      </div>


      <div className="form-card">

        <h2>
          {editId
            ? "✏️ Update Student"
            : "➕ Add Student"}
        </h2>

        <form
          onSubmit={
            submitStudent
          }
        >

          <div className="form-grid">

            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={form.name}
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={
                form.rollNo
              }
              onChange={
                handleChange
              }
            />

            <select
              name="course"
              value={
                form.course
              }
              onChange={
                handleChange
              }
            >

              {courses.map(
                (course) => (

                  <option
                    key={course}
                    value={course}
                  >
                    {course}
                  </option>

                )
              )}

            </select>


            <select
              name="semester"
              value={
                form.semester
              }
              onChange={
                handleChange
              }
            >

              {semesters.map(
                (semester) => (

                  <option
                    key={semester}
                    value={semester}
                  >
                    {semester}
                  </option>

                )
              )}

            </select>

          </div>


          <button className="primary-btn">

            {editId
              ? "Update Student"
              : "+ Add Student"}

          </button>


          {editId && (

            <button
              type="button"
              className="cancel-btn"
              onClick={() => {

                setEditId(null);

                setForm({
                  name: "",
                  rollNo: "",
                  course: "BCA",
                  semester:
                    "Semester 1"
                });

              }}
            >
              Cancel
            </button>

          )}

        </form>

      </div>


      <div className="table-card">

        <div className="table-header">

          <h2>
            Student List
          </h2>

          <input
            className="search"
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Semester</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredStudents.length ===
              0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="empty"
                  >
                    No students found
                  </td>

                </tr>

              ) : (

                filteredStudents.map(
                  (student, index) => (

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

                        <button
                          className="edit-btn"
                          onClick={() =>
                            editStudent(
                              student
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteStudent(
                              student._id
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

    </div>
  );
}

export default Students;