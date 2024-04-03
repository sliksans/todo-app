import { FunctionComponent, useEffect, useRef } from "react";

type ModalProps = {
  title?: string;
  showModal: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal: FunctionComponent<ModalProps> = ({
  title,
  showModal,
  onClose,
  children,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [showModal]);

  return (
    <dialog
      className="rounded-md"
      ref={ref}
      onCancel={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="p-5">
        {title && (
          <h2 className="pb-4 text-center text-2xl font-bold text-violet-700">
            {title}
          </h2>
        )}
        <div className="pb-4">{children}</div>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
