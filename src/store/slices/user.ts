import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETypeCustomErrors, IRejectWithValueError, IRejectWithValueValid } from "../../types/errors";
import { TObjKeyAnyString } from "../../types/global";
import { getUser, tokenMiddleware, userReg, userSignin } from "../actions/user";

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
  isAtempted: boolean;
}
// {
//   publicId:'dawd',
//   role: ERoles.ADMIN,
//   firstName: 'Frfr',
//   secondName: '',
//   token: 'raesgresg'
// }
const initialState: IUserState = {
  errorsValid: {},
  message: '',
  isReadMessage: true,
  errorMessage: '',
  user: null,
  isLoading: true,
  isAtempted: false
};

const sliceUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGuest(state){
      state.isLoading = false;
      state.isAtempted = true;
    },

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

    builder.addCase(tokenMiddleware.fulfilled, (state, { payload }) => {
      if(state.user){
        state.user.token = payload;
      }
    });

    builder.addCase(tokenMiddleware.rejected, (state, { payload }) => {
      state.user = null;
      state.isAtempted = true;
      state.isLoading = false;
    });

    builder.addCase(getUser.pending, (state) => {
      state.errorsValid = {};
      state.isLoading = true;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.user = payload;
      state.isReadMessage = false;
      state.isLoading = false;
      state.isAtempted = true;
    });

    builder.addCase(getUser.rejected, (state, { payload }) => {
      console.log('payload = ', payload);
      if ((payload as IRejectWithValueValid).errorName === ETypeCustomErrors.VALID_ERROR) {
        (payload as IRejectWithValueValid).errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      }else{
        state.errorMessage = (payload as IRejectWithValueError).message;
      }
      state.isAtempted = true;
      state.isLoading = false;
    });

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

export const { setGuest, setIsReadMessage, clearAllMessage } = sliceUser.actions;

export default sliceUser;