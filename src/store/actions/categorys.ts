import { createAsyncThunk } from '@reduxjs/toolkit';
import CustomValidationError from '../../services/customValidationError';
import { fetchCreateCategory1 } from '../../services/fetchCategoryManag';
import { ETypeCustomErrors, ICustomValidationError, IRejectWithValueError, IRejectWithValueValid } from '../../types/errors';
import { TObjKeyAnyString } from '../../types/global';
import { TReqCreateCategory } from '../../types/reqTypes';
import { ERoles } from '../slices/user';
import { RootState } from '../store';

export const createCategory = createAsyncThunk<string, TObjKeyAnyString, {
  state: RootState,
  rejectWithValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/createCategory',
    async (data, {getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if(!user || user.role!==ERoles.ADMIN){
          throw new Error('No autorize User'); 
        }
        const token = getState().user.user!.token;

        const parceData: TReqCreateCategory = {} as TReqCreateCategory;

        parceData.nameRU = data.nameRU;
        parceData.nameUA = data.nameUA;
        parceData.translit = data.translit;
        parceData.token = token;

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