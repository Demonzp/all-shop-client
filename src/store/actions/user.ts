import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosServices from '../../services/axiosServices';
import CustomValidationError from '../../services/customValidationError';
import { fetchGetUser, fetchUserReg, fetchUserSignin } from '../../services/fetchUser';
import { ETypeCustomErrors, ICustomValidationError, IRejectWithValueError, IRejectWithValueValid } from '../../types/errors';
import { TObjKeyAnyString } from '../../types/global';
import { TReqUserReg, TReqUserSignin } from '../../types/reqTypes';
import { IResWhisToken } from '../../types/resTypes';
import { ESex } from '../../types/sex';
import { ERoles, IUserBase } from '../slices/user';
import { RootState } from '../store';

export const tokenMiddleware = createAsyncThunk<string, IResWhisToken, {
  state: RootState,
  rejectWithValue: IRejectWithValueError
}>
  (
    'user/tokenMiddleware',
    async (data, { rejectWithValue }) => {
      try {
        if(data.updatedToken){
          localStorage.setItem('token', data.updatedToken);
          axiosServices.setAuth(data.updatedToken);
          return data.updatedToken;
        }else{
          localStorage.removeItem('token');
          axiosServices.setGuest();
          throw new Error('token dont updated');
        }
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const getUser = createAsyncThunk<IUserBase, undefined, {
  state: RootState,
  rejectWithValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'user/getUser',
    async (_, { dispatch, getState, rejectWithValue }) => {
      try {
        if(getState().user.user){
          throw new Error('');
        }
        
        const res = await fetchGetUser();
        await dispatch(tokenMiddleware(res));
        const user: IUserBase = res.user as IUserBase;

        user.token = res.updatedToken!;
        
        return user;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const userReg = createAsyncThunk<string, TObjKeyAnyString, {
  state: RootState,
  rejectWithValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'user/userReg',
    async (data, { rejectWithValue }) => {
      try {
        let parceData: TReqUserReg = {} as TReqUserReg;
        parceData.email = data.email;
        parceData.firstName = data.firstName;
        parceData.secondName = data.secondName;
        parceData.phoneNumber = data.phoneNumber;
        parceData.birthday = Date.parse(data.birthday);
        parceData.sex = data.sex as ESex;
        parceData.password = data.password;

        const user = await fetchUserReg(parceData);
        return user;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );

export const userSignin = createAsyncThunk<IUserBase, TReqUserSignin, {
  state: RootState,
  rejectWithValue: IRejectWithValueError | IRejectWithValueValid
}>
  (
    'user/userSignin',
    async (data, { rejectWithValue }) => {
      try {
        const user = await fetchUserSignin(data);
        localStorage.setItem('token', user.token);
        console.log('token = ', user.token);
        axiosServices.setAuth(user.token);
        //user.role = ERoles.ADMIN;
        return user;
      } catch (error) {
        const err = error as Error;

        if (err.name === ETypeCustomErrors.VALID_ERROR) {
          return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
        }
        return rejectWithValue({ errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
      }
    }
  );
