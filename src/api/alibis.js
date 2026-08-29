import { estimateComplexityScore } from "../utils/constants";

const STORE_KEY = "alibiforge_mock_alibis";
const USER_KEY = "alibiforge_mock_user";

function currentUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function loadStore() {
  const raw = localStorage.getItem(STORE_KEY);
  if (raw) return JSON.parse(raw);
  const seed = [
    {
      id: 1,
      ownerId: 1,
      title: "La cita con el dentista",
      situation: "Llegué tarde al parcial de Ingeniería Web",
      story: "Tuve una emergencia dental esa mañana y no pude avisar antes...",
      state: "Submitted",
      details: ["Tengo el ticket de la clínica con hora", "El dentista puede confirmar", "Foto de la sala de espera"],
      complexityScore: estimateComplexityScore(3),
      witnesses: [{ id: 2, alias: "TestigoFiel" }],
    },
    {
      id: 2,
      ownerId: 2,
      title: "El semestre perdido",
      situation: "No entregué el proyecto final a tiempo",
      story: "Se me rompió la laptop justo la noche anterior a la entrega...",
      state: "Approved",
      details: ["Factura del service técnico", "Captura del chat con soporte", "Testigo que vio la laptop rota", "Backup incompleto en el drive", "Mensaje al profe avisando"],
      complexityScore: estimateComplexityScore(5),
      witnesses: [{ id: 1, alias: "usuarioDePrueba" }, { id: 3, alias: "OtroTestigo" }],
    },
    {
      id: 3,
      ownerId: 1,
      title: "El vuelo cancelado",
      situation: "Falté a la presentación grupal",
      story: "Mi vuelo de vuelta se canceló por mal clima...",
      state: "Draft",
      details: ["Mail de la aerolínea"],
      complexityScore: estimateComplexityScore(1),
      witnesses: [],
    },
  ];
  localStorage.setItem(STORE_KEY, JSON.stringify(seed));
  return seed;
}

function saveStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function fakeDelay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toCard(alibi) {
  return { ...alibi, witnessCount: alibi.witnesses.length, detailCount: alibi.details.length };
}

export async function listAlibis(params = {}) {
  await fakeDelay();
  let items = loadStore();

  if (params.owner === "me") {
    const user = currentUser();
    items = items.filter((a) => a.ownerId === user?.id);
  }
  if (params.state) {
    items = items.filter((a) => a.state === params.state);
  }
  if (params.limit) {
    items = items.slice(0, Number(params.limit));
  }
  return items.map(toCard);
}

export async function getAlibi(id) {
  await fakeDelay();
  const alibi = loadStore().find((a) => String(a.id) === String(id));
  if (!alibi) throw new Error("Coartada no encontrada.");
  return toCard(alibi);
}

export async function createAlibi({ title, situation, story }) {
  await fakeDelay();
  const store = loadStore();
  const user = currentUser();
  const newAlibi = {
    id: Date.now(),
    ownerId: user?.id ?? 1,
    title,
    situation,
    story,
    state: "Draft",
    details: [],
    complexityScore: 0,
    witnesses: [],
  };
  store.push(newAlibi);
  saveStore(store);
  return toCard(newAlibi);
}

export async function updateAlibi(id, payload) {
  await fakeDelay();
  const store = loadStore();
  const alibi = store.find((a) => String(a.id) === String(id));
  if (!alibi) throw new Error("Coartada no encontrada.");
  Object.assign(alibi, payload);
  saveStore(store);
  return toCard(alibi);
}

export async function addAlibiDetail(id, detail) {
  await fakeDelay(150);
  const store = loadStore();
  const alibi = store.find((a) => String(a.id) === String(id));
  if (!alibi) throw new Error("Coartada no encontrada.");
  alibi.details.push(detail);
  alibi.complexityScore = estimateComplexityScore(alibi.details.length);
  saveStore(store);
  return toCard(alibi);
}

export async function submitAlibi(id) {
  await fakeDelay();
  const store = loadStore();
  const alibi = store.find((a) => String(a.id) === String(id));
  if (!alibi) throw new Error("Coartada no encontrada.");
  alibi.state = "Submitted";
  saveStore(store);
  return toCard(alibi);
}

export async function getWitnesses(id) {
  await fakeDelay(150);
  const alibi = loadStore().find((a) => String(a.id) === String(id));
  return alibi?.witnesses || [];
}

export async function joinAsWitness(id) {
  await fakeDelay();
  const store = loadStore();
  const alibi = store.find((a) => String(a.id) === String(id));
  const user = currentUser();
  if (!alibi || !user) return;
  if (!alibi.witnesses.some((w) => w.id === user.id)) {
    alibi.witnesses.push({ id: user.id, alias: user.alias });
  }
  saveStore(store);
  return alibi.witnesses;
}

export async function defectAsWitness(id) {
  await fakeDelay();
  const store = loadStore();
  const alibi = store.find((a) => String(a.id) === String(id));
  const user = currentUser();
  if (!alibi || !user) return;
  alibi.witnesses = alibi.witnesses.filter((w) => w.id !== user.id);
  saveStore(store);
  return alibi.witnesses;
}