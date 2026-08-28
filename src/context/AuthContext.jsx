import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken as persistToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  async function loadMe() {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const me = await authApi.fetchMe();
      setUser(me);
    } catch (error) {
      persistToken(null);
      setUser(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMe();
  }, []);

  async function login(credentials) {
    setAuthError(null);

    const data = await authApi.login(credentials);

    if (data && data.user) {
      setUser(data.user);
    } else {
      await loadMe();
    }

    return data;
  }

  async function register(payload) {
    setAuthError(null);

    const data = await authApi.register(payload);

    return data;
  }

  async function logout() {
    await authApi.logout();
    setUser(null);
  }

  async function updateProfile(payload) {
    const updated = await authApi.updateMe(payload);

    setUser((prev) => {
      return {
        ...prev,
        ...updated
      };
    });

    return updated;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        setAuthError,
        login,
        register,
        logout,
        updateProfile,
        refresh: loadMe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }

  return ctx;
}