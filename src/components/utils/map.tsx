import { ReactNode } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

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
      initialRegion={{
        latitude: 32.8241205,
        longitude: -117.4386322,
        latitudeDelta: 1,
        longitudeDelta: 2,
      }}
    >
      {children}
    </MapView>
  );
}
