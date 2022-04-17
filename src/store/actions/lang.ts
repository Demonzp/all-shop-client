import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLangGlobal } from '../../services/fetchLang';
import { ICustomError } from '../../types/errors';
import { TObjKeyAnyString } from '../../types/global';
import { RootState } from '../store';

export const getLangGlobal = createAsyncThunk<TObjKeyAnyString, string, {
  state: RootState,
  rejectWithValue: ICustomError
}>
  (
    'lang/getLangGlobal',
    async (data, { rejectWithValue }) => {
      try {
        const lang = await fetchLangGlobal(data);
        return lang;
      } catch (error) {
        console.error('error = ', (error as Error).message);
        return rejectWithValue({ message: (error as Error).message });
      }
    }
  );