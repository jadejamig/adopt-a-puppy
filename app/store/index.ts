import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { petApi } from './petApi';
import petSlice from './petSlice';

export const store = configureStore({
    reducer: {
        [petApi.reducerPath]: petApi.reducer,
        petSlice: petSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(petApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;