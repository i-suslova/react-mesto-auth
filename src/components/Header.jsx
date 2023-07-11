import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  const location = useLocation();
  //информация о пути страницы
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  let headerText;
  let headerLink;

  if (pathName === "/sign-in") {
    headerText = "Регистрация";
    headerLink = "/sign-up";
  } else if (pathName === "/sign-up") {
    headerText = "Войти";
    headerLink = "/sign-in";
  } else {
    headerText = props.loggedIn ? "Регистрация" : "Войти";
    headerLink = props.loggedIn ? "/sign-up" : "/sign-in";
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип сайта место" />

      <Link className="header__link" to={headerLink}>
        {headerText}
      </Link>

      {props.loggedIn && (
        <div className="header__link-container">
          <div className="header__link-emai hover">
            {props.email}
            <Link
              className="header__link-exit hover"
              to="/sign-in"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
