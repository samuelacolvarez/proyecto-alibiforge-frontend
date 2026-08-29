import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page page-center">
      <div className="case-card case-card-narrow">
        <span className="stamp stamp-rejected">Caso no encontrado</span>
        <h1>Error 404</h1>
        <p> La página que buscás no existe.</p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    </main>
  );
}
