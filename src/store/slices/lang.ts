import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TObjKeyAnyString } from '../../types/global';
import { ELangs } from '../../types/langs';

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
  }
});

export const { setLang } = sliceLang.actions;

export default sliceLang;