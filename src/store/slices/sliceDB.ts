import { createSlice } from "@reduxjs/toolkit";

export interface IMain {
  isLoading: boolean;
}

const initialState: IMain = {
  isLoading: false
};

const sliceDB = createSlice({
  name: 'db',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
  }
});

export default sliceDB;