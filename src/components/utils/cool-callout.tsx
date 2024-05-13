import { View, Image, Text,  } from "react-native";
import { Callout } from "react-native-maps";
import CoolText from "./cool-text";
import React from "react";
import { WebView } from 'react-native-webview';

interface ICoolCallout {
  marker: any;
}

export default function CoolCallout({ marker }: ICoolCallout) {
  function constructPhotoUrl(photoData): string {
    const { photo_reference } = photoData;
    const googleMapsAPIKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
    const maxWidth = 120;
  
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photo_reference}&key=${googleMapsAPIKey}`;
  
    return photoUrl;
  }

  const imageUri = constructPhotoUrl(marker.photos);
  // console.log(imageUri);

  return (
    <View className="flex flex-1 pb-2">
    <Callout tooltip={true}>
      <View className="flex flex-1 bg-white w-64 h-48 p-2 rounded-lg drop-shadow-2xl"
      style={{ elevation: 100 }}>
        <CoolText title={marker.name} />
        {/* <View>
          <WebView style={{ height: 100, width: 230 }} source={{ uri: imageUri }} /> 
        </View>
        <Image
          source={{ uri: imageUri }}
          resizeMode="cover"
          style={{ height: 100, width:100 }}
          onError={(error) => console.log("Error loading image:", error)} /> */}
      </View>
    </Callout>
    </View>
  );
}
