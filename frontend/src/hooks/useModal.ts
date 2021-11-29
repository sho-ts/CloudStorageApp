import { useState, useCallback } from 'react';

const useModal = (): [
  boolean, () => void, () => void
] => {
  const [open, setOpen] = useState<boolean>(false);

  const handleModalOpen = useCallback(() => {
    setOpen(true);
  }, [])

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, [])

  return [open, handleModalOpen, handleModalClose];
}

export default useModal;