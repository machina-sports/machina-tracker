
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getClientRoster } from '@/src/lib/clients/roster';
import { getClientPulse } from '@/src/lib/clients/signals';

export interface Client {
  id: string;
  name: string;
  slug: string;
  sport: 'football';
  league: string;
  country: string; // ISO-3
  crestUrl: string;
  venue?: string;
  externalIds: {
    footballData?: number;
    instagram?: string;
  };
}

export interface ClientPulse {
    heatScore: number;
    heatDelta: number;
    lastAnalyzedAt: string;
    latestSignal: string;
}

export interface ClientsState {
  clients: Client[];
  clientsPulse: Record<string, ClientPulse>;
  selectedClientId: string | null;
  searchQuery: string;
  sportFilter: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  clientsPulse: {},
  selectedClientId: null,
  searchQuery: '',
  sportFilter: 'all',
  status: 'idle',
  error: null,
};

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const response = await getClientRoster();
    return response;
});

export const fetchClientPulse = createAsyncThunk('clients/fetchClientPulse', async (clientId: string) => {
    const response = await getClientPulse(clientId);
    return { clientId, pulse: response };
});


export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    selectClient: (state, action: PayloadAction<string>) => {
      state.selectedClientId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSportFilter: (state, action: PayloadAction<string>) => {
      state.sportFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
        if (!state.selectedClientId && action.payload.length > 0) {
            state.selectedClientId = action.payload[0].id;
        }
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch clients';
      })
      .addCase(fetchClientPulse.fulfilled, (state, action) => {
        state.clientsPulse[action.payload.clientId] = action.payload.pulse;
      });
  },
});

export const { selectClient, setSearchQuery, setSportFilter } = clientsSlice.actions;

export const selectAllClients = (state: RootState) => state.clients.clients;
export const selectSelectedClientId = (state: RootState) => state.clients.selectedClientId;
export const selectSearchQuery = (state: RootState) => state.clients.searchQuery;
export const selectSportFilter = (state: RootState) => state.clients.sportFilter;
export const selectClientsStatus = (state: RootState) => state.clients.status;
export const selectClientPulse = (clientId: string) => (state: RootState) => state.clients.clientsPulse[clientId];


export default clientsSlice.reducer;
