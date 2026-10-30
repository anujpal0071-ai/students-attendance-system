function Navbar() {

  const faculty =
    JSON.parse(
      sessionStorage.getItem(
        "faculty"
      ) || "null"
    );

  const admin =
    sessionStorage.getItem(
      "adminLoggedIn"
    ) === "true";

  return (
    <nav className="navbar">

      <div className="navbar-title">
        🎓 Student Attendance System
      </div>

      <div className="admin">

        {admin
          ? "👑 Admin"
          : faculty
            ? `👨‍🏫 ${faculty.name}`
            : "👤 Guest"}

      </div>

    </nav>
  );
}

export default Navbar;