import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";

import FacultyLogin from "./pages/FacultyLogin";
import FacultyRegister from "./pages/FacultyRegister";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyPanel from "./pages/FacultyPanel";

function App() {
  const [page, setPage] = useState("Dashboard");

  const getFaculty = () => {
    const data = sessionStorage.getItem("faculty");
    return data ? JSON.parse(data) : null;
  };

  const faculty = getFaculty();

  const adminLoggedIn =
    sessionStorage.getItem("adminLoggedIn") === "true";

  if (page === "Faculty Login") {
    return <FacultyLogin setPage={setPage} />;
  }

  if (page === "Faculty Register") {
    return <FacultyRegister setPage={setPage} />;
  }

  if (page === "Faculty Panel") {
    return (
      <FacultyPanel
        setPage={setPage}
        faculty={faculty}
      />
    );
  }

  if (page === "Faculty Dashboard") {
    if (!faculty) {
      return <FacultyLogin setPage={setPage} />;
    }

    return (
      <FacultyDashboard
        faculty={faculty}
        setPage={setPage}
      />
    );
  }

  if (page === "Admin") {
    return <Admin setPage={setPage} />;
  }

  return (
    <div className="app">

      <Navbar />

      <div className="layout">

        <Sidebar
          page={page}
          setPage={setPage}
          adminLoggedIn={adminLoggedIn}
          faculty={faculty}
        />

        <main className="main-content">

          {page === "Dashboard" && (
            <Dashboard setPage={setPage} />
          )}

          {page === "Students" && (
            <Students setPage={setPage} />
          )}

          {page === "Attendance" && (
            <Attendance
              setPage={setPage}
              faculty={faculty}
            />
          )}

          {page === "Reports" && (
            <Reports setPage={setPage} />
          )}

        </main>

      </div>

    </div>
  );
}

export default App;