import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Banner, HomeResponse, Product} from 'types/api';

interface HomeState {
  products?: Product[];
  banners?: Banner[];
  ads?: string;
}
const initialState = {
  products: undefined,
  banners: undefined,
  ads: undefined,
} as HomeState;

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getHomeResult(state, action: PayloadAction<HomeResponse>) {
      state.products = action.payload.products;
      state.banners = action.payload.banners;
      state.ads = action.payload.ad;
    },
  },
});
export const {getHomeResult} = homeSlice.actions;
export default homeSlice.reducer;
