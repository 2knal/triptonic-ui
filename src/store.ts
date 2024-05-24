import { create } from "zustand";
import { IPromptParams } from "./utils";

type PromptStore = {
  prompt: string;
  changePrompt: (string) => void;
}

type APIStore = {
  tripName: string;
  routes: any;
  params: IPromptParams;
  setParams: (IPromptParams) => void;
  fetchRoutes: (string) => any;
  getRoutes: () => any;
  setTripName: (string) => any;
  getTripName: () => string;
  fetchRoutesWithParams: (any) => any;
  setRoutes: (any) => void;
}

export const usePromptStore = create<PromptStore>((set) => ({
  prompt: '',
  changePrompt: (prompt) => set({ prompt }),
}));

export const useAPIStore = create<APIStore>((set, get) => ({
  days: {},
  tripName: '',
  params: {
    location: ''
  },
  routes: [],
  setParams: (params) => set({ params }),
  fetchRoutes: async (p: string) => {
    console.log('I am here! with', p);
    const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
    // const url = API_ENDPOINT + '/prompt';
    const url = 'https://gauravghati.github.io/apis/data.json';
    try {
      // const response = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ ...p })
      // });
      const response = await fetch(url);
      console.log('API DATA', response);
      const updatedResponse = await response.json();
      const { places, params } = updatedResponse;
      let count = 1;
      for (const place of places) {
        place.key = count;
        count += 1
      }
      console.log('STORE routes', places.map(place => place.key));
      set({ routes: places });
      set({ params });

      return places;
    } catch (e) {
      console.log(e);
      return { 'error': true };
    }
  },
  fetchRoutesWithParams: async (p: any) => {
    console.log('I am here! with', p);
    const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
    // const url = API_ENDPOINT + '/apply_filters';
    const url = 'https://gauravghati.github.io/apis/data.json';
    try {
      // const response = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ ...p })
      // });
      const response = await fetch(url);
      const updatedResponse = await response.json();
      const { places, params } = updatedResponse;
      set({ routes: places });
      set({ params });
      return places;
    } catch (e) {
      return { 'error': true };
    }
  },
  getRoutes: () => get().routes,
  setTripName: (tripName) => (set({ tripName })),
  getTripName: () => get().tripName,
  setRoutes: (routes) => (set({ routes })),
}));
