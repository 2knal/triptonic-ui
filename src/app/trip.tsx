import { View, Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Filter from "@/components/filter";
import NavBar from "@/components/utils/navbar";
import Prompt from "@/components/prompt";
import Map from "@/components/utils/map";
import ActionSheet from "@/components/utils/action-sheet";
import { TRIP } from "assets/constants";

export default function Trip() {
  const [markers, setMarkers] = useState([]);
  const [navbarScr, setNavbarScr] = useState(1);
  const mapRef = useRef<MapView>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenPress = (scrNo: number) => {
    bottomSheetRef.current?.present();
    setNavbarScr(scrNo);
  };

  useEffect(() => {
    async function getData() {
      const jsonStr = await AsyncStorage.getItem(TRIP.DETAILS);
      const jsonData = JSON.parse(jsonStr);
      let data = [];
      for (let i = 0; i < jsonData.results.length; i++) {
        const lat = jsonData.results[i].geometry.location.lat;
        const lng = jsonData.results[i].geometry.location.lng;
        const mark = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 1,
          longitudeDelta: 1,
          name: jsonData.results[i].name,
        };
        data = [...data, mark];
      }
      setMarkers(data);
    }

    getData();
  }, []);

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      mapRef.current.animateCamera({ center: markers[0], zoom: 12 }, { duration: 2000 })
    }
  }, [markers]);

  return (
    <View className="flex flex-1 bg-egg-white">
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
          >
            <Callout>
              <View style={{ padding: 5 }}>
                <Text style={{ fontSize: 18 }}>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View className="absolute bottom-14 self-center">
        <NavBar onPress={handleOpenPress} optionNo={navbarScr} />
      </View>
      <ActionSheet
        ref={bottomSheetRef}
        index={0}
        children={navbarScr == 1 ? <Prompt /> : <Filter />}
      />
    </View>
  );
}
