import { useAPIStore } from "@/store";
import CoolText from "./utils/cool-text";
import { View } from "react-native";
import { ScrollView } from "react-native";
import Heading from "./utils/heading";
import { useState, useCallback } from "react";
import CoolIcon from "./utils/cool-icon";
import Settings from "./utils/settings";

export default function MapTimeline() {
  const { routes } = useAPIStore();

  function splitDayWise(routes) {
    const data = {};
    for (const route of routes) {
      const dayNum = route.day;
      if (!(dayNum in data)) {
        data[dayNum] = [];
      }
      data[dayNum] = [...data[dayNum], {
        time: route.time.padStart(8, '0').split(' ')[0],
        title: route.name,
        description: 'Lorem Ispum thy Bitch'
      }];
    }
    return data;
  }
  const timelineData = splitDayWise(routes);
  const dayWiseData = Object.keys(timelineData);

  return (
    <ScrollView contentContainerClassName="p-6" nestedScrollEnabled={true}>
      {dayWiseData.map((day, index) => (
        <Day key={index} day={day} routes={timelineData[day]} />
      ))}
    </ScrollView>
  );
}

function Day({ day, routes }) {
  const [ data, setData ] = useState(routes);

  const handleMoveUp = useCallback(
    (index) => {
      if (index !== 0) {
        const prevState = [...data];
        const temp = prevState[index - 1]
        prevState[index - 1] = prevState[index]
        prevState[index] = temp
        setData(prevState);
      }
    },
    [setData, data]
  );

  const handleMoveDown = useCallback(
    (index) => {
      if (index !== data.length - 1) {
        const prevState = [...data];
        const temp = prevState[index + 1]
        prevState[index + 1] = prevState[index]
        prevState[index] = temp
        setData(prevState);
      }
    },
    [setData, data]
  );

  const handleDelete = useCallback(
    (index) => {
      const prevState = [...data];
      if (index >= 0 && index < prevState.length) {
        prevState.splice(index, 1);
        setData(prevState);
      }
    },
    [setData, data]
  );

  return (
    <View>
      <Heading title={`Day ${day}`} css="text-2xl pb-8" />
      <View className="flex flex-1 pl-6">
        {data.map((route, index) => (
          <TimelineItem 
            key={index}
            index={index} 
            route={route}
            isFirst={index === 0}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleDelete={handleDelete}
            isLast={index === data.length - 1}/>
        ))}
      </View>
    </View>
  );
}

function TimelineItem({ index, route, isFirst, isLast, handleMoveUp, handleMoveDown, handleDelete }) {
  const { title, description, time } = route;
  const borderStyle = isLast ? '' : 'border-l-2';

  return (
    <View className={"relative pl-6 border-sageish pb-2 " + borderStyle}>
      <View className="absolute top-0 left-0 w-5 h-5 bg-reddish rounded-full -translate-y-1/2 -translate-x-1/2" />
      <CoolText title={time} css="color-gray pb-2" />
      <Heading title={title} css="text-lg pb-1" />
      <CoolText title={description} css="pb-4" />
      <View className="-translate-y-1/4 absolute top-0 right-0">
        <Settings
          isFirst={isFirst}
          isLast={isLast}
          handleUp={() => handleMoveUp(index)} 
          handleDown={() => handleMoveDown(index)} 
          handleEdit={undefined} 
          handleDelete={() => handleDelete(index)} />
      </View>
    </View>
  );
}
