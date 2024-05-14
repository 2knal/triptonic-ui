import { ReactNode } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { INITIAL_MAP_LOCATION } from "assets/constants";
import { View } from "react-native";
import CoolCallout from "./cool-callout";
import CoolText from "./cool-text";

interface IMapProps {
  children?: ReactNode;
}

export default function Map({ children }: IMapProps) {
  const markers = [{
    "latitude": 33.6497147,
    "longitude": -117.839056,
    "latitudeDelta": 1,
    "longitudeDelta": 1,
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "name": "Blaze Pizza",
    "photos": {
    "height": 1840,
    "html_attributions": [
    "<a href=\"https://maps.google.com/maps/contrib/100990227375598994620\">Gail Antolin</a>"
    ],
    "photo_reference": "AWU5eFi1q2i5UYpcsCCQ8YGZ0AVRpeBUCVKANC218bPk5zgJHOVvc2lG2dY3j9ZK-qxpW_ofCeR60_tQxZYx16PVRN9jDLd40zcTxt0aKPCfgX488hYkCnR_QJE5420ACAQ3bRI0cbAWcxRNI_Zlj5N5dKZ3N2yXyna-vZacyA3-0DSRyRQx",
    "width": 3264
    }
    }]
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_DEFAULT}
      showsUserLocation
      showsMyLocationButton
      initialRegion={INITIAL_MAP_LOCATION}
    >
      {children}
      {/* {markers.map((marker, index) => (
          <Marker key={index} title={marker.name} coordinate={marker}>
            <View
              className="flex flex-1 w-8 h-8 p-1 justify-center items-center rounded-full bg-reddish drop-shadow-2xl text-center"
              style={{ elevation: 3 }}
            >
              <CoolText title={index + 1} css="font-bold color-white" />
            </View>
            <CoolCallout marker={marker} />
          </Marker>
      ))} */}
    </MapView>
  );
}
