import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import type { ModalKey } from "./types";

export const useModal = (key: ModalKey) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");

  const isOpen = !!context.modals[key]?.isOpen;
  const openModal = (payload?: never) => context.openModal(key, payload);
  const closeModal = () => context.closeModal(key);
  const toggleModal = (payload?: never) => context.toggleModal(key, payload);

  return { isOpen, openModal, closeModal, toggleModal };
};
