import { configureStore } from '@reduxjs/toolkit'
import communityReducer from './communitySlice.js'

export const store = configureStore({
  reducer: {
    community: communityReducer,
  },
})
