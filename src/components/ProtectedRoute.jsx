import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
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

  // Si hay usuario, muestra la página
  return children;
}

