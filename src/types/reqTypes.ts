import { ESex } from './sex';

export interface IReqCreateCategory {
  nameUA: string;
  translit: string;
  nameRU: string;
}

export interface IReqCreateSubCategory extends IReqCreateCategory{
  path: string;
}

export type TReqUserReg = {
  email: string,
  firstName: string,
  secondName: string,
  phoneNumber: string,
  sex: ESex,
  birthday: number,
  password: string
}

export type TReqUserSignin = {
  login: string,
  password: string
}