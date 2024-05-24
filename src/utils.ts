export interface IRoute {
  name: string;
  icon?: string;
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  time: string;
  day: number;
  photos: any;
}

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

export interface IPromptParams {
  location: string;
  duration?: number;
  no_of_people?: number;
  mode_of_transport?: string;
  type_of_trip?: string;
  cuisine?: string;
  attractions?: string;
}
