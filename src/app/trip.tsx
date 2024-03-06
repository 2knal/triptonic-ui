import { View, Text } from "react-native";
import ActionSheet from "@/components/utils/action-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Filter from "@/components/filter";
import NavBar from "@/components/utils/navbar";
import Prompt from "@/components/prompt";


export default function Trip() {
  const [markers, setMarkers] = useState([]);
  const [navbarScr, setNavbarScr] = useState(1);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  
  const handleOpenPress = (scrNo: number) => {
    bottomSheetRef.current?.present();
    setNavbarScr(scrNo);
  };

  async function getData() {
    const jsonStr = await AsyncStorage.getItem('GENERATED_TEXT');
    const jsonData = JSON.parse(jsonStr);
    for (let i = 0; i < jsonData.results.length; i++) {
      const lat = jsonData.results[i].geometry.location.lat;
      const lng = jsonData.results[i].geometry.location.lng;
      const mark = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 1,
        longitudeDelta: 1,
        name: jsonData.results[i].name
      };
      setMarkers(markers => [...markers, mark]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex">
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 32.8241205,
          longitude: -117.4386322,
          latitudeDelta: 1,
          longitudeDelta: 2,
        }}
        showsUserLocation
        showsMyLocationButton
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
        <NavBar onPress={handleOpenPress} />
      </View>
      <ActionSheet
        ref={bottomSheetRef}
        index={0}
        children={navbarScr == 1 ? <Prompt /> : <Filter />}
      />
    </View>
  );
}
