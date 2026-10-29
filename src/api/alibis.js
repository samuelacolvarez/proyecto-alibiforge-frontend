import { api } from "./client";

// Arma "?owner=me&state=Draft" ignorando los parámetros vacíos.
function toQuery(params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  }
  const text = query.toString();
  return text ? `?${text}` : "";
}

export function listAlibis(params = {}) {
  return api.get(`/alibis${toQuery(params)}`);
}

export function getAlibi(id) {
  return api.get(`/alibis/${id}`);
}

export function createAlibi({ title, situation, story }) {
  return api.post("/alibis", { title, situation, story });
}

export function updateAlibi(id, payload) {
  return api.put(`/alibis/${id}`, payload);
}

export function addAlibiDetail(id, detail) {
  return api.post(`/alibis/${id}/details`, { detail });
}

export function submitAlibi(id) {
  return api.post(`/alibis/${id}/submit`, {});
}

export function getWitnesses(id) {
  return api.get(`/alibis/${id}/witnesses`);
}

export function joinAsWitness(id) {
  return api.post(`/alibis/${id}/witnesses`, {});
}

export function defectAsWitness(id) {
  return api.del(`/alibis/${id}/witnesses/me`);
}

export function deleteAlibi(id) {
  return api.del(`/alibis/${id}`);
}