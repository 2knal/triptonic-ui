import { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Share as OtherAppsShare } from "react-native";
import CoolText from "@/components/utils/cool-text";
import NavButton from "@/components/utils/nav-button";
import * as Clipboard from 'expo-clipboard';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "assets/constants";
import { useAPIStore } from "@/store";
import Loader from "@/components/loader";
import { useToast, ToastOptions } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import CoolButton from "@/components/utils/cool-button";
import CoolIcon from "@/components/utils/cool-icon";
import { formatRoutes } from "@/utils";

export default function Share() {
  const toast = useToast();
  const router = useRouter();
  const { saveTrip, savedTripId, routes } = useAPIStore();
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('triptonic://trip?id=' + savedTripId);

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
  };

  const onShare = async () => {
    try {
      const result = await OtherAppsShare.share({
        message: formatRoutes(routes)
      });
      console.log('SHARE RESULT', result);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    async function saveTripToDB() {
      if (isLoading) {
        const data = await saveTrip();
        if ('error' in data) {
          toast.show("Unable to save trip. Please try again later :(", {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            swipeEnabled: true,
            animationType: 'zoom-in'
          });
          router.push({ pathname: '/save' });
          return;
        }
        setText(data.link);
        setIsLoading(false);
      }
    }
    saveTripToDB();
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View className="bg-egg-white flex flex-1 justify-center items-center p-4">
      <View className="absolute top-0 left-6">
        <NavButton direction='left' />
      </View>
      <CoolText title="Invite more people!" css="text-2xl pb-4 color-darker-text" />
      <View className="flex flex-row items-center justify-center h-12">
        <TextInput
          value={text}
          className="font-rethink bg-white w-96 text-xl color-dark-text h-12 border-reddish border-2 rounded-full text-center"
          onChangeText={(t) => setText(t)}
          editable={false}
        />
        <TouchableOpacity onPress={handleCopyToClipboard} 
          className="flex flex-1 justify-center items-center absolute right-3 top-1/4 self-center">
          <FontAwesome name="clipboard" color={COLORS['darker-text']} size={24} />
        </TouchableOpacity>
      </View>
      <CoolText title="OR" css="text-2xl italic my-12 self-center"/>
      <CoolText title="Let's share the fun!" css="text-2xl pb-4 color-darker-text" />
      <TouchableOpacity onPress={onShare}  className="flex flex-row items-center gap-3 justify-center h-12 bg-reddish w-96 rounded-full">
        {/* <TextInput
          value={'Share'}
          className="font-rethink bg-white w-36 text-xl color-dark-text h-12 border-reddish border-2 rounded-full text-center"
          editable={false}
        /> */}
        <CoolText title="Share" css="color-white text-xl" />
        <TouchableOpacity
          className="flex justify-center items-center absolute right-3 top-1/4 self-center">
          <FontAwesome name="share" color={COLORS['white']} size={18} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
