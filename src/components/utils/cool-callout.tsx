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
      <View className="flex flex-1 bg-white w-48 h-24 p-2 rounded-lg drop-shadow-2xl"
      style={{ elevation: 100 }}>
        <CoolText title={marker.name} />
        <CoolText title={marker.rating} />
        {/* <View>
          <WebView style={{ height: 100, width: 230 }} source={{ uri: imageUri }} /> 
        </View>
        <Image
          source={{ uri: imageUri }}
          resizeMode="cover"
          style={{ height: 100, width:100 }}
          onError={(error) => console.log("Error loading image:", error)} /> */}
          {/* <Text className="flex flex-row justify-center bg-reddiah">
            <CoolText title="Tags:" />
            <Image
              width={24}
              height={24}
              source={{ uri: marker.icon }}
              resizeMode="contain"
            />
          </Text>

          <Text className="bg-sageish">
            <Image
              width={120}
              height={120}
              style={{ marginTop: -60 }}
              source={{ uri: imageUri }}
              resizeMode="contain"
            />
          </Text> */}
      </View>
    </Callout>
    </View>
  );
}
