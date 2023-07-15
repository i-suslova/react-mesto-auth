import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.loggedIn) {
      navigate("/");
    }
  }, [props.loggedIn, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "Email") {
      setUserEmail(value);
    } else if (id === "Password") {
      setPassword(value);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <div className="auth auth__login">
      <h2 className="auth__title">Вход</h2>
      <form className="form auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          type="email"
          placeholder="Email"
          id="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          className="auth__form-input"
          type="password"
          minLength="4"
          id="Password"
          placeholder="Пароль"
          value={password}
          onChange={handleChange}
          required
        />
        <button
          className="auth__form-button"
          type="submit"
          onClick={handleSubmit}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
