import { View, Text, StyleSheet, ImageBackground } from "react-native";
import ActionSheet from "@/components/utils/action-sheet";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";

import Filter from "@/components/filter";
import NavBar from "@/components/utils/navbar";
import Prompt from "@/components/prompt";
import MapView, { Callout, Marker } from "react-native-maps";

const markers = [
	// San Francisco
	{
		latitude: 37.7749,
		longitude: -122.4194,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
		name: 'San Francisco City Center'
	},
	{
		latitude: 37.8077,
		longitude: -122.475,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
		name: 'Golden Gate Bridge'
	}
];

export default function Trip() {
  const { data } = useLocalSearchParams();
  console.log("params", data, typeof data);
  // const mapData = JSON.parse(params?.data ?? "{}");
  // console.log(params, mapData);

  // console.log(mapData, typeof mapData);
  const [navbarScr, setNavbarScr] = useState(1);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenPress = (scrNo: number) => {
    bottomSheetRef.current?.present();
    setNavbarScr(scrNo);
  };

  return (
    <View style={styles.container}>
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
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>Hello</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF4D9",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "10%",
    alignSelf: "center",
    zIndex: 1000,
  },
  button: {
    backgroundColor: "#EC988D",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // or 'stretch' or 'contain' as needed
  },
});
