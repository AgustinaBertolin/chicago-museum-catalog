import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import artworksReducer, { ArtworksStateStore } from './artworks/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favoritesReducer, { FavoritesStateStore } from './favorites/selectors';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'],
  blacklist: [],
  timeout: undefined
};

const rootReducer = combineReducers({
  artworks: artworksReducer,
  favorites: favoritesReducer
});

const presistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedReducer,
  middleware: (
    getDefaultMiddleware: (arg0: {
      serializableCheck: {
        ignoredActions: (
          | 'persist/FLUSH'
          | 'persist/REHYDRATE'
          | 'persist/PAUSE'
          | 'persist/PERSIST'
          | 'persist/PURGE'
          | 'persist/REGISTER'
        )[];
      };
    }) => any
  ) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type StoreTypes = {
  artworks: ArtworksStateStore;
  favorites: FavoritesStateStore;
};
