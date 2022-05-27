import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { EColors } from '../../types/colors';
import './btn-link.css';

type Props = {
  children: string|JSX.Element;
  to: string;
  isLoading?: boolean;
  type?:EColors;
}

const BtnLink = React.forwardRef<HTMLButtonElement, Props>(({children, type=EColors.PRIMARY, to, isLoading}, ref)=>{
  
  const refNav = useRef<HTMLAnchorElement>(null);
  
  return(
    <button
      ref={ref}
      className={`btn m-btn-${type}`}
      onClick={()=>refNav.current?.click()}
    >
      <NavLink 
        className="c-btn-link"
        ref={refNav}
        to={to}
      >
        {isLoading?'Loading...':children}
      </NavLink>
    </button>

  );
});

export default BtnLink;