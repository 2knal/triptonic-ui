import { create } from "zustand";

import { API_ENDPOINT } from "assets/constants";

type PromptStore = {
  prompt: string;
  changePrompt: (string) => void;
}

type APIStore = {
  tripName: string;
  routes: any;
  fetchRoutes: () => any;
  getRoutes: () => any;
  setTripName: (string) => any;
  getTripName: () => string;
}

export const usePromptStore = create<PromptStore>((set) => ({
  prompt: '',
  changePrompt: (prompt) => set({ prompt })
}));

export const useAPIStore = create<APIStore>((set, get) => ({
  tripName: '',
  setTripName: (tripName) => (set({ tripName })),
  getTripName: () => get().tripName,
  routes: [],
  fetchRoutes: async () => {
    const url = API_ENDPOINT + '/data.json';
    const response = await fetch(url);
    const updatedResponse = await response.json();
    set({ routes: updatedResponse });
    return updatedResponse;
  },
  getRoutes: () => get().routes,
}));
