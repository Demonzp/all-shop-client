import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomError } from '../../types/errors';
import { TObjKeyAnyString } from '../../types/global';
import { ELangs } from '../../types/langs';
import { getLangGlobal } from '../actions/lang';

export interface ILangState {
  langObj: TObjKeyAnyString;
  lang: ELangs;
  isLoading: boolean;
}

const initialState: ILangState = {
  langObj: {},
  lang: ELangs.RU,
  isLoading: false
};

const sliceLang = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<ELangs>) {
      state.lang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLangGlobal.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getLangGlobal.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.langObj = payload;
      state.isLoading = false;
    });

    builder.addCase(getLangGlobal.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { setLang } = sliceLang.actions;

export default sliceLang;