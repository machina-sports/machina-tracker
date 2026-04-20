import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
  id: string;
  name: string;
  sport: string;
}

interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<Client[]>) {
      state.clients = action.payload;
    },
    addClient(state, action: PayloadAction<Client>) {
      state.clients.push(action.payload);
    },
  },
});

export const { setClients, addClient } = clientsSlice.actions;

export default clientsSlice.reducer;
