import { ReactNode } from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { INITIAL_MAP_LOCATION } from "assets/constants";

interface IMapProps {
  children?: ReactNode;
}

export default function Map({ children }: IMapProps) {
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_DEFAULT}
      showsUserLocation
      showsMyLocationButton
      initialRegion={INITIAL_MAP_LOCATION}
    >
      {children}
    </MapView>
  );
}
