import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protege una ruta. Si se pasa `roles` (ej. ["admin"]), además exige ese rol.
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mientras se verifica la sesión
  if (loading) {
    return <div className="page-loading">Cargando sesión…</div>;
  }

  // Si no hay usuario, lo manda a unauthorized
  if (!user) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ from: location }}
      />
    );
  }

  // Hay sesión pero el rol no alcanza
  if (roles && !roles.includes(user.role)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ from: location, reason: "role" }}
      />
    );
  }

  // Si hay usuario (y rol válido), muestra la página
  return children;
}
