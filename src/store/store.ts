import { configureStore } from '@reduxjs/toolkit';
import { deliveriesApi } from './deliveryapi.tsx';
import deliveriesReducer from './deliveriesSlice.ts';

export const store = configureStore({
  reducer: {
    [deliveriesApi.reducerPath]: deliveriesApi.reducer,
    deliveries: deliveriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deliveriesApi.middleware),
});

// Optional types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
