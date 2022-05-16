import React, { AnchorHTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { EColors } from '../../types/colors';
import './btn-link.css';

type Props = {
  children: string|JSX.Element;
  to: string;
  type?:EColors;
}

const BtnLink = React.forwardRef<HTMLButtonElement, Props>(({children, type=EColors.PRIMARY, to}, ref)=>{
  return(
    <button
      ref={ref}
      className={`btn m-btn-${type}`}
    >
      <NavLink 
        className="c-btn-link"
        to={to}
      >
        {children}
      </NavLink>
    </button>

  );
});

export default BtnLink;