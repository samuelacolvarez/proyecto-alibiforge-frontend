import { configureStore } from "@reduxjs/toolkit";
import alibisReducer from "./slices/alibisSlice";
import communityReducer from "./communitySlice.js";

export const store = configureStore({
  reducer: {
    alibis: alibisReducer,
    community: communityReducer,
  },
});