import { createAsyncThunk } from '@reduxjs/toolkit';
import CustomValidationError from '../../services/customValidationError';
import { fetchAddProductStructureTable } from '../../services/fetchProductStructureTable';
import { ETypeCustomErrors, ICustomValidationError, IRejectWithValueError, IRejectWithValueValid } from '../../types/errors';
import { TReqTableStructure } from '../../types/reqTypes';
import { ERoles } from '../slices/user';
import { RootState } from '../store';
import { tokenMiddleware } from './user';

export const addProductStructureTable = createAsyncThunk<any, string, {
  state: RootState,
  rejectValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'category/addProductStructureTable',
    async (data, {dispatch, getState, rejectWithValue }) => {
      try {
        const user = getState().user.user;
        if (!user || user.role !== ERoles.ADMIN) {
          throw new Error('No autorize User');
        }

        const reqData: TReqTableStructure = {
          fields: getState().productStructureTable.fields,
          characteristics: getState().productStructureTable.characteristics,
          nameTranslit: data
        }

        const res = await fetchAddProductStructureTable(reqData);
        await dispatch(tokenMiddleware(res));
        return res;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );