import { TObjKeyAnyString } from '../types/global';

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

const createId = (length: number, arrSymbals?: string []):string => {
  const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  let addChars: string[] = [];
  let id = '';

  if(Array.isArray(arrSymbals)){
    addChars = arrSymbals;
  }

  const fullChars = [...chars, ...addChars];

  for (let i = 0; i < length; i++) {
    id += fullChars[Math.floor(Math.random() * fullChars.length)];
  }

  return id;
};

export{
  getOptionsFromEnum,
  getLangText,
  createId
}