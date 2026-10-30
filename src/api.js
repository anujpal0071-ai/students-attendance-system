const API =
  "http://localhost:5000/api";


export const api = {

  async request(
    url,
    options = {}
  ) {

    const response =
      await fetch(
        API + url,
        {
          headers: {
            "Content-Type":
              "application/json",
            ...(options.headers || {})
          },

          ...options
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Something went wrong"
      );
    }

    return data;
  },


  facultyRegister(data) {

    return this.request(
      "/auth/faculty/register",
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );

  },


  facultyLogin(data) {

    return this.request(
      "/auth/faculty/login",
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );

  },


  facultyLogout(facultyId) {

    return this.request(
      "/auth/faculty/logout",
      {
        method: "POST",
        body: JSON.stringify({
          facultyId
        })
      }
    );

  },


  adminLogin(data) {

    return this.request(
      "/admin/login",
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );

  },


  getFaculties() {

    return this.request(
      "/admin/faculties"
    );

  },


  approveFaculty(id) {

    return this.request(
      `/admin/faculty/${id}/approve`,
      {
        method: "PUT"
      }
    );

  },


  deleteFaculty(id) {

    return this.request(
      `/admin/faculty/${id}`,
      {
        method: "DELETE"
      }
    );

  },


  getAdminDashboard() {

    return this.request(
      "/admin/dashboard"
    );

  },


  getStudents() {

    return this.request(
      "/students"
    );

  },


  addStudent(data) {

    return this.request(
      "/students",
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );

  },


  updateStudent(id, data) {

    return this.request(
      `/students/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data)
      }
    );

  },


  deleteStudent(id) {

    return this.request(
      `/students/${id}`,
      {
        method: "DELETE"
      }
    );

  },


  saveAttendance(data) {

    return this.request(
      "/attendance/save",
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );

  },


  getAttendance() {

    return this.request(
      "/attendance"
    );

  }

};