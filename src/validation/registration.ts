import { getLangText } from '../services/global';
import { store } from '../store/store';
import { TObjKeyAnyString } from '../types/global';
import { emailRuls, passRuls } from './global';

export const registration = (values: TObjKeyAnyString) => {
  const errors = {
    ...emailRuls(values),
    ...passRuls(values)
  };

  const langObj = store.getState().lang.langObj;

  if (!values.firstName) {
    errors.firstName = getLangText(langObj, "first-name-requared");
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = getLangText(langObj, "pass-repeat-requared");
  } else if (values.repeatPassword!==values.password) {
    errors.repeatPassword = getLangText(langObj, "pass-repeat-incorect");
  }

  return errors;
};