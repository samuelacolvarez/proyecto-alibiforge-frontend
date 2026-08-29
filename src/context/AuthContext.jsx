import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext(null);

const MOCK_USER_KEY = "alibiforge_mock_user";
const MOCK_ACCOUNTS_KEY = "alibiforge_mock_accounts";

function loadMockUser() {
  const raw = localStorage.getItem(MOCK_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function loadMockAccounts() {
  const raw = localStorage.getItem(MOCK_ACCOUNTS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function findMockAccount(identifier) {
  const accounts = loadMockAccounts();
  return accounts[identifier?.toLowerCase()] || null;
}

function saveMockAccount({ alias, email, speciality }) {
  const accounts = loadMockAccounts();
  const account = { alias, email, speciality };
  accounts[email?.toLowerCase()] = account;
  accounts[alias?.toLowerCase()] = account;
  localStorage.setItem(MOCK_ACCOUNTS_KEY, JSON.stringify(accounts));
}

function saveMockUser(user) {
  if (user) localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(MOCK_USER_KEY);
}

function fakeDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const loadMe = useCallback(async () => {
    await fakeDelay(150);
    setUser(loadMockUser());
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga inicial de sesión simulada
    loadMe();
  }, [loadMe]);

    async function login({ identifier }) {
    setAuthError(null);
    await fakeDelay();
    const found = findMockAccount(identifier);
    const fakeUser = {
      id: 1,
      alias: found?.alias || identifier || "usuarioDePrueba",
      email: found?.email || `${identifier || "test"}@ejemplo.com`,
      speciality: found?.speciality || "CreativeExcuse",
      credibilityScore: 12,
    };
    saveMockUser(fakeUser);
    setUser(fakeUser);
    return { user: fakeUser };
  }

  async function register({ alias, email, speciality }) {
    setAuthError(null);
    await fakeDelay();
    saveMockAccount({ alias, email, speciality });
    console.log("Registro (mock):", { alias, email, speciality });
    return { alias, email, speciality };
  }

  async function logout() {
    await fakeDelay(150);
    saveMockUser(null);
    setUser(null);
  }

  async function updateProfile(payload) {
    await fakeDelay();
    const updated = { ...user, ...payload };
    saveMockUser(updated);
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