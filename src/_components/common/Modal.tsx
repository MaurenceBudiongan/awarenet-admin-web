import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Modal({
  children,
  onClose,
  isOpen = false,
}: PropsWithChildren<Props>) {
  const handleModalClose = () => {
    if (onClose) onClose();
  };

  const onClickOutside = () => {
    handleModalClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="absolute top-0 left-0 z-20 flex h-screen w-screen bg-black/80"
        onClick={onClickOutside}
      ></div>
      <div className="absolute top-[25%] left-[25%] z-30 m-auto min-w-2xl rounded-xl bg-white shadow-lg">
        {children}
      </div>
    </>,
    document.body,
  );
}
