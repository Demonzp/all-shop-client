import { TObjKeyAnyString } from '../types/global';
import {store} from '../store/store';
import { getLangText } from '../services/global';

export const numPassChars = 3;

export const emailRuls = (values: TObjKeyAnyString) => {
  const errors: TObjKeyAnyString = {};
  const langObj = store.getState().lang.langObj;
  if (!values.email) {
    errors.email = getLangText(langObj, "email-requared");
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = getLangText(langObj, "email-incorect");
  }

  return errors;
}

export const passRuls = (values: TObjKeyAnyString) => {
  const errors: TObjKeyAnyString = {};
  const langObj = store.getState().lang.langObj;
  
  //console.log('reg = ',values.password.match(/\d*\w*/));
  if (!values.password) {
    errors.password = getLangText(langObj, "pass-requared");
  } else if (values.password.length < numPassChars) {
    errors.password = getLangText(langObj, "pass-min") + numPassChars;
  } else {
    const reg = values.password.match(/\d*\w*/);
    if(values.password!==reg![0]){
      errors.password = getLangText(langObj, "pass-incorect");
    }
  }

  return errors;
}

export const uaMobPhoneRuls = (values: TObjKeyAnyString)=>{
  const errors: TObjKeyAnyString = {};
  const langObj = store.getState().lang.langObj;
  
  if(!values.phoneNumber){
    errors.phoneNumber = getLangText(langObj, "phone-requared");
  }else{
    const number = values.phoneNumber.replace(/\D/g, "");
    if(number.length>9||number.length<9){
      errors.phoneNumber = getLangText(langObj, "phone-incorect");
    }
  }

  return errors;
}