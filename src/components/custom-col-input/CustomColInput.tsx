import React, { useEffect, useState } from 'react';
import { TObjKeyAnyString } from '../../types/global';

export type TInputTypes = 'text'|'email'|'number'|'password';

type Props = {
  type?: TInputTypes;
  name: string;
  data: TObjKeyAnyString;
  onChange: (data:any)=>void;
  errors?: TObjKeyAnyString;
  label?: string;
}

const CustomColInput:React.FC<Props> = ({type, name, data, onChange, label, errors}) => {
  const [calcType, setCalcType] = useState<TInputTypes>();
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    if(!type){
      setCalcType('text');
    }else{
      setCalcType(type);
    }
  }, [type]);

  useEffect(()=>{
    if(errors){
      if(errors[name]){
        setIsError(true);
      }else{
        setIsError(false);
      }
    }else{
      setIsError(false);
    }
  }, [errors]);

  return (
    <div className="col-md-6 p-t-20">
      {
        label?
          <label className="form-label" style={{ minWidth: 300 }}>
            {label}
          </label>
          :
          null
      }
      <input
        type={calcType}
        className={`form-control ${isError?'is-invalid':''}`}
        value={data[name]}
        onChange={(e) => onChange({ name, value: e.target.value })}
      />
      {
        isError?
        <div className="invalid-feedback">
          {errors![name]}
        </div>
        :
        null
      }
    </div>
  );
};

export default CustomColInput;