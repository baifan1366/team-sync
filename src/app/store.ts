import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;