import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import logger from 'redux-logger'; // Already imported
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'userFingerprint'], // Specify which reducers to persist
};

// Wrap your root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and logger middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed if you're storing non-serializable data
    }).concat(logger), // Add logger to the middleware
});

// Create the persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
