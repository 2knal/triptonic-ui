import { create } from "zustand";
import { IPromptParams } from "./utils";
import { stateCache } from "expo-router/build/getLinkingConfig";

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
  totalDays: number;
  setRoutes: (any) => void;
  deleteRoute: (number) => void;
  moveRouteUp: (number) => void;
  moveRouteDown: (number) => void;
  addRouteToTrip: (any) => void;
  editRoute: (any) => void;
  setTotalDays: () => void;
  saveTrip: () => any;
}

export const usePromptStore = create<PromptStore>((set) => ({
  prompt: '',
  changePrompt: (prompt) => set({ prompt }),
}));

export const useAPIStore = create<APIStore>((set, get) => ({
  totalDays: 1,
  tripName: '',
  params: {
    location: ''
  },
  routes: [],
  setParams: (params) => set({ params }),
  fetchRoutes: async (p: string) => {
    console.log('I am here! with', p);
    const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
    const url = API_ENDPOINT + '/prompt';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: p })
      });
      const updatedResponse = await response.json();
      if ('error' in updatedResponse) {
        return updatedResponse;
      }

      const { places, prompt } = updatedResponse;
      let count = 1;
      for (const place of places) {
        place.key = count;
        count += 1
      }

      let totalDays = 1;
      for (const place of places) {
        totalDays = Math.max(totalDays, place.day);
      }
      set({ routes: places });
      set({ params: prompt });
      set({ totalDays });

      return places;
    } catch (e) {
      return { 'error': true };
    }
  },
  fetchRoutesWithParams: async (p: any) => {
    console.log('I am here! with', p);
    const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
    const url = API_ENDPOINT + '/apply_filters';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...p })
      });
      const updatedResponse = await response.json();
      if ('error' in updatedResponse) {
        return updatedResponse;
      }

      const { places, prompt } = updatedResponse;
      let count = 1;
      for (const place of places) {
        place.key = count;
        count += 1
      }

      let totalDays = 1;
      for (const place of places) {
        totalDays = Math.max(totalDays, place.day);
      }
      set({ routes: places });
      set({ params: prompt });
      set({ totalDays });
      
      return places;
    } catch (e) {
      return { 'error': true };
    }
  },
  getRoutes: () => get().routes,
  setTripName: (tripName) => (set({ tripName })),
  getTripName: () => get().tripName,
  setRoutes: (routes) => (set({ routes })),
  deleteRoute: (key) => set((state) => {
    const index = state.routes.findIndex(route => route.key === key);
    return {
      ...state,
      routes: state.routes.filter((route, i) => i !== index)
    }
  }),
  moveRouteUp: (key) => set((state) => {
    const index = state.routes.findIndex(route => route.key === key);
    const updatedRoutes = [...state.routes];
    if (index !== 0) {
      const updatedRoutes = [...state.routes];

      // Swap routes
      const tempRoute = updatedRoutes[index - 1];
      updatedRoutes[index - 1] = updatedRoutes[index];
      updatedRoutes[index] = tempRoute;
  
      // Swap time attributes
      const tempTime = updatedRoutes[index - 1].time;
      updatedRoutes[index - 1] = { ...updatedRoutes[index - 1], time: updatedRoutes[index].time };
      updatedRoutes[index] = { ...updatedRoutes[index], time: tempTime };
  
      return { ...state, routes: updatedRoutes };
    }
    return {
      ...state,
      routes: updatedRoutes
    };
  }),
  moveRouteDown: (key) => set((state) => {
    const index = state.routes.findIndex(route => route.key === key);
    const updatedRoutes = [...state.routes];
    if (index !== state.routes.length - 1) {
      const updatedRoutes = [...state.routes];

      // Swap routes
      const tempRoute = updatedRoutes[index + 1];
      updatedRoutes[index + 1] = updatedRoutes[index];
      updatedRoutes[index] = tempRoute;
  
      // Swap time attributes
      const tempTime = updatedRoutes[index + 1].time;
      updatedRoutes[index + 1] = { ...updatedRoutes[index + 1], time: updatedRoutes[index].time };
      updatedRoutes[index] = { ...updatedRoutes[index], time: tempTime };
  
      return { ...state, routes: updatedRoutes };
    }
    return {
      ...state,
      routes: updatedRoutes
    };
  }),
  addRouteToTrip: (route) => set((state) => {
    const totalRoutes = state.routes.length;
    const updatedRoutes = [...state.routes, { ...route, key: totalRoutes + 1 }];
    updatedRoutes.sort((a, b) => {
      if (a.day !== b.day) {
        return a.day - b.day;
      } else {
        const timeA = parseInt(a.time.replace(":", ""));
        const timeB = parseInt(b.time.replace(":", ""));
        return timeA - timeB;
      }
    });

    state.setTotalDays();
    
    return { ...state, routes: updatedRoutes };
  }),
  editRoute: (updatedRoute) => set((state) => {
    const updatedRoutes = state.routes.map(route =>
      route.key === updatedRoute.key ? updatedRoute : route
    );
    
    updatedRoutes.sort((a, b) => {
      if (a.day !== b.day) {
        return a.day - b.day; 
      } else {
        const timeA = parseInt(a.time.replace(":", ""));
        const timeB = parseInt(b.time.replace(":", ""));
        return timeA - timeB;
      }
    });

    state.setTotalDays();

    return { ...state, routes: updatedRoutes };
  }),
  setTotalDays: () => set((state) => {
    let totalDays = 1;
    for (const route of state.routes) {
      totalDays = Math.max(totalDays, route.day);
    }
    return {
      ...state,
      totalDays
    };
  }),
  saveTrip: async () => {
    const { tripName, routes, params } = get(); 
    const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
    const url = API_ENDPOINT + '/save';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: tripName,
          places: routes,
          params
        })
      });
      const updatedResponse = await response.json();      
      return updatedResponse;
    } catch (e) {
      return { 'error': true };
    }
  },
}));
