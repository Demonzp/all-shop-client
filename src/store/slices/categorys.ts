import { createSlice } from '@reduxjs/toolkit';
import { createCategory, createSubCategory, editCategory, getCategorys } from '../actions/categorys';
import { IRejectWithValueError } from '../../types/errors';

export interface ICategory{
  nameUA: string,
  nameRU: string,
  nameTranslit: string,
  categorys: ICategory [],
  tableProducts: any []
}

export interface IMainStateCategory {
  categorys: ICategory [];
  errorMessage: string;
  isLoading: boolean;
}

const initialState: IMainStateCategory = {
  categorys: [],
  errorMessage: '',
  isLoading: false
};

const sliceCategorys = createSlice({
  name: 'categorys',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(editCategory.pending, (state) => {
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(editCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(editCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(createSubCategory.pending, (state) => {
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(createSubCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(createSubCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(getCategorys.pending, (state) => {
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(getCategorys.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.categorys = payload;
      state.isLoading = false;
    });

    builder.addCase(getCategorys.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

  }
});

export default sliceCategorys;