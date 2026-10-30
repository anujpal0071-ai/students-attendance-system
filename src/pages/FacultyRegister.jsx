import { useState } from "react";

import BackButton from "../components/BackButton";
import { api } from "../api";

function FacultyRegister({
  setPage
}) {

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      subject: ""
    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };


  const register = async (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.subject
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      await api.facultyRegister(
        form
      );

      alert(
        "Registration successful. Wait for Admin approval."
      );

      setPage(
        "Faculty Login"
      );

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
          👨‍🏫 Faculty Registration
        </h1>

        <p>
          Register as a faculty member
        </p>

        <form
          onSubmit={register}
        >

          <input
            type="text"
            name="name"
            placeholder="Faculty Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />

          <button className="primary-btn">
            Register
          </button>

        </form>

        <button
          className="link-btn"
          onClick={() =>
            setPage(
              "Faculty Login"
            )
          }
        >
          Already registered? Login
        </button>

      </div>

    </div>
  );
}

export default FacultyRegister;