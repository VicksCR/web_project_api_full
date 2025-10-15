import logo from "../../images/header-logo1.svg";
import line from "../../images/Line.jpg";
import { Link } from "react-router-dom";

export default function Header({
  isLoggedIn,
  userEmail,
  onLogout,
  showRegisterLink,
  showLoginLink,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logo}
          alt="Around The US Typographic Logo"
          className="header__logo"
        />
        <div className="header__user-info">
          {isLoggedIn && (
            <>
              <p className="header__email">{userEmail}</p>
              <button
                className="header__logout-button"
                onClick={onLogout}
                type="button"
              >
                Cerrar sesión
              </button>
            </>
          )}
          {showRegisterLink && (
            <Link to="/signup" className="header__logout-button">
              Regístrate{" "}
            </Link>
          )}
          {showLoginLink && (
            <Link to="/signin" className="header__logout-button">
              Iniciar sesión{" "}
            </Link>
          )}
        </div>
      </div>
      <img src={line} alt="Line" className="header__line" />
    </header>
  );
}
