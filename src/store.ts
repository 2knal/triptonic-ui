import { create } from "zustand";

type PromptStore = {
  prompt: string;
  changePrompt: (string) => void;
}

type APIStore = {
  data: any;
  setData: (any) => void;
}

export const usePromptStore = create<PromptStore>((set) => ({
  prompt: '',
  changePrompt: (prompt) => set({ prompt })
}));

export const useAPIStore = create<APIStore>((set) => ({
  data: [],
  setData: (data) => set({ data })
}));
