import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETypeCustomErrors, IRejectWithValueValid } from "../../types/errors";
import { TObjKeyAnyString } from "../../types/global";
import { userReg } from "../actions/user";

export enum ERoles {
  ADMIN = 1,
  MODERATOR1 = 2,
  MODERATOR2 = 3,
  USER = 4
}

export interface IUserBase {
  publicId: string;
  role: ERoles;
  firstName: string;
  secondName: string;
  token: string;
}

export interface IUserState {
  errorsValid: TObjKeyAnyString;
  message: string;
  isReadMessage: boolean;
  errorMessage: string;
  user: IUserBase | null;
  isLoading: boolean;
}

const initialState: IUserState = {
  errorsValid: {},
  message: '',
  isReadMessage: true,
  errorMessage: '',
  user: null,
  isLoading: false
};

const sliceUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsReadMessage(state, action: PayloadAction<boolean>) {
      state.isReadMessage = action.payload;
    },

    clearMessage(state) {
      state.isReadMessage = true;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userReg.pending, (state) => {
      state.errorsValid = {};
      state.isLoading = true;
    });

    builder.addCase(userReg.fulfilled, (state, { payload }) => {
      console.log('payload = ', payload);
      state.message = payload;
      state.isReadMessage = false;
      state.isLoading = false;
    });

    builder.addCase(userReg.rejected, (state, { payload }) => {
      console.log('payload = ', payload);
      if ((payload as IRejectWithValueValid).errorName === ETypeCustomErrors.VALID_ERROR) {
        (payload as IRejectWithValueValid).errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      }
      state.isLoading = false;
    });
  }
});

export const { setIsReadMessage, clearMessage } = sliceUser.actions;

export default sliceUser;