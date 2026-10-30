import BackButton from "../components/BackButton";

function Attendance({ setPage, faculty }) {

  if (!faculty) {

    return (
      <div className="page">

        <BackButton
          setPage={setPage}
          page="Dashboard"
        />

        <div className="attendance-login-card">

          <div className="attendance-login-icon">
            📝
          </div>

          <h1>
            Attendance
          </h1>

          <p>
            Attendance mark karne ke liye
            Faculty Login karein.
          </p>

          <button
            className="attendance-login-btn"
            onClick={() =>
              setPage("Faculty Login")
            }
          >
            👨‍🏫 Faculty Login
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="page">

      <BackButton
        setPage={setPage}
        page="Dashboard"
      />

      <div className="attendance-login-card">

        <div className="attendance-login-icon">
          📝
        </div>

        <h1>
          Attendance
        </h1>

        <p>
          Faculty attendance panel open
          karein aur students ki attendance
          mark karein.
        </p>

        <button
          className="attendance-login-btn"
          onClick={() =>
            setPage("Faculty Dashboard")
          }
        >
          📋 Mark Attendance
        </button>

      </div>

    </div>
  );
}

export default Attendance;