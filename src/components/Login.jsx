import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  //обновляем состояние email
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  //обновляем состояние пароля
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if (props.loggedIn) {
    return <Link to="/" />;
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
          onChange={handleEmailChange}
          required
        />
        {/* <span className="auth__form-error">{errors.email}</span> */}
        <input
          className="auth__form-input"
          type="password"
          minLength="4"
          id="Password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {/* <span className="auth__form-error">{errors.password}</span> */}
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
