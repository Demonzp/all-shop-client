import React, { useState, useRef, useEffect } from 'react';
import { createId } from '../../services/global';
import CustomCunvasConvert from '../custom-canvas-convert';

import './custom-img-pick.css';

type Props = {
  name: string;
  onChangePickImg: (files: IFileData[]) => void
  label?: string;
  btnLabel?: string;
  multiple?: boolean;
}

export interface IFileData {
  name: string,
  id: string,
  file: File | Blob
}

const CustomImgPick: React.FC<Props> = ({ name, onChangePickImg, label = 'files input', btnLabel = 'add img', multiple }) => {
  const [files, setFiles] = useState<IFileData[]>([]);
  const [callBackFiles, setCallBackFiles] = useState<IFileData[]>([]);
  const refInput = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 0) {
        console.log('change');
        if (multiple) {
          setFiles(prev => {
            return [...prev].concat(Array.from(e.target.files!).map(f => {
              return {
                name,
                id: createId(8),
                file: f
              }
            }));
          })
        } else {
          setFiles(Array.from(e.target.files!).map(f => {
            return {
              name,
              id: createId(8),
              file: f
            }
          }));
        }
      }
    }
  };

  const callBack = (file: IFileData) => {
    console.log('callBack');
    setCallBackFiles(prev => prev.concat(file));
  };

  useEffect(() => {
    if (callBackFiles.length === files.length) {
      console.log(callBackFiles.length);
      onChangePickImg(callBackFiles);
    }
  }, [callBackFiles, files]);

  const delImg = (id: string) => {
    setFiles(prev => {
      return prev.filter(f => f.id !== id);
    });
  };

  return (
    <div className="mb-3 p-t-20">
      <div className="col">
        <div className="row">
          <label className="form-label">{label}</label>
        </div>
        <div className="col">
          {
            files.map((file) => {
              //   return(
              //     <div key={file.id} className="img-pick-cont">
              //       <img 
              //         className="img-pick-img"
              //         src={URL.createObjectURL(file.file)}
              //         onLoad={(e) => { URL.revokeObjectURL(e.currentTarget.src) }}
              //       />
              //       <div>
              //         <div 
              //           className="material-icons img-pick-ico-btn"
              //           onClick={()=>delImg(file.id)}
              //         >
              //           delete
              //         </div>
              //       </div>
              //     </div>
              //   );
              // })
              return <CustomCunvasConvert
                key={file.id}
                file={file}
                delImg={delImg}
                callBack={callBack}
              />;
            })
          }
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => refInput.current?.click()}
          >
            {btnLabel}
          </button>
        </div>
      </div>

      <input
        ref={refInput}
        name={name}
        className="img-pick-input"
        type="file"
        onChange={onChange}
        multiple={multiple}
      />
    </div>
  );
};

export default CustomImgPick;