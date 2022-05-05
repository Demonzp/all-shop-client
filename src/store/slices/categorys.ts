import { createSlice } from '@reduxjs/toolkit';
import { createCategory, createSubCategory, deleteCategory, editCategory, getCategorys, transferCategory } from '../actions/categorys';
import { ETypeCustomErrors, IRejectWithValueError, IRejectWithValueValid } from '../../types/errors';
import { TObjKeyAnyString } from '../../types/global';

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
  errorsValid: TObjKeyAnyString;
  isLoading: boolean;
}

const initialState: IMainStateCategory = {
  categorys: [],
  errorsValid: {},
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
      state.errorsValid = {};
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
      state.errorsValid = {};
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

    builder.addCase(transferCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(transferCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(transferCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(deleteCategory.rejected, (state, { payload }) => {
      console.log('payload = ', payload);
      if ((payload as IRejectWithValueValid).errorName === ETypeCustomErrors.VALID_ERROR) {
        (payload as IRejectWithValueValid).errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      }else{
        state.errorMessage = (payload as IRejectWithValueError).message;
      }
      console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(createSubCategory.pending, (state) => {
      state.errorsValid = {};
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
      state.errorsValid = {};
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