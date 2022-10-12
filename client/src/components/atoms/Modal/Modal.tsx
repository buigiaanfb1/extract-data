import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isShowing: boolean;
  hide: () => void;
  content: string | null;
}

const Modal: React.FC<ModalProps> = ({
  isShowing,
  hide,
  content,
}: ModalProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            data-testid="modal-overlay"
            className="modal-overlay"
            onClick={hide}
          />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <code>{content}</code>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
