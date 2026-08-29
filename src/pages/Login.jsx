import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleIdentifier(e) {
    setForm({
      ...form,
      identifier: e.target.value,
    });
  }

  function handlePassword(e) {
    setForm({
      ...form,
      password: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setSubmitting(true);

    try {
      await login(form);

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Email/alias o contraseña incorrectos.");
    }

    setSubmitting(false);
  }

  return (
    <main className="page page-center">
      <form className="case-card case-card-form" onSubmit={handleSubmit}>
        <span className="stamp stamp-submitted">Acceso</span>

        <h1>Iniciar sesión</h1>

        <label className="field">
          <span>Email o alias</span>
          <input
            type="text"
            required
            value={form.identifier}
            onChange={handleIdentifier}
            autoFocus
          />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={handlePassword}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? "Ingresando…" : "Ingresar"}
        </button>

        <p className="form-footnote">
          ¿No tienes cuenta aún? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </main>
  );
}