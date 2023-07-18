import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (props.loggedIn) {
      navigate("/sign-up");
    }
  }, [props.loggedIn, navigate]);

  // обновляем состояние email и password,
  //и передаём их в props.onRegister при вызове
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
    props.onRegistration(email, password);
  }

  return (
    <div className="auth auth__register">
      <h2 className="auth__title">Регистрация</h2>

      <form className="form auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          type="email"
          placeholder="Email"
          id="Email"
          value={email || ""}
          onChange={handleChange}
          required
        />
        <input
          className="auth__form-input"
          type="password"
          // minLength="3"
          id="Password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleChange}
          required
        />
        <button
          className="auth__form-button"
          type="submit"
        >
          Зарегистрироваться
        </button>

        <Link to="/sign-in" className="auth__form-help hover">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
