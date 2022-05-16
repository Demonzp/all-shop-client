import { createAsyncThunk } from '@reduxjs/toolkit';
import CustomValidationError from '../../services/customValidationError';
import { fetchCategorys, fetchCreateCategory1, fetchCreateSubCategory, fetchDelCategory, fetchDownCategory, fetchEditCategory, fetchTranserCategory, fetchUpCategory } from '../../services/fetchCategoryManag';
import { ETypeCustomErrors, ICustomValidationError, IRejectWithValueError, IRejectWithValueValid } from '../../types/errors';
import { TObjKeyAnyString } from '../../types/global';
import { IReqCreateCategory, IReqCreateSubCategory, IReqEditCategory, IReqUpDownCategory, TReqDelCategory, TReqTransferCategory } from '../../types/reqTypes';
import { IResUpDownCategory } from '../../types/resTypes';
import { ICategory } from '../slices/categorys';
import { ERoles } from '../slices/user';
import { RootState } from '../store';
import { tokenMiddleware } from './user';

export const createSubCategory = createAsyncThunk<ICategory, TObjKeyAnyString, {
  state: RootState,
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/createSubCategory',
    async (data, {dispatch, getState, rejectWithValue }) => {
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

        const res = await fetchCreateSubCategory(parceData);
        await dispatch(tokenMiddleware(res));
        return res.category;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const editCategory = createAsyncThunk<ICategory, TObjKeyAnyString, {
  state: RootState,
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/editCategory',
    async (data, { dispatch, getState, rejectWithValue }) => {
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

        const res = await fetchEditCategory(parceData);

        await dispatch(tokenMiddleware(res));

        return res.category;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const transferCategory = createAsyncThunk<ICategory, TReqTransferCategory, {
  state: RootState,
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/transferCategory',
    async (data, { dispatch, getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if (!user || user.role !== ERoles.ADMIN) {
          throw new Error('No autorize User');
        }

        const res = await fetchTranserCategory(data);

        await dispatch(tokenMiddleware(res));

        return res.category;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const deleteCategory = createAsyncThunk<string, TReqDelCategory, {
  state: RootState,
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/deleteCategory',
    async (data, { dispatch, getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if (!user || user.role !== ERoles.ADMIN) {
          throw new Error('No autorize User');
        }

        const res = await fetchDelCategory(data);
        await dispatch(tokenMiddleware(res));
        return res.category;
      } catch (error) {
        const err = error as Error;
        console.log('error = ', (err as CustomValidationError<ICustomValidationError>).errors);
        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const downCategory = createAsyncThunk<IResUpDownCategory, IReqUpDownCategory, {
  state: RootState,
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/downCategory',
    async (data, { dispatch, getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if (!user || user.role !== ERoles.ADMIN) {
          throw new Error('No autorize User');
        }

        const res = await fetchDownCategory(data);
        await dispatch(tokenMiddleware(res));
        return res;
      } catch (error) {
        const err = error as Error;
        console.log('error = ', (err as CustomValidationError<ICustomValidationError>).errors);
        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const upCategory = createAsyncThunk<IResUpDownCategory, IReqUpDownCategory, {
  state: RootState,
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/upCategory',
    async (data, { dispatch, getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if (!user || user.role !== ERoles.ADMIN) {
          throw new Error('No autorize User');
        }

        const res = await fetchUpCategory(data);

        await dispatch(tokenMiddleware(res));

        return res;
      } catch (error) {
        const err = error as Error;
        console.log('error = ', (err as CustomValidationError<ICustomValidationError>).errors);
        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const createCategory = createAsyncThunk<ICategory, TObjKeyAnyString, {
  state: RootState,
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/createCategory',
    async (data, {dispatch, getState, rejectWithValue }) => {
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

        const res = await fetchCreateCategory1(parceData);
        await dispatch(tokenMiddleware(res));
        return res.category;
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
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/getCategorys',
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetchCategorys();
        return res.categorys;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );