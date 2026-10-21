import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as authApi from "../api/auth";
import { getToken, setToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Al abrir la app: si hay token guardado, se pide el perfil al backend.
  const loadMe = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setUser(await authApi.fetchMe());
    } catch {
      // Token vencido o inválido: se limpia la sesión.
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga inicial de sesión
    loadMe();
  }, [loadMe]);

  async function login({ identifier, password }) {
    setAuthError(null);
    try {
      const data = await authApi.login({ identifier, password });
      setUser(data.user);
      return data;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  }

  async function register({ alias, email, password, speciality }) {
    setAuthError(null);
    try {
      return await authApi.register({ alias, email, password, speciality });
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      setToken(null);
      setUser(null);
    }
  }

  async function updateProfile({ alias, speciality }) {
    const updated = await authApi.updateMe({ alias, speciality });
    setUser(updated);
    return updated;
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, authError, setAuthError, login, register, logout, updateProfile, refresh: loadMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components -- hook compañero del provider, patrón estándar de contexto
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}