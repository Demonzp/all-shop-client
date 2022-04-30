import React from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const CustomModalFooter: React.FC<Props> = ({children})=>{
  return(
    <div className="modal-footer">
      {children}
    </div>
  );
};

export default CustomModalFooter;