import { useState, type ReactNode } from "react";
import { ModalContext } from "./ModalContext";
import type { ModalKey, ModalPayloads, ModalState, ModalContextProps } from "./types";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalState>({
    roleForm: { isOpen: false },
    deleteConfirm: { isOpen: false },
    userForm: { isOpen: false },
  });

  const openModal = <K extends ModalKey>(key: K, payload?: ModalPayloads[K]) =>
    setModals((prev) => ({ ...prev, [key]: { isOpen: true, payload } }));

  const closeModal = (key: ModalKey) =>
    setModals((prev) => ({
      ...prev,
      [key]: { ...prev[key], isOpen: false, payload: undefined },
    }));

  const toggleModal = <K extends ModalKey>(key: K, payload?: ModalPayloads[K]) =>
    setModals((prev) => ({
      ...prev,
      [key]: { isOpen: !prev[key].isOpen, payload },
    }));

  const contextValue: ModalContextProps = { modals, openModal, closeModal, toggleModal };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
