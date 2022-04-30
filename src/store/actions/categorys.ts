import { createAsyncThunk } from '@reduxjs/toolkit';
import CustomValidationError from '../../services/customValidationError';
import { fetchCategorys, fetchCreateCategory1, fetchCreateSubCategory, fetchEditCategory } from '../../services/fetchCategoryManag';
import { ETypeCustomErrors, ICustomValidationError, IRejectWithValueError, IRejectWithValueValid } from '../../types/errors';
import { TObjKeyAnyString } from '../../types/global';
import { IReqCreateCategory, IReqCreateSubCategory, IReqEditCategory } from '../../types/reqTypes';
import { ICategory } from '../slices/categorys';
import { ERoles } from '../slices/user';
import { RootState } from '../store';

export const createSubCategory = createAsyncThunk<string, TObjKeyAnyString, {
  state: RootState,
  rejectWithValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/createSubCategory',
    async (data, { getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if (!user || user.role !== ERoles.ADMIN) {
          throw new Error('No autorize User');
        }

        const parceData: IReqCreateSubCategory = {} as IReqCreateSubCategory;

        parceData.categoryId = data.categoryId;
        parceData.nameRU = data.nameRU;
        parceData.nameUA = data.nameUA;
        parceData.translit = data.defaultTranslit;
        if (data.translit.length !== 0) {
          parceData.translit = data.translit;
        }

        const category = await fetchCreateSubCategory(parceData);
        return category;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const editCategory = createAsyncThunk<string, TObjKeyAnyString, {
  state: RootState,
  rejectWithValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/editCategory',
    async (data, { getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if (!user || user.role !== ERoles.ADMIN) {
          throw new Error('No autorize User');
        }

        const parceData: IReqEditCategory = {} as IReqEditCategory;

        parceData.categoryId = data.categoryId;
        parceData.nameRU = data.nameRU;
        parceData.nameUA = data.nameUA;
        parceData.translit = data.defaultTranslit;
        if (data.translit.length !== 0) {
          parceData.translit = data.translit;
        }

        const category = await fetchEditCategory(parceData);
        return category;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const createCategory = createAsyncThunk<string, TObjKeyAnyString, {
  state: RootState,
  rejectWithValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/createCategory',
    async (data, { getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if (!user || user.role !== ERoles.ADMIN) {
          throw new Error('No autorize User');
        }

        const parceData: IReqCreateCategory = {} as IReqCreateCategory;

        parceData.nameRU = data.nameRU;
        parceData.nameUA = data.nameUA;
        parceData.translit = data.defaultTranslit;
        if (data.translit.length !== 0) {
          parceData.translit = data.translit;
        }

        const category = await fetchCreateCategory1(parceData);
        return category;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const getCategorys = createAsyncThunk<ICategory[], undefined, {
  state: RootState,
  rejectWithValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/getCategorys',
    async (_, { rejectWithValue }) => {
      try {
        const categorys = await fetchCategorys();
        return categorys;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );