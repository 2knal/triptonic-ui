import { create } from "zustand";

interface IPromptParams {
  location: string;
  duration?: number;
  no_of_people?: number;
  mode_of_transport?: string;
  type_of_trip?: string;
  cuisine?: string;
  attractions?: string;
}

type PromptStore = {
  prompt: string;
  params: IPromptParams;
  changePrompt: (string) => void;
  setParams: (IPromptParams) => void;
}

type APIStore = {
  tripName: string;
  routes: any;
  fetchRoutes: (string) => any;
  getRoutes: () => any;
  setTripName: (string) => any;
  getTripName: () => string;
}

export const usePromptStore = create<PromptStore>((set) => ({
  prompt: '',
  params: {
    location: ''
  },
  changePrompt: (prompt) => set({ prompt }),
  setParams: (params) => set({ params })
}));

export const useAPIStore = create<APIStore>((set, get) => ({
  tripName: '',
  routes: [],
  fetchRoutes: async (prompt: string) => {
    const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
    const url = API_ENDPOINT + '/prompt';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });
      const updatedResponse = await response.json();
      set({ routes: updatedResponse });
      return updatedResponse;
    } catch (e) {
      return { 'error': true };
    }
  },
  getRoutes: () => get().routes,
  setTripName: (tripName) => (set({ tripName })),
  getTripName: () => get().tripName,
}));
