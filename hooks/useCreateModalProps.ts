import { useCallback, useState } from "react";

export type ModalPropsType = ReturnType<typeof useCreateModalProps>;

const useCreateModalProps = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { isOpen, close, open };
};

export default useCreateModalProps;
