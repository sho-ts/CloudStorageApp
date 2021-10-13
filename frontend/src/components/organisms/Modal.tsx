import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

type Props = {
  isOpen: boolean,
  onClose: any,
  title: string,
  children: React.ReactNode,
}

const Modal: React.FC<Props> = ({
  isOpen, onClose, title, children
}) => {
  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export default Modal;