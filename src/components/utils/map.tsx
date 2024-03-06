import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function Map() {
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
    />
  );
}
