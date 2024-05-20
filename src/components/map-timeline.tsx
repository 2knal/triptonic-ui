import { useAPIStore } from "@/store";
import CoolText from "./utils/cool-text";
import { View } from "react-native";
import { ScrollView } from "react-native";
import Heading from "./utils/heading";
import Timeline from 'react-native-timeline-flatlist';
import { COLORS } from "assets/constants";

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
        // time: route.time,
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
      {dayWiseData.map((day, index) => <Day key={index} day={day} routes={timelineData[day]} />)}
    </ScrollView>
  );
}

function Day({ day, routes }) {
  return (
    <View>
      <Heading title={`Day ${day}`} css="text-2xl pb-6" />
      <View className="flex flex-1">
        <Timeline
          lineColor={COLORS['sageish']}
          circleColor={COLORS['reddish']}
          timeStyle={{ color: COLORS['darker-text'], fontFamily: 'rethink' }}
          titleStyle={{ color: COLORS['darker-text'], fontFamily: 'rethink' }}
          descriptionStyle={{ color: COLORS['dark-text'], fontFamily: 'rethink' }}
          data={routes} 
          isUsingFlatlist={false}/>
      </View>
    </View>
  );
}
