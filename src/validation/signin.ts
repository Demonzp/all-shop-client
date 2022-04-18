import { getLangText } from '../services/global';
import { store } from '../store/store';
import { TObjKeyAnyString } from '../types/global';
import { passRuls } from './global';

export const signin = (values: TObjKeyAnyString) => {
  const errors = {
    ...passRuls(values)
  };

  const langObj = store.getState().lang.langObj;

  if (!values.login) {
    errors.login = getLangText(langObj, "sign-in-login-requared");
  }else if(values.login.length<4){
    errors.login = getLangText(langObj, "sign-in-login-incorect");
  }

  return errors;
};