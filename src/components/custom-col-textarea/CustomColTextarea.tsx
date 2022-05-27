import React, { useEffect, useState } from 'react';
import { TObjKeyAnyString, TOnChangeInput } from '../../types/global';

type Props = {
  name: string;
  data: TObjKeyAnyString;
  onChange: TOnChangeInput;
  errors?: TObjKeyAnyString;
  disabled?: boolean, 
  readOnly?: boolean,
  label?: string;
  rows?:number;
  cols?:number;
}

const CustomColTextarea:React.FC<Props> = ({name, data, onChange, label, disabled, readOnly, errors, rows=3,cols}) => {
  const [isError, setIsError] = useState(false);

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
      <textarea
        rows={rows}
        cols={cols}
        disabled={disabled} 
        readOnly={readOnly}
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

export default CustomColTextarea;