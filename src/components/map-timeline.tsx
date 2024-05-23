import { useAPIStore } from "@/store";
import CoolText from "./utils/cool-text";
import { View } from "react-native";
import { ScrollView, FlatList, Text } from "react-native";
import Heading from "./utils/heading";
import { useState, useCallback } from "react";
import Settings from "./utils/settings";
import EditTripItemModel from "./edit-trip-item-modal";


export default function MapTimeline() {
  const { routes, setRoutes } = useAPIStore();
  console.log('Timeline rerender', routes.map(route => route.key));
  const findTotalDaysFromRoutes = useCallback((routes) => {
    let totalDays = 1;
    for (const route of routes) {
      totalDays = Math.max(totalDays, route.day);
    }
    return totalDays;
  }, [routes]);

  const totalDays = Array.from({ length: findTotalDaysFromRoutes(routes) }, (_, i) => i + 1);

  const handleMoveUp = useCallback(
    (key) => {
      const index = routes.findIndex(route => route.key === key);
      if (index !== 0) {
        const updatedRoutes = [...routes];
        [updatedRoutes[index - 1], updatedRoutes[index]] = [updatedRoutes[index], updatedRoutes[index - 1]];
        setRoutes(updatedRoutes);
      }
    },
    [routes, setRoutes]
  );

  const handleMoveDown = useCallback(
    (key) => {
      const index = routes.findIndex(route => route.key === key);
      if (index !== routes.length - 1) {
        const updatedRoutes = [...routes];
        [updatedRoutes[index + 1], updatedRoutes[index]] = [updatedRoutes[index], updatedRoutes[index + 1]];
        setRoutes(updatedRoutes);
      }
    },
    [routes, setRoutes]
  );

  const handleDelete = useCallback(
    (key) => {
      const index = routes.findIndex(route => route.key === key);
      setRoutes(routes.filter((route, i) => i !== index));
    },
    [routes, setRoutes]
  );

  return (
    <ScrollView contentContainerClassName="p-6" nestedScrollEnabled={true}>
      {totalDays.map((day) => (
        <Day
          key={day}
          day={day}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleDelete={handleDelete}
          routes={routes.filter((route) => route.day === day)} />
      ))}
    </ScrollView>
  );
}

function Day({ day, routes, handleMoveUp, handleMoveDown, handleDelete }) {
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
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleDelete={handleDelete}
            isLast={index === routes.length - 1} />
        ))}
      </View>
    </View>
  );
}

function TimelineItem({ route, isFirst, isLast, handleMoveUp, handleMoveDown, handleDelete }) {
  const { name, time } = route;
  const borderStyle = isLast ? '' : 'border-l-2';
  const [ modalVisible, setModalVisible ] = useState(false);

  return (
    // <View>
    //   <CoolText title={"Hello fucking world"} />
    <View className={"relative pl-6 border-sageish pb-2 " + borderStyle}>
      <View className="absolute top-0 left-0 w-5 h-5 bg-reddish rounded-full -translate-y-1/2 -translate-x-1/2" />
      <CoolText title={time} css="color-gray pb-2" />
      <Heading title={name} css="text-lg pb-1" />
      <CoolText title={'Lorem Ipsum Thy Bitch'} css="pb-4" />
      <View className="-translate-y-1/4 absolute top-0 right-0">
        <Settings
          isFirst={isFirst}
          isLast={isLast}
          handleUp={() => handleMoveUp(route.key)} 
          handleDown={() => handleMoveDown(route.key)} 
          handleEdit={() => setModalVisible(true)} 
          handleDelete={() => handleDelete(route.key)} />
      </View>
      <EditTripItemModel route={route} visible={modalVisible} closeModal={() => setModalVisible(false)} />
    </View>
    // </View>
  );
}
