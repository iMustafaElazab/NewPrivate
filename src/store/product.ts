import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Banner, HomeResponse, Product} from 'types/api';
import BaseResponse from 'types/api/BaseResponse';

interface HomeState {
  products?: Product[];
  banners?: Banner[];
  ads?: string;
  homeError?: string;
}
const initialState = {
  products: undefined,
  banners: undefined,
  ads: undefined,
  errorHome: undefined,
} as HomeState;

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getHomeResult(state, action: PayloadAction<BaseResponse<HomeResponse>>) {
      state.products = action.payload.data?.products;
      state.banners = action.payload.data?.banners;
      state.ads = action.payload.data?.ad;
      state.homeError = action.payload.message;
    },
  },
});
export const {getHomeResult} = homeSlice.actions;
export default homeSlice.reducer;
