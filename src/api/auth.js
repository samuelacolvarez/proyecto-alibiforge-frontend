import { api, setToken } from "./client";

export async function register({ alias, email, password, speciality }) {
  return api.post("/auth/register", { alias, email, password, speciality }, { auth: false });
}

export async function login({ identifier, password }) {
  // identifier puede ser email o alias
  const data = await api.post("/auth/login", { identifier, password }, { auth: false });
  if (data?.token) setToken(data.token);
  return data;
}

export async function logout() {
  try {
    await api.post("/auth/logout", {});
  } finally {
    setToken(null);
  }
}

export async function fetchMe() {
  return api.get("/users/me");
}

export async function updateMe({ alias, speciality }) {
  return api.put("/users/me", { alias, speciality });
}
