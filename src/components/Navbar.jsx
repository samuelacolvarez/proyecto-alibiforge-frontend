import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CredibilityScore from "./CredibilityScore";
import {
  PiFolderLight,
  PiListChecksLight,
  PiPlusCircleLight,
  PiUserCircleLight,
  PiSignOutLight
} from "react-icons/pi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="navbar-brand">
          <PiFolderLight aria-hidden="true" />
          <span>AlibiForge</span>
        </Link>

        {user ? (
          <nav className="navbar-links">

            <NavLink to="/mis-coartadas" className="navbar-link">
              <PiListChecksLight aria-hidden="true" />
              Mis coartadas
            </NavLink>

            <NavLink
              to="/coartadas/nueva"
              className="navbar-link navbar-cta"
            >
              <PiPlusCircleLight aria-hidden="true" />
              Crear coartada
            </NavLink>

            <NavLink to="/perfil" className="navbar-link">
              <PiUserCircleLight aria-hidden="true" />
              {user.alias}
            </NavLink>

            <CredibilityScore
              value={user.credibilityScore || 0}
              compact
            />

            <button
              type="button"
              className="navbar-link navbar-logout"
              onClick={handleLogout}
            >
              <PiSignOutLight aria-hidden="true" />
              Salir
            </button>

          </nav>
        ) : (
          <nav className="navbar-links">

            <NavLink to="/login" className="navbar-link">
              Iniciar sesión
            </NavLink>

            <NavLink
              to="/register"
              className="navbar-link navbar-cta"
            >
              Registrarme
            </NavLink>

          </nav>
        )}
      </div>
    </header>
  );
}

