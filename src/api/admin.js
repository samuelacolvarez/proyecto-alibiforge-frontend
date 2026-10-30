import { api } from "./client";

// Endpoints exclusivos del administrador (el backend responde 403 a otros roles).
export function listUsers() {
  return api.get("/users");
}

export function deleteSituation(id) {
  return api.del(`/api/situations/${id}`);
}
