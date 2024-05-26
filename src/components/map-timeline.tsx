import { useAPIStore } from "@/store";
import CoolText from "./utils/cool-text";
import { TouchableOpacity, View } from "react-native";
import { ScrollView, FlatList, Text } from "react-native";
import Heading from "./utils/heading";
import { useState, useEffect } from "react";
import Settings from "./utils/settings";
import TripItemModel from "./trip-item-modal";
import { DEFAULT_ROUTE } from "assets/constants";


export default function MapTimeline() {
  const [ modalVisible, setModalVisible ] = useState(false);
  const { routes, totalDays, setTotalDays } = useAPIStore();
  console.log('Timeline rerender:', routes.map(route => route.key));
  console.log('Total days:', totalDays);

  useEffect(() => {
    setTotalDays();
    console.log('Routes updated!')
  }, [routes]);

  const addNewPlace = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always" contentContainerClassName="p-6" nestedScrollEnabled={true}>
      <View className="items-center">
        <Heading title="Timeline" css="text-2xl pb-6" />
      </View>
      <TouchableOpacity onPress={addNewPlace} className="flex justify-center items-center px-4 py-2 rounded-full border-reddish border-2 w-36 mb-6">
        <CoolText title="Add Place" css="text-xl"/>
      </TouchableOpacity>
      {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
        <Day
          key={day}
          day={day}
          routes={routes.filter((route) => route.day === day)} />
      ))}
      <TripItemModel title='Add' route={DEFAULT_ROUTE} visible={modalVisible} closeModal={() => setModalVisible(false)} />
    </ScrollView>
  );
}

function Day({ day, routes }) {
  console.log('Day rerender:', day)
  return (
    <View>
      <Heading title={`Day ${day}`} css="text-2xl pb-8" />
      <View className="pl-6">
        {routes.map((route, index) => (
          <TimelineItem 
            key={route.key}
            route={route}
            isFirst={index === 0}
            isLast={index === routes.length - 1} />
        ))}
      </View>
    </View>
  );
}

function TimelineItem({ route, isFirst, isLast }) {
  const { name, time } = route;
  const borderStyle = isLast ? '' : 'border-l-2';
  const [ modalVisible, setModalVisible ] = useState(false);

  return (
    <View className={"relative pl-6 border-sageish pb-2 " + borderStyle}>
      <View className="absolute top-0 left-0 w-5 h-5 bg-reddish rounded-full -translate-y-1/2 -translate-x-1/2" />
      <CoolText title={time} css="color-gray pb-2" />
      <Heading title={name} css="text-lg pb-1" />
      <CoolText title={route.notes ?? 'Notes'} css="pb-4" />
      <View className="-translate-y-1/4 absolute top-0 right-0">
        <Settings
          routeKey={route.key}
          isFirst={isFirst}
          isLast={isLast}
          handleEdit={() => setModalVisible(true)} />
      </View>
      <TripItemModel title='Edit' route={route} visible={modalVisible} closeModal={() => setModalVisible(false)} />
    </View>
  );
}
