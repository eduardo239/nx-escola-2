import { Close16 } from '@carbon/icons-react';
import React from 'react';
import { IconOnly } from './ui/Form';

const Modal = ({ modal, setModal, children }) => {
  const handleClickOutside = (e) => {
    let tar = e.target;
    let cur = e.currentTarget;
    if (tar === cur) setModal(false);
  };

  return (
    <div
      style={{ display: `${modal ? 'flex' : 'none'}` }}
      className={`modal-container`}
      onClick={handleClickOutside}
    >
      <div className="modal-body">
        <IconOnly secondary className="close" onClick={() => setModal(!modal)}>
          <Close16 />
        </IconOnly>
        {children}
      </div>
    </div>
  );
};

export default Modal;
