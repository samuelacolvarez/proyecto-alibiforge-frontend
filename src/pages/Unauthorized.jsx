import { Link, useLocation } from "react-router-dom";

export default function Unauthorized() {
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const forbiddenByRole = location.state?.reason === "role";

  return (
    <main className="page page-center">
      <div className="case-card case-card-narrow">
        <span className="stamp stamp-rejected">Acceso restringido</span>
        {forbiddenByRole ? (
          <>
            <h1>Sin permisos</h1>
            <p>
              Esta sección es solo para administradores. Tu cuenta no tiene
              permisos para entrar.
            </p>
            <div className="page-actions">
              <Link to="/" className="btn btn-primary">Volver al inicio</Link>
            </div>
          </>
        ) : (
          <>
            <h1>Necesitás una identidad</h1>
            <p>
              Esta sección del expediente es solo para miembros con sesión iniciada.
              {from && " Iniciá sesión para volver a donde estabas."}
            </p>
            <div className="page-actions">
              <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
              <Link to="/register" className="btn btn-secondary">Crear una cuenta</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
