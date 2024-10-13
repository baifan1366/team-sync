import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectSlice';
import teamsReducer from '../features/teams/teamsSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    teams: teamsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
