import { ESex } from './sex';

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