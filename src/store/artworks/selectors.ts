import { createSlice } from '@reduxjs/toolkit';

import { Artwork } from 'src/types/Artwork';

const initialState: ArtworksStateStore = {
  artworks: []
};

export type ArtworksStateStore = {
  artworks: Artwork[];
};

export const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    addArtworks: (state, action) => {
      state.artworks = state.artworks.concat(action.payload.artworks);
    }
  }
});

// Action creators are generated for each case reducer function
export const { addArtworks } = artworksSlice.actions;

export default artworksSlice.reducer;
