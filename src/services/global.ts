import { TObjKeyAnyString } from "../types/global";

const getOptionsFromEnum = <T>(varEnum:T):{value: string, label: string}[]=>{
  let arr = [];
  for (const [key, value] of Object.entries(varEnum)) {
    //console.log(`${key}: ${value}`);
    arr.push({
      value: value.toString(),
      label: key.toString()
    });
  }
  //console.log('arr = ', arr);
  return arr;
};

const getLangText = (objLang:TObjKeyAnyString, key: string):string=>{
  let text = '----//----'
  if(objLang.hasOwnProperty(key)){
    text = objLang[key];
  }
  return text;
}

export{
  getOptionsFromEnum,
  getLangText
}