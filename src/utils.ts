export interface IRoute {
  key?: number;
  name?: string;
  icon?: string;
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  time: string;
  day: number;
  photos?: any;
  notes?: string;
  rating?: number;
  cost?: number;
  business_status?: string;
  description?: string;
  id?: string;
  serves?: string[];
  todays_working_hours?: string;
  total_reviews?: number;
  website?: string;
  type: 'restaurant' | 'tourist' | 'transit'
}

export interface ISavePayload {
  name: string;
  places: any;
  params: IPromptParams;
  id?: string;
}

export type TransportMode = 'DRIVING' | 'TRANSIT' | 'WALKING' | 'BICYCLING';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function get24HrFormattedTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  
  return `${paddedHours}:${paddedMinutes}`;
}

export function get12HrFormattedTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  
  return `${paddedHours}:${paddedMinutes} ${ampm}`;
}

export interface IPromptParams {
  location: string;
  duration?: number;
  no_of_people?: number;
  mode_of_transport?: string;
  type_of_trip?: string;
  cuisine?: string;
  attractions?: string;
  origin?: string;
  distance?: number;
  timings?: string;
  budget?: string;
}

export const formatRoutes = (places): string => {
  const totalDays = Math.max(...places.map(p => p.day));
  
  const dayMapper = {};
  for (let i = 1; i <= totalDays; i++) {
    dayMapper[i] = places.filter(p => p.day === i);
  }

  let formattedText = "";
  for (let i = 1; i <= totalDays; i++) {
    formattedText += `*Day ${i}*\n\n`;
    for (const place of dayMapper[i]) {
      formattedText += `* At ${place.time}, visit ${place.name}\n`;
    }
    formattedText += "\n";
  }

  return formattedText;
};

export function getDateObjectFromTimeString(timeString) {
  const currentDate = new Date();
  const [hours, minutes] = timeString.split(':').map(Number);
  const dateObject = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);

  return dateObject;
}
