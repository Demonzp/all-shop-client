import React from 'react';
import { useLinkClickHandler, NavLink, NavLinkProps, useLocation, useHref } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';

const MiddlewareLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { onClick, replace = false, state, target, to, children, ...rest }, ref
  ) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const href = useHref(to);

    const handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target
    });

    const preHandleClick = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
      e.preventDefault();
      console.log('click link');
      handleClick(e);
    };

    return (
      <NavLink
        {...rest}
        to={to}
        onClick={preHandleClick}
        ref={ref}
        target={target}
      >
        {children}
      </NavLink>
    )
  }
);

export default MiddlewareLink;