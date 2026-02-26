import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  disableOutsideClick?: boolean;
}

export default function Modal({
  children,
  onClose,
  disableOutsideClick = false,
  isOpen = false,
}: PropsWithChildren<Props>) {
  const handleModalClose = () => {
    if (onClose) onClose();
  };

  const onClickOutside = () => {
    if (!disableOutsideClick) {
      handleModalClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 z-[100] flex h-screen w-screen bg-black/80"
        onClick={onClickOutside}
      >
        <div className="z-[110] flex h-screen w-screen items-center justify-center">
          <div
            className="m-auto min-w-2xl rounded-xl bg-white shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
