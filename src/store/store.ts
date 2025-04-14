// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { deliveriesApi } from './deliveryapi.tsx';
import deliveriesReducer from './deliveriesSlice.ts';

export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer under its designated reducerPath
    [deliveriesApi.reducerPath]: deliveriesApi.reducer,
    // Add other reducers here as needed
    deliveries: deliveriesReducer,
  },
  // Adding the API middleware enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deliveriesApi.middleware),
});

// Optional types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
