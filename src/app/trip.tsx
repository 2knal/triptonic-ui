import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import Filter from "@/components/filter";
import NavBar from "@/components/utils/navbar";
import Prompt from "@/components/prompt";
import Map from "@/components/utils/map";
import ActionSheet from "@/components/utils/action-sheet";
import { useAPIStore } from "@/store";
import Loader from "@/components/loader";
import CoolCallout from "@/components/utils/cool-callout";

export default function Trip() {
  const { fetchRoutes } = useAPIStore();
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [navbarScr, setNavbarScr] = useState(1);
  const mapRef = useRef<MapView>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const animatetoMarkers = () => {
    if (!isLoading && mapRef.current && markers.length > 0) {
      console.log("Animate to map location!");
      mapRef.current.animateCamera(
        { center: markers[0], zoom: 12 },
        { duration: 2500 }
      );
      // mapRef.current.fitToSuppliedMarkers(
      //   markers.map(({ _id }) => _id),
      //   { animated: true }
      // );
    }
  };

  const handleOpenPress = (scrNo: number) => {
    bottomSheetRef.current?.present();
    setNavbarScr(scrNo);
  };

  useEffect(() => {
    async function fetchDataFromAPI() {
      if (isLoading) {
        const routes = await fetchRoutes();

        setMarkers(routes);
        setIsLoading(false);
      }
    }
    fetchDataFromAPI();
  }, [isLoading, setMarkers]);

  useEffect(() => {
    animatetoMarkers();
  }, [isLoading, markers]);

  if (isLoading && !mapLoaded) {
    console.log("Loader rendered");
    return <Loader />;
  }

  return (
    <View className="flex flex-1 bg-egg-white">
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_DEFAULT}
        onMapLoaded={() => {
          animatetoMarkers();
          setMapLoaded(true);
        }}
      >
        {markers.map((marker, index) => (
          <Marker key={index} title={marker.name} coordinate={marker}>
            <View
              className="flex flex-1 bg-white w-8 h-8 p-1 rounded-lg drop-shadow-2xl"
              style={{ elevation: 3 }}
            >
              <ImageBackground
                source={{ uri: marker.icon }}
                className="flex flex-1 w-full h-full"
                resizeMode="contain"
              />
            </View>
            <CoolCallout marker={marker} />
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

const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
});
