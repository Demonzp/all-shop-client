import { getLangText } from '../services/global';
import { store } from '../store/store';
import { TObjKeyAnyString } from '../types/global';

export const createCategoryRuls = (values: TObjKeyAnyString) => {
  const errors: TObjKeyAnyString = {};
  const langObj = store.getState().lang.langObj;
  
  //console.log('reg = ',values.password.match(/\d*\w*/));
  if (!values.nameUA || values.nameUA.length<=0) {
    errors.nameUA = getLangText(langObj, "create-category-name-req");
  }

  if(values.translit){
    const reg = values.translit.match(/([a-zA-Z]*_*[a-zA-Z]*)*/);
    if(reg![0]!==values.translit){
      errors.translit = getLangText(langObj, "create-category-name-trans");
    }
  }

  if (!values.nameRU || values.nameRU.length<=0) {
    errors.nameRU = getLangText(langObj, "create-category-name-req");
  }

  return errors;
}