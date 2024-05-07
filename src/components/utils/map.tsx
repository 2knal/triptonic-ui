import { ReactNode } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { INITIAL_MAP_LOCATION } from 'assets/constants';

interface IMapProps {
  children?: ReactNode;
}

export default function Map({ children }: IMapProps) {
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton
      initialRegion={INITIAL_MAP_LOCATION}
    >
      {children}
    </MapView>
  );
}
