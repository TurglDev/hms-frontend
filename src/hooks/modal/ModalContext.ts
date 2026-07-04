import { createContext } from "react";
import type { ModalContextProps } from "./types";

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);
