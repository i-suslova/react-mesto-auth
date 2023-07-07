import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Header from './Header.jsx';


function Login() {


return(
    <div class="auth">
    <h2 class="auth__title">Регистрация</h2>
    <form class="form auth__form">
      <input
      class="auth__form-input"
        type="email"
        placeholder="Email"
        name="email"
        id="email"
        required
      />
      <span class="auth__form-error">{errors.email}</span>
      <input
      class="auth__form-input"
        type="password"
        minLength="8"
        name="password"
        id="password"
        placeholder="Пароль"
        required
      />
      <span class="auth__form-error">{errors.password}</span>
      <button  class="auth__form-button"  type="submit">Зарегистрироваться</button>
      <span  class="auth__form-help hover"> Уже зарегистрированы? Войти</span >
    </form>

  </div> 

)
}
export default Login;