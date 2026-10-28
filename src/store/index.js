import { configureStore } from "@reduxjs/toolkit";
import alibisReducer from "./slices/alibisSlice";

export const store = configureStore({
  reducer: {
    alibis: alibisReducer,
  },
});