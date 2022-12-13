import { useState } from "react";
import axios from "axios";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3500/api/users/login", user)
      .then(() => {
        alert("Login successful!");
        setEmail("");
        setPassword("");
      })
      .catch((error) => alert(error.response.data));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <label className="label">Email</label>
        <input
          required
          name="email"
          type="email"
          value={email}
          className="input"
          placeholder="Email"
          onChange={handleEmail}
          autoFocus
        />
        <label className="label">Password</label>
        <input
          required
          name="password"
          type="password"
          className="input"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
        />
        <button type="submit" className="submit">
          Login
        </button>
        <a href="/register" style={{ textAlign: "end" }}>
          Sign up
        </a>
      </form>
    </div>
  );
};

export default Login;
