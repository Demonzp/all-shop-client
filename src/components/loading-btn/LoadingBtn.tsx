import React from 'react';
import { EColors } from '../../types/colors';

type Props = {
  isLoading: boolean;
  title: string;
  onClick: () => void;
  type?: EColors;
}

const LoadingBtn: React.FC<Props> = ({ isLoading, title, type='primary', onClick }) => {

  return (
    <button
      className={`btn m-btn-${type}`}
      onClick={onClick}
      disabled={isLoading?true:false}
    >
      {isLoading ? 'Loading...' : title}
    </button>
  );
};

export default LoadingBtn;