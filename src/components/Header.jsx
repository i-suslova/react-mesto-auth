// import React from "react";
// import { useState } from "react";
// import logo from "../images/logo.svg";
// import { Link, useLocation } from "react-router-dom";

// function Header(props) {
//   //информация о текущем URL
//   const location = useLocation();
//   //сохраняем состояние, которое хранит текущий путь URL
//   const [pathname, setPathname] = useState("");

//   React.useEffect(() => {
//     setPathname(location.pathname);
//   }, [location]);

//   return (
//     <header className="header">
//       <img className="header__logo" src={logo} alt="логотип сайта место" />

//       {pathname === "/sign-in" && (
//         <Link className="header__link" to={"/sign-up"}>
//           Регистрация
//         </Link>
//       )}
//       {pathname !== "/sign-up" && (
//         <Link className="header__link"  to={"/sign-in"}>
//           Войти
//         </Link>
//       )}
//       {props.loggedIn && (
//         <div className="header__link-container">
//           <div className="header__link-emai hover">
//             {props.email}
//             <Link
//               className="header__link-exit hover"
//               to={"/sign-in"}
//               onClick={props.onSignOut}
//             >
//               Выйти
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  const location = useLocation();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  let headerText;
  let headerLink;

  if (pathname === "/sign-in") {
    headerText = "Регистрация";
    headerLink = "/sign-up";
  } else if (pathname === "/sign-up") {
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
