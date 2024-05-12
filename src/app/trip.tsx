import { View, Text, Animated, Easing } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Filter from "@/components/filter";
import NavBar from "@/components/utils/navbar";
import Prompt from "@/components/prompt";
import Map from "@/components/utils/map";
import ActionSheet from "@/components/utils/action-sheet";
import { useAPIStore } from "@/store";
import Loader from "@/components/loader";

export default function Trip() {
  const animationProgress = useRef(new Animated.Value(0));``
  const { fetchRoutes } = useAPIStore();
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [navbarScr, setNavbarScr] = useState(1);
  const mapRef = useRef<MapView>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenPress = (scrNo: number) => {
    bottomSheetRef.current?.present();
    setNavbarScr(scrNo);
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);


  useEffect(() => {
    async function fetchDataFromAPI() {
      if (isLoading) {
        const routes = await fetchRoutes();
        console.log('GOT EM ALL', routes);
        
        setMarkers(routes);
        setIsLoading(false);
      }
    }
    fetchDataFromAPI()
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && mapRef.current && markers.length > 0) {
      mapRef.current.animateCamera({ center: markers[0], zoom: 12 }, { duration: 2000 })
    }
  }, [isLoading, markers]);

  if (isLoading) {
    return <Loader />;;
  }

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
