import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SPECIALITIES } from "../utils/constants";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    alias: "",
    email: "",
    password: "",
    confirmPassword: "",
    speciality: "",
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (form.speciality === "") {
      setError("Elige una especialidad.");
      return;
    }

    setSubmitting(true);

    try {
      await register({
        alias: form.alias,
        email: form.email,
        password: form.password,
        speciality: form.speciality,
      });

      setDone(true);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.message || "No se pudo completar el registro.");
    }

    setSubmitting(false);
  }

  return (
    <main className="page page-center">
      <form className="case-card case-card-form" onSubmit={handleSubmit}>
        <span className="stamp stamp-draft">Nuevo expediente</span>

        <h1>Creá tu identidad</h1>

        <p className="form-subtitle">
          Te recomendamos no usar tu nombre real ;).
        </p>

        <label className="field">
          <span>Alias</span>
          <input
            type="text"
            required
            value={form.alias}
            onChange={(e) =>
              setForm({ ...form, alias: e.target.value })
            }
            placeholder="Ej: DetectivePrivado"
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="tu@ejemplo.com"
          />
        </label>

        <label className="field">
          <span>Especialidad</span>
          <select
            required
            value={form.speciality}
            onChange={(e) =>
              setForm({ ...form, speciality: e.target.value })
            }
          >
            <option value="" disabled>
              Elegí tu especialidad
            </option>

            {SPECIALITIES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Contraseña</span>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </label>

        <label className="field">
          <span>Confirmar contraseña</span>
          <input
            type="password"
            required
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        {done && (
          <p className="form-success">
            Cuenta creada. Redirigiendo a login…
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? "Creando…" : "Crear cuenta"}
        </button>

        <p className="form-footnote">
          ¿Ya tienes una identidad?{" "}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  );
}