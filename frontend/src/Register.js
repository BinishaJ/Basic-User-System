import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Signup successful!");
    navigate("/");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleRegister}>
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <label className="label">Name</label>
        <input
          required
          name="name"
          value={values.name}
          className="input"
          placeholder="Name"
          onChange={handleChange}
          autoFocus
        />
        <label className="label">Email</label>
        <input
          required
          name="email"
          type="email"
          value={values.email}
          className="input"
          placeholder="Email"
          onChange={handleChange}
          autoFocus
        />
        <label className="label">Password</label>
        <input
          required
          name="password"
          type="password"
          className="input"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <label className="label">Address</label>
        <input
          name="address"
          className="input"
          value={values.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <button type="submit" className="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
