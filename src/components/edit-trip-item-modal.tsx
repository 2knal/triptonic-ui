import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, ScrollView } from "react-native";
import Dialog from "react-native-dialog";
// import { Dialog } from 'react-native-simple-dialogs';
import CoolText from "./utils/cool-text";
import { COLORS } from "assets/constants";
import Heading from "./utils/heading";
import CoolButton from "./utils/cool-button";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import Textarea from "./utils/textarea";
import { get24HrFormattedTime } from "@/utils";


interface IEditTripItemModelProps {
  route: any;
  visible: boolean;
  closeModal: any;
}

export default function EditTripItemModel({ route, visible, closeModal }: IEditTripItemModelProps) {
  const [ data, setData ] = useState(route);
  const [ mode, setMode ] = useState('date');
  const [ showPicker, setShowPicker ] = useState(false);
  const googleMapsAPIKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  let ref = useRef<GooglePlacesAutocompleteRef>();

    useEffect(() => {
      if (ref && ref.current) {
        ref.current.setAddressText(data.title);
      }
    }, []);

  const onChange = (e, time) => {
    setData({ ...data, time: get24HrFormattedTime(time) })
    setShowPicker(false);
  };

  return (
    <Dialog.Container contentStyle={{ zIndex: 5, height: 320, width: 350, elevation: 0, borderRadius: 15 }} visible={visible}>
      <Heading title="Edit Place" css="text-xl mb-8" />
      <View className="h-16 z-10">
        <GooglePlacesAutocomplete
          listViewDisplayed={true}
          keepResultsAfterBlur={true}
          // disableScroll={false}
          ref={ref}
          styles={{ 
            textInput: { position: 'relative', borderBottomColor: COLORS['reddish'], fontSize: 16, borderBottomWidth: 2, fontFamily: 'rethink', color: COLORS['dark-text'], height: 38 },
            listView: { zIndex: 100, position: 'absolute', top: 42, left: 0, right: 0, fontFamily: 'rethink', color: COLORS['dark-text'], borderRadius: 25 }
          }}
          fetchDetails={true}
          minLength={3}
          debounce={400}
          placeholder='Search'
          onPress={(data, details=null) => {
            ref.current.setAddressText(data.description.split(',')[0]);
          }}
          query={{
            key: googleMapsAPIKey,
            language: 'en',
          }}
        />
      </View>
      <TextInput
        className="font-rethink bg-white w-full text-lg color-dark-text h-12 border-reddish border-b-2 px-3 mb-6"
        placeholder="Add some notes..."
        onChangeText={(t) => setData({ ...data, description: t })}
        value={data.description}
        selectionColor={COLORS['sageish']}
      ></TextInput>
      <View className="flex">
        <Text
          className="font-rethink w-full text-lg color-dark-text h-12 border-reddish border-b-2 px-3 bg-white"
          onPress={() => setShowPicker(true)}
        >{data.time}</Text>
        {showPicker && <DateTimePicker
          value={new Date()}
          testID="dateTimePicker"
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
        />}
      </View>
      <View className="gap-2 flex flex-row justify-end mt-4">
        <Dialog.Button bold={true} color={COLORS['bluei']} label="Cancel" onPress={closeModal} />
        <Dialog.Button bold={true} color={COLORS['sageish']} label="Save" onPress={undefined} />
      </View>
    </Dialog.Container>
  );
}
