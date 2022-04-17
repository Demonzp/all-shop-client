import React, { useEffect, useState } from 'react';
import { TObjKeyAnyString } from '../../types/global';

type Props = {
  value: string;
  onChange: (data: any) => void;
  errors?: TObjKeyAnyString;
  label?: string;
}

const CustomPhoneInput: React.FC<Props> = ({ value, onChange, errors, label }) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (errors) {
      if (errors.phoneNumber) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    } else {
      setIsError(false);
    }
  }, [errors]);

  return (
    <div className="col-md-10 p-t-20" style={{maxWidth:340}}>
      <label className="form-label" style={{ minWidth: 300 }}>
        {label}
      </label>
      <div className="input-group mb-8">
        <span className="input-group-text">80</span>
        <input
          type="text"
          value={value}
          className={`form-control ${isError?'is-invalid':''}`}
          aria-describedby="basic-addon3"
          placeholder="99 955 55 55"
          onChange={(e) => onChange(e.target.value)}
        />
        {
          isError ?
            <div className="invalid-feedback">
              {errors!.phoneNumber}
            </div>
            :
            null
        }
      </div>
    </div>
  );
};

export default CustomPhoneInput;