export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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