import { useState } from "react";

import BackButton from "../components/BackButton";
import { api } from "../api";

function FacultyLogin({
  setPage
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const login = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      alert(
        "Enter email and password"
      );

      return;
    }

    try {

      const data =
        await api.facultyLogin({
          email,
          password
        });


      sessionStorage.setItem(
        "facultyToken",
        data.token
      );

      sessionStorage.setItem(
        "faculty",
        JSON.stringify(
          data.faculty
        )
      );


      setPage(
        "Faculty Dashboard"
      );

      window.location.reload();

    } catch (error) {

      alert(error.message);

    }

  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <BackButton
          setPage={setPage}
          page="Dashboard"
        />

        <h1>
          👨‍🏫 Faculty Login
        </h1>

        <p>
          Login after Admin approval
        </p>

        <form onSubmit={login}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button className="primary-btn">
            Login
          </button>

        </form>

        <button
          className="link-btn"
          onClick={() =>
            setPage(
              "Faculty Register"
            )
          }
        >
          Create Faculty Account
        </button>

      </div>

    </div>
  );
}

export default FacultyLogin;