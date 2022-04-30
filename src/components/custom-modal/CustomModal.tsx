import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as bootstrap from 'bootstrap';

type Props = {
  show: boolean;
  toggleForce?: (data: boolean) => void;
  children?: JSX.Element | JSX.Element[];
  title?: string;
};

const CustomModal: React.FC<Props> = ({ show, title = 'Modal title', toggleForce = () => { }, children }) => {
  const refModal = useRef<HTMLDivElement>(null);

  const preToggle = useCallback(() => { toggleForce(false) }, []);
  const myModal = useMemo<[bootstrap.Modal, HTMLDivElement]|null>(() => refModal.current ? [new bootstrap.Modal(refModal.current), refModal.current] : null, [refModal.current]);

  useEffect(() => {
    if (myModal) {

      myModal[1].addEventListener('hidden.bs.modal', preToggle);

      if (show) {
        myModal[0].show();
      } else {
        //console.log('myModal.hide');
        myModal[0].hide();
      }
    }
    return () => {
      if (myModal) {
        myModal[1].removeEventListener('hidden.bs.modal', preToggle);
      }
    }
  }, [show, myModal]);
  return (
    <div ref={refModal} className="modal fade" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;