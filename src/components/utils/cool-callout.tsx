import { View, Image, Text } from "react-native";
import { Callout } from "react-native-maps";
import CoolText from "./cool-text";

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
    <Callout tooltip={true}>
      <View className="flex flex-1 bg-white w-64 h-48 p-2 rounded-lg drop-shadow-2xl">
        <CoolText title={marker.name} />
          {/* <Text>
            <Image
              source={{ uri: imageUri }}
              resizeMode="cover"
              style={{ height: 100, width:100 }}
              onError={(error) => console.log("Error loading image:", error)} />
          </Text> */}
      </View>
    </Callout>
  );
}
