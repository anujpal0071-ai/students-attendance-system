import BackButton from "../components/BackButton";

function FacultyPanel({ setPage, faculty }) {

  return (
    <div className="page">

      <BackButton
        setPage={setPage}
        page="Dashboard"
      />

      <div className="faculty-panel-card">

        <div className="faculty-panel-header">

          <div className="faculty-avatar">
            👨‍🏫
          </div>

          <div>
            <h1>Faculty Panel</h1>
            <p>Faculty Account Management</p>
          </div>

        </div>


        {faculty ? (

          <>

            <div className="faculty-info">

              <div className="faculty-info-box">

                <span>
                  Faculty Name
                </span>

                <strong>
                  {faculty.name}
                </strong>

              </div>


              <div className="faculty-info-box">

                <span>
                  Email Address
                </span>

                <strong>
                  {faculty.email}
                </strong>

              </div>


              <div className="faculty-info-box">

                <span>
                  Subject
                </span>

                <strong>
                  {faculty.subject}
                </strong>

              </div>


              <div className="faculty-info-box">

                <span>
                  Account Status
                </span>

                <strong>
                  ✅ Approved
                </strong>

              </div>

            </div>


            <div className="faculty-status">

              🟢

              <span>
                Faculty is currently logged in
              </span>

            </div>


            <button
              className="faculty-attendance-btn"
              onClick={() =>
                setPage("Faculty Dashboard")
              }
            >
              📝 Go To Attendance
            </button>

          </>

        ) : (

          <>

            <div className="faculty-status">

              🔐

              <span>
                Faculty is not logged in
              </span>

            </div>


            <button
              className="faculty-attendance-btn"
              onClick={() =>
                setPage("Faculty Login")
              }
            >
              👨‍🏫 Faculty Login
            </button>

          </>

        )}

      </div>

    </div>
  );
}

export default FacultyPanel;