import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listAlibis,
  getAlibi,
  createAlibi,
  addAlibiDetail,
  submitAlibi,
} from "../../api/alibis";

// Thunk: cargar coartadas (acepta { owner, state, limit })
export const cargarAlibis = createAsyncThunk(
  "alibis/cargar",
  async (params, { rejectWithValue }) => {
    try {
      const data = await listAlibis(params);
      return Array.isArray(data) ? data : data?.items || [];
    } catch (e) {
      return rejectWithValue(e.message || "No se pudieron cargar las coartadas.");
    }
  }
);

// Thunk: crear coartada con sus detalles y, si se pide, enviarla
export const crearAlibi = createAsyncThunk(
  "alibis/crear",
  async ({ title, situation, story, details, enviar }, { rejectWithValue }) => {
    try {
      const alibi = await createAlibi({ title, situation, story });
      for (const detail of details) {
        await addAlibiDetail(alibi.id, detail);
      }
      return enviar ? await submitAlibi(alibi.id) : await getAlibi(alibi.id);
    } catch (e) {
      return rejectWithValue(e.message || "No se pudo guardar la coartada.");
    }
  }
);

// Thunk: eliminar un borrador
export const eliminarAlibi = createAsyncThunk(
  "alibis/eliminar",
  async (id, { rejectWithValue }) => {
    try {
      await deleteAlibi(id);
      return id;
    } catch (e) {
      return rejectWithValue(e.message || "No se pudo eliminar la coartada.");
    }
  }
);

const alibisSlice = createSlice({
  name: "alibis",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    limpiarError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cargarAlibis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cargarAlibis.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(cargarAlibis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(crearAlibi.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
        .addCase(eliminarAlibi.fulfilled, (state, action) => {
        state.items = state.items.filter((alibi) => alibi.id !== action.payload);
      });
  },
});

export const { limpiarError } = alibisSlice.actions;
export default alibisSlice.reducer;