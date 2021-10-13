import { useState } from 'react';

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = setIsOpen(false);
  const onOpen = setIsOpen(true);

  return {
    isOpen, onClose, onOpen
  }
}

export default useDisclosure;