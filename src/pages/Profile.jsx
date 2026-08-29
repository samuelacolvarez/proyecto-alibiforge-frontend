import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CredibilityScore from "../components/CredibilityScore";
import { SPECIALITIES } from "../utils/constants";

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [alias, setAlias] = useState(user?.alias || "");
  const [speciality, setSpeciality] = useState(user?.speciality || "");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSave(e) {
    e.preventDefault();

    setError(null);
    setSaving(true);

    try {
      await updateProfile({
        alias: alias,
        speciality: speciality
      });

      setSuccess(true);
      setEditing(false);

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message || "No se pudo guardar el perfil.");
    }

    setSaving(false);
  }

  const blocked = (user?.credibilityScore || 0) < 0;

  const specialityName =
    SPECIALITIES.find((s) => s.value === user?.speciality)?.label || "—";

  return (
    <main className="page">
      <div className="case-card case-card-wide">

        <div className="profile-header">
          <div>
            <span className="stamp stamp-submitted">
              Expediente personal
            </span>
            <h1>{user?.alias}</h1>
          </div>

          <CredibilityScore value={user?.credibilityScore || 0} />
        </div>

        {blocked && (
          <p className="form-error">
            Tu credibilidad está en negativo: no puedes crear coartadas nuevas
            durante 7 días.
          </p>
        )}

        {!editing ? (
          <div className="profile-view">

            <div className="field-static">
              <span>Alias</span>
              <strong>{user?.alias}</strong>
            </div>

            <div className="field-static">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div className="field-static">
              <span>Especialidad</span>
              <strong>{specialityName}</strong>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditing(true)}
            >
              Editar perfil
            </button>

          </div>
        ) : (
          <form className="profile-edit" onSubmit={handleSave}>

            <label className="field">
              <span>Alias</span>

              <input
                type="text"
                required
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </label>

            <label className="field">
              <span>Especialidad</span>

              <select
                required
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                {SPECIALITIES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="page-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Guardando…" : "Guardar cambios"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
            </div>

          </form>
        )}

        {success && (
          <p className="form-success">
            Perfil actualizado.
          </p>
        )}

      </div>
    </main>
  );
}

