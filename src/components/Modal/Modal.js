import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {window.removeEventListener('keydown', handleKeyDown)};
});

const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

return createPortal(
      <div className={s.modalBackdrop} onClick={handleBackdropClick}>
        <div className={s.modalContent}>{children}</div>
      </div>,
      modalRoot,
    );
}

export default Modal;
