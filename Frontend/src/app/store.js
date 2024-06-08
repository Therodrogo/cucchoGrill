import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slides/example.js';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
});
