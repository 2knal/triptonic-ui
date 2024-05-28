import { View, Linking, Pressable, TouchableOpacity } from "react-native";
import { Callout } from "react-native-maps";
import CoolText from "./cool-text";
import React from "react";
import Stars from 'react-native-stars';
import CoolIcon from "./cool-icon";
import Heading from "./heading";
import { COLORS } from "assets/constants";
import { IRoute } from "@/utils";

interface ICoolCallout {
  marker: IRoute;
}

export default function CoolCallout({ marker }: ICoolCallout) {
  const serves = (marker.serves || []).join(' • ');
  let markerIcon = 'hotel';
  if (marker.type === 'transit') markerIcon = 'bus';
  if (marker.type === 'tourist') markerIcon = 'plane';

  return (
  <View className="p-2">
    <Callout tooltip={true}>
      <View className="bg-white w-72 max-h-96 p-4 rounded-lg elevation-4">
        <CoolText title={marker?.business_status == 'OPERATIONAL' ? 'Open: ' + marker.todays_working_hours : 'Closed'} css="pb-2 color-gray" />
        
        <View className="flex flex-row justify-between items-center mb-2">
          <Heading title={marker.name} />
          {marker?.website && (
            <TouchableOpacity className="w-12 h-12 rounded-full" onPress={() => {
              Linking.openURL(marker?.website);
              console.log('On press something?');
            }}>
              <CoolIcon iconName={'external-link'} />  
            </TouchableOpacity>
          )}
        </View>
        
        {marker?.description && <CoolText title={marker?.description} />}
        <View className="flex flex-row justify-start items-center px-4 w-3/5 mb-2">
          <Stars
            half={true}
            default={marker.rating ?? 4.6}
            starSize={1}
            spacing={-4}
            count={5}
            fullStar={<CoolIcon iconName="star" color={COLORS['reddish']} />}
            emptyStar={<CoolIcon iconName="star-o" color={COLORS['reddish']} />}
            halfStar={<CoolIcon iconName="star-half-empty" color={COLORS['reddish']} />}
          />
        </View>
        
        {serves && (
          <View className="flex flex-row justify-start items-center mb-2">
            <Heading title="Serves: " />
            <CoolText title={serves} />
          </View>
        )}
        
        <View className="flex flex-row justify-start items-center mb-2">
          <Heading title="Day: " />
          <CoolText title={marker.day} />
        </View>
        
        <View className="flex flex-row justify-start items-center mb-2">
          <Heading title="Time: " />
          <CoolText title={marker.time} />
        </View>
        
        <View className="flex flex-row justify-start items-center">
          <Heading title="Total User Reviews: " />
          <CoolText title={`${marker?.total_reviews}`} />
        </View>
      </View>
    </Callout>
  </View>
  );
}
