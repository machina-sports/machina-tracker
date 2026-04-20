
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './slices/clientsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      clients: clientsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
