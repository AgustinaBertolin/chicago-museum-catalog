import { createSlice } from '@reduxjs/toolkit';

const initialState: FavoritesStateStore = {
  favorites: [],
};

export type FavoritesStateStore = {
  favorites: Array<string>
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const oldFavorites = [...state.favorites]
      oldFavorites.push(action.payload.id)
      state.favorites = oldFavorites
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload.id)
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  addFavorite,
  removeFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
