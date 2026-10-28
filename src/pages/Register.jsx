import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SPECIALITIES } from "../utils/constants";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!form.speciality) {
      setError("Elegí una especialidad.");
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
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message || "No se pudo completar el registro.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page page-center">
      <form className="case-card case-card-form" onSubmit={handleSubmit}>
        <span className="stamp stamp-draft">Nuevo expediente</span>
        <h1>Creá tu identidad</h1>
        <p className="form-subtitle">Te recomendamos usar un alias que refleje tu personalidad.</p>

        <label className="field">
          <span>Alias</span>
          <input type="text" required value={form.alias} onChange={update("alias")} placeholder="ElMaestroDeLasExcusas" />
        </label>

        <label className="field">
          <span>Email</span>
          <input type="email" required value={form.email} onChange={update("email")} placeholder="vos@ejemplo.com" />
        </label>

        <label className="field">
          <span>Especialidad</span>
          <select required value={form.speciality} onChange={update("speciality")}>
            <option value="" disabled>Elegí tu especialidad</option>
            {SPECIALITIES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Contraseña</span>
          <div className="field-password">
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={form.password}
              onChange={update("password")}
            />
            <button
              type="button"
              className="field-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <PiEyeSlashLight aria-hidden="true" /> : <PiEyeLight aria-hidden="true" />}
            </button>
          </div>
        </label>

        <label className="field">
          <span>Confirmar contraseña</span>
          <div className="field-password">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
            />
            <button
              type="button"
              className="field-toggle"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showConfirmPassword ? <PiEyeSlashLight aria-hidden="true" /> : <PiEyeLight aria-hidden="true" />}
            </button>
          </div>
        </label>

        {error && <p className="form-error">{error}</p>}
        {done && <p className="form-success">Cuenta creada. Redirigiendo a login…</p>}

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Creando…" : "Crear cuenta"}
        </button>

        <p className="form-footnote">
          ¿Ya tenés una identidad? <Link to="/register">Inicia sesión</Link>
        </p>
      </form>
    </main>
  );
}