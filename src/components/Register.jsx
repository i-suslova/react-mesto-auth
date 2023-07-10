import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // обновляем состояние email и password, 
  //и передаём их в props.onRegister при вызове
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "Email") {
      setEmail(value);
    } else if (id === "Password") {
      setPassword(value);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }
  
  
  React.useEffect(() => {
    if (props.loggedIn) {
      navigate("/");
    }
  }, [props.loggedIn, navigate]);



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
        {/* //<span className="auth__form-error">{errors.email}</span> */}
        <input
          className="auth__form-input"
          type="password"
          minLength="3"
          id="Password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleChange}
          required
        />
        {/* <span className="auth__form-error">{errors.password}</span> */}
        {/* <button className="auth__form-button" type="submit"> */}
        <button className="auth__form-button" type="submit" onClick={handleSubmit}>
          Зарегистрироваться
        </button>

         <Link to="/sign-up" className="auth__form-help hover">
          Уже зарегистрированы? Войти
        </Link>
     
      </form>
    </div>
  );
}

export default Register;
