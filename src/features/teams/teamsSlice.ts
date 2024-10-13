import { createSlice, createAsyncThunk, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface Team {
  id: number;
  teamName: string;
}

const teamsAdapter = createEntityAdapter<Team>();

interface TeamsState extends EntityState<Team, number> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState = teamsAdapter.getInitialState({
  status: 'idle',
  error: null,
} as TeamsState);

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
  const response = await fetch('http://localhost:3001/api/teams', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch teams');
  }
  return response.json();
});

export const addTeam = createAsyncThunk(
    'teams/addTeam',
    async ({ teamName }: { teamName: string }) => {
      const response = await fetch('http://localhost:3001/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName }),
      });
      if (!response.ok) {
        throw new Error('Failed to add team');
      }
      return response.json();
    }
  );
  
  export const joinTeam = createAsyncThunk(
    'teams/joinTeam',
    async ({ teamCode }: { teamCode: string }) => {
      const response = await fetch('http://localhost:3001/api/teams/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamCode }),
      });
      if (!response.ok) {
        throw new Error('Failed to join team');
      }
      return response.json();
    }
  );
  
  export const updateTeam = createAsyncThunk(
    'teams/updateTeam',
    async ({ id, teamName }: { id: number; teamName: string }) => {
      const response = await fetch(`http://localhost:3001/api/teams/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName }),
      });
      if (!response.ok) {
        throw new Error('Failed to update team');
      }
      return response.json();
    }
  );

  const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTeams.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTeams.fulfilled, (state, action) => {
          state.status = 'succeeded';
          teamsAdapter.setAll(state, action.payload);
        })
        .addCase(fetchTeams.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || null;
        })
        .addCase(addTeam.fulfilled, (state, action) => {
          teamsAdapter.addOne(state, action.payload);
        })
        .addCase(joinTeam.fulfilled, (state, action) => {
          teamsAdapter.addOne(state, action.payload);
        })
        .addCase(updateTeam.fulfilled, (state, action) => {
          teamsAdapter.updateOne(state, { id: action.payload.id, changes: action.payload });
        });
    },
  });

export const {
  selectAll: selectAllTeams,
  selectById: selectTeamById,
  selectIds: selectTeamIds,
} = teamsAdapter.getSelectors<RootState>((state) => state.teams);

export const selectTeamsStatus = (state: RootState) => state.teams.status;
export const selectTeamsError = (state: RootState) => state.teams.error;

export default teamsSlice.reducer;
