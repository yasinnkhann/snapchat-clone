import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice.js';
import cameraReducer from '../features/cameraSlice.js';

export const store = configureStore({
  reducer: {
    app: appReducer,
    camera: cameraReducer,
  },
});
