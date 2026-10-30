function Sidebar({
  page,
  setPage,
  adminLoggedIn,
  faculty
}) {

  const normalMenu = [
    ["Dashboard", "📊"],
    ["Students", "👨‍🎓"],
    ["Attendance", "📝"],
    ["Reports", "📈"]
  ];


  // FACULTY LOGOUT
  const facultyLogout = async () => {

    try {

      const current =
        sessionStorage.getItem("faculty");

      if (current) {

        const data =
          JSON.parse(current);

        await fetch(
          "http://localhost:5000/api/auth/faculty/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              facultyId: data.id
            })
          }
        );
      }

    } catch (error) {

      console.log(error);

    }


    sessionStorage.removeItem("faculty");
    sessionStorage.removeItem("facultyToken");

    setPage("Dashboard");

    window.location.reload();
  };


  // ADMIN LOGOUT
  const adminLogout = () => {

    sessionStorage.removeItem(
      "adminLoggedIn"
    );

    sessionStorage.removeItem(
      "adminToken"
    );

    setPage("Dashboard");

    window.location.reload();
  };


  return (

    <aside className="sidebar">

      <h3>Menu</h3>


      {/* NORMAL MENU */}

      {normalMenu.map(
        ([name, icon]) => (

          <button
            key={name}
            className={
              page === name
                ? "active-menu"
                : ""
            }
            onClick={() =>
              setPage(name)
            }
          >

            {icon}

            <span>
              {name}
            </span>

          </button>

        )
      )}


      <hr />


      {/* FACULTY PANEL */}

      <button
        className={
          page === "Faculty Panel"
            ? "active-menu"
            : ""
        }
        onClick={() =>
          setPage("Faculty Panel")
        }
      >

        👨‍🏫

        <span>
          Faculty Panel
        </span>

      </button>


      {/* FACULTY LOGIN */}

      {!faculty && (

        <button
          onClick={() =>
            setPage("Faculty Login")
          }
        >

          🔐

          <span>
            Faculty Login
          </span>

        </button>

      )}


      {/* FACULTY REGISTER */}

      {!faculty && (

        <button
          onClick={() =>
            setPage("Faculty Register")
          }
        >

          📝

          <span>
            Faculty Register
          </span>

        </button>

      )}


      {/* FACULTY LOGOUT */}

      {faculty && (

        <button
          onClick={facultyLogout}
        >

          🚪

          <span>
            Faculty Logout
          </span>

        </button>

      )}


      <hr />


      {/* ADMIN */}

      {!adminLoggedIn && (

        <button
          onClick={() =>
            setPage("Admin")
          }
        >

          👑

          <span>
            Admin
          </span>

        </button>

      )}


      {adminLoggedIn && (

        <>

          <button
            className={
              page === "Admin"
                ? "active-menu"
                : ""
            }
            onClick={() =>
              setPage("Admin")
            }
          >

            👑

            <span>
              Admin Panel
            </span>

          </button>


          <button
            onClick={adminLogout}
          >

            🚪

            <span>
              Admin Logout
            </span>

          </button>

        </>

      )}

    </aside>
  );
}

export default Sidebar;