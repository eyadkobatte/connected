import { create } from "zustand";

interface SnackbarStore {
  messages: string[];
  addMessage: (message: string) => void;
  removeMessage: (message: string) => void;
}

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  messages: [],
  addMessage: (message: string) =>
    set((state) => ({ messages: [...state.messages, message] })),
  removeMessage: (message: string) =>
    set((state) => ({
      messages: state.messages.filter(
        (stateMessage) => stateMessage !== message
      ),
    })),
}));
