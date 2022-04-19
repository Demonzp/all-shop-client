import { createSlice } from "@reduxjs/toolkit";

export interface ICategory{
  id: string,
  nameUA: string,
  nameRU: string,
  translit: string
}

export interface IMainStateCategory {
  categorys: any[];
  isLoading: boolean;
}

const initialState: IMainStateCategory = {
  categorys: [],
  isLoading: false
};

const sliceCategorys = createSlice({
  name: 'categorys',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    
  }
});

export default sliceCategorys;