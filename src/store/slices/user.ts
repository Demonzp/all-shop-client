import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETypeCustomErrors, IRejectWithValueError, IRejectWithValueValid } from "../../types/errors";
import { TObjKeyAnyString } from "../../types/global";
import { userReg, userSignin } from "../actions/user";

export enum ERoles {
  ADMIN = 'admin',
  MODERATOR1 = 'moderator1',
  MODERATOR2 = 'moderator2',
  USER = 'user'
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
  user: {
    publicId:'dawd',
    role: ERoles.ADMIN,
    firstName: 'Frfr',
    secondName: '',
    token: 'raesgresg'
  },
  isLoading: false
};

const sliceUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsReadMessage(state, action: PayloadAction<boolean>) {
      state.isReadMessage = action.payload;
    },

    clearAllMessage(state) {
      state.isReadMessage = true;
      state.message = '';
      state.errorMessage = '';
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
      }else{
        state.errorMessage = (payload as IRejectWithValueError).message;
      }
      state.isLoading = false;
    });

    builder.addCase(userSignin.pending, (state) => {
      state.errorMessage = '';
      state.message = '';
      state.errorsValid = {};
      state.isLoading = true;
    });

    builder.addCase(userSignin.fulfilled, (state, { payload }) => {
      console.log('payload = ', payload);
      state.user = payload;
      state.isLoading = false;
    });

    builder.addCase(userSignin.rejected, (state, { payload }) => {
      console.log('payload = ', payload);
      if ((payload as IRejectWithValueValid).errorName === ETypeCustomErrors.VALID_ERROR) {
        (payload as IRejectWithValueValid).errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      }else{
        state.errorMessage = (payload as IRejectWithValueError).message;
      }
      state.isLoading = false;
    });
  }
});

export const { setIsReadMessage, clearAllMessage } = sliceUser.actions;

export default sliceUser;