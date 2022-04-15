import { createSlice } from "@reduxjs/toolkit";

export enum ERoles {
  ADMIN = 1,
  MODERATOR1 = 2,
  MODERATOR2 = 3,
  USER = 4
}

export interface IUserBase{
  publicId: string;
  role: ERoles;
  firstName: string;
  secondName: string;
  token: string;
}

export interface IUserState {
  user: IUserBase|null;
  isLoading: boolean;
}

const initialState: IUserState = {
  user:null,
  isLoading: false
};

const sliceUser = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
  }
});

export default sliceUser;