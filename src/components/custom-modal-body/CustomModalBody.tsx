import React from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[] | null;
};

const CustomModalBody: React.FC<Props> = ({children}) => {
  return (
    <div className="modal-body">
      {children}
    </div>
  );
};

export default CustomModalBody;