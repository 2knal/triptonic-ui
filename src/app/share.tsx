import { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import CoolText from "@/components/utils/cool-text";
import NavButton from "@/components/utils/nav-button";
import * as Clipboard from 'expo-clipboard';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "assets/constants";
import { useAPIStore } from "@/store";
import Loader from "@/components/loader";
import { useToast, ToastOptions } from "react-native-toast-notifications";
import { useRouter } from "expo-router";

export default function Share() {
  const toast = useToast();
  const router = useRouter();
  const { saveTrip } = useAPIStore();
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('triptonic.com/34fgh46');

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
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
      <CoolText title="Let's share the fun!" css="text-2xl pb-4 color-darker-text" />
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
    </View>
  );
}
