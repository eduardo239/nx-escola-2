import { Close16 } from '@carbon/icons-react';
import { IconOnly } from './ui/Form';
import Spinner from '../components/ui/Spinner';

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
        {/* <Spinner></Spinner> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
