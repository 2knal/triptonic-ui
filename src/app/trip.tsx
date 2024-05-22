import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";

import Filter from "@/components/filter";
import NavBar from "@/components/utils/navbar";
import Prompt from "@/components/prompt";
import Map from "@/components/utils/map";
import ActionSheet from "@/components/utils/action-sheet";
import { useAPIStore, usePromptStore } from "@/store";
import Loader from "@/components/loader";
import CoolCallout from "@/components/utils/cool-callout";
import { COLORS } from "assets/constants";
import MapViewDirections from "react-native-maps-directions";
import CoolText from "@/components/utils/cool-text";
import { useToast } from "react-native-toast-notifications";
import { useRouter, useLocalSearchParams } from "expo-router";
import MapTimeline from "@/components/map-timeline";

export default function Trip() {
  const params = useLocalSearchParams();
  const { prompt } = usePromptStore();
  const { fetchRoutes, fetchRoutesWithParams } = useAPIStore();
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [navbarScr, setNavbarScr] = useState(1);
  const mapRef = useRef<MapView>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const googleMapsAPIKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  const toast = useToast();
  const router = useRouter();

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
        console.log('Sending prompt...', prompt);
        console.log('Sending params (if any)', params)
        const data = (Object.keys(params).length !== 0) 
          ? await fetchRoutesWithParams(params) 
          : await fetchRoutes(prompt);

        if ('error' in data) {
          toast.show("Something went wrong. Please try again later :(", {
            type: 'danger'
          });
          router.push({ pathname: '/' });
          return;
        }
        // console.log('GOT EM ALL', data);

        setMarkers(data);
        setIsLoading(false);
      }
    }
    fetchDataFromAPI();
  }, [isLoading, setMarkers]);

  useEffect(() => {
    animatetoMarkers();
  }, [isLoading, markers]);

  function loadBottomSheetComponent(screenNo: number) {
    if (screenNo === 1) return <Prompt />;
    if (screenNo === 2) return <Filter />;
    return <MapTimeline />;
  }

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
              className="flex flex-1 w-8 h-8 p-1 justify-center items-center rounded-full bg-reddish drop-shadow-2xl text-center"
              style={{ elevation: 3 }}
            >
              {/* <ImageBackground
                source={{ uri: marker.icon }}
                className="flex flex-1 w-full h-full"
                resizeMode="contain"
              /> */}
              <CoolText title={index + 1} css="font-bold color-white" />
            </View>
            <CoolCallout marker={marker} />
          </Marker>
        ))}
        {/* <Polyline
          coordinates={markers}
          strokeWidth={4}
          strokeColor={COLORS['reddish']}
        /> */}
        <MapViewDirections
          origin={markers[0]}
          destination={markers[markers.length - 1]}
          waypoints={markers.slice(1, -1)}
          apikey={googleMapsAPIKey}
          strokeWidth={4}
          strokeColor={COLORS['reddish']}
        />
      </MapView>
      <View className="absolute bottom-14 self-center">
        <NavBar onPress={handleOpenPress} optionNo={navbarScr} />
      </View>
      <ActionSheet
        ref={bottomSheetRef}
        index={0}
        children={loadBottomSheetComponent(navbarScr)}
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
