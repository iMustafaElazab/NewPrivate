import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {User} from 'types';
import BaseResponse from 'types/api/BaseResponse';
import Profile from 'types/api/ProfileResponse';

interface UserState {
  user?: User;
  profile?: Profile;
  api_key?: string;
}

const initialState = {
  user: undefined,
  profile: undefined,
  api_key: undefined,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = undefined;
    },
    setProfile(state, action: PayloadAction<BaseResponse<Profile>>) {
      state.profile = action.payload.data;
    },
    setApiKey(state, action) {
      state.api_key = action.payload.api_key;
    },
  },
});

export const {setUser, removeUser, setProfile, setApiKey} = userSlice.actions;

export default userSlice.reducer;
