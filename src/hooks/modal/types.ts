export type ModalKey = string;

export type ModalPayloads = {
  [K in ModalKey]?: Record<string, never>;
};

export type ModalInstance<K extends ModalKey = ModalKey> = {
  isOpen: boolean;
  payload?: ModalPayloads[K];
};

export type ModalState = {
  [K in ModalKey]: ModalInstance<K>;
};

export interface ModalContextProps {
  modals: ModalState;
  openModal: <K extends ModalKey>(key: K, payload?: ModalPayloads[K]) => void;
  closeModal: (key: ModalKey) => void;
  toggleModal: <K extends ModalKey>(key: K, payload?: ModalPayloads[K]) => void;
}
