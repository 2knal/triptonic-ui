import { View } from "react-native";
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
  return (
    <View className="p-2">
      <Callout tooltip={true}>
        <View className="bg-white w-72 h-64 p-2 rounded-lg elevation-4">
          <Heading title={marker.name} />
          <View className="flex flex-row justify-start items-center w-3/5">
            <Stars
              half={true}
              default={marker.rating ?? 4.6}
              starSize={1}
              spacing={-4}
              count={5}
              fullStar={<CoolIcon iconName="star" color={COLORS['reddish']} />}
              emptyStar={<CoolIcon iconName="star-o" color={COLORS['reddish']} />}
              halfStar={<CoolIcon iconName="star-half-empty" color={COLORS['reddish']} />}/>
          </View>
          <View className="flex flex-1 flex-row justify-start items-center">
            <Heading title="Day: " />
            <CoolText title={marker.day} />
          </View>
          <View className="flex flex-1 flex-row justify-start items-center">
            <Heading title="Time: " />
            <CoolText title={marker.time} />
          </View>
          <View className="flex flex-1 flex-row justify-start items-center">
            <Heading title="Avg cost: " />
            <CoolText title={`${marker.cost ?? 20.0}$ per person`} />
          </View>
        </View>
      </Callout>
    </View>
  );
}
