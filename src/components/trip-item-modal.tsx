import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Text } from "react-native";
import Dialog from "react-native-dialog";
import { COLORS } from "assets/constants";
import Heading from "./utils/heading";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import { get12HrFormattedTime, get24HrFormattedTime } from "@/utils";
import { useAPIStore } from "@/store";


interface ITripItemModelProps {
  title: string;
  route: any;
  visible: boolean;
  closeModal: any;
}

export default function TripItemModel({ title, route, visible, closeModal }: ITripItemModelProps) {
  const [ routeData, setRouteData ] = useState(route);
  const [ showPicker, setShowPicker ] = useState(false);
  const googleMapsAPIKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  const ref = useRef<GooglePlacesAutocompleteRef>();
  const { addRouteToTrip, editRoute } = useAPIStore();

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.setAddressText(routeData.name);
    }
  }, []);

  const onTimeChange = (e, time) => {
    setRouteData({ ...routeData, time: get12HrFormattedTime(time) })
    setShowPicker(false);
  };

  const handleSave = () => {
    console.log(title, routeData);
    if (title === 'Add') {
      addRouteToTrip(routeData);
    } else {
      editRoute(routeData);
    }
    closeModal();
  };

  return (
    <Dialog.Container contentStyle={{ height: 440, width: 350, borderRadius: 15 }} visible={visible}>
      <Heading title={`${title} Place`} css="text-xl mb-8" />
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        listViewDisplayed={false}
        keepResultsAfterBlur={true}
        disableScroll={false}
        renderDescription={(row) => row.description.substring(0, 40) + "\u2026"}
        ref={ref}
        styles={{ 
          container: {
            flex: 0,
            width: '100%'
          },
          textInputContainer: { width: '100%', paddingVertical: 10, },
          textInput: {
            borderBottomColor: COLORS['reddish'],
            borderBottomWidth: 2, fontFamily: 'rethink', color: COLORS['dark-text'],
            height: 56
          },
          listView: { 
            zIndex: 4,
            position: 'absolute',
            top: 50, 
            left: 0,
            right: 0,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#fff',
            maxheight: 64
          },
          row: {
            zIndex: 2,
            backgroundColor: '#fff',
            padding: 13,
            flexDirection: 'row',
          },
          separator: {
            height: 1,
            backgroundColor: '#c8c7cc',
          }
        }}
        fetchDetails={true}
        minLength={2}
        placeholder='Search'
        onPress={(data, details=null) => {
          const name = data.description.split(',')[0];
          ref.current.setAddressText(name);
          
          setRouteData({ 
            ...routeData,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            longitudeDelta: 1,
            latitudeDelta: 1,
            icon: details.icon,
            name,
          })
        }}
        query={{
          key: googleMapsAPIKey,
          language: 'en',
        }}
      /> 
      <TextInput 
        className="font-rethink bg-white w-full text-lg color-dark-text h-12 border-reddish border-b-2 px-3 mb-6"
        placeholder="Add day..."
        keyboardType='numeric'
        onChangeText={(day) => setRouteData({ ...routeData, day })}
        value={`${routeData.day}`}
        maxLength={2}
      />   
      <TextInput
        className="font-rethink bg-white w-full text-lg color-dark-text h-12 border-reddish border-b-2 px-3 mb-6"
        placeholder="Add some notes..."
        onChangeText={(d) => setRouteData({ ...routeData, notes: d })}
        value={routeData.notes}
        selectionColor={COLORS['sageish']}
      ></TextInput>
      <View className="flex">
        <Text
          className="font-rethink w-full text-lg color-dark-text h-12 border-reddish border-b-2 px-3 bg-white"
          onPress={() => setShowPicker(true)}
        >{routeData.time}</Text>
        {showPicker && <DateTimePicker
          value={new Date()}
          testID="dateTimePicker"
          mode={'time'}
          is24Hour={true}
          onChange={onTimeChange}
        />}
      </View>

      <View className="absolute bottom-6 right-6 gap-2 flex flex-row justify-end mt-4">
        <Dialog.Button bold={true} color={COLORS['bluei']} label="Cancel" onPress={closeModal} />
        <Dialog.Button bold={true} color={COLORS['sageish']} label="Save" onPress={handleSave} />
      </View>
    </Dialog.Container>
  );
}
