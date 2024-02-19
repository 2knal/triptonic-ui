import React, { useState } from 'react';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import Textarea from '../components/utils/textarea';
import { View, StyleSheet } from 'react-native';
import Button from './utils/button';
import { Text } from 'react-native';
import SmallBtn from './utils/smallBtn';
import Slider from '@react-native-community/slider';

export default function Filter() {
    const { close: closePrompt } = useBottomSheet();
    const cuisineList = ['🍕Italian', '🍛Indian', '🍜Japanese', '🌮Mexican', '🍟French', '🍖Chinese', '🍙Korean'];
    const placesToVisit = ['🎢 Park', '🦖 Museums', '🕺🏻Clubs'];

    const [selectCuisines, setSelectCuisines] = useState([]);
    const [selectPlaces, setSelectPlaces] = useState([]);

    const onCuisineBtnPress = () => {
      
    }

    const onPlacesBtnPress = () => {

    }

    return(
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
              <Text style = {styles.mainText}>Applied Filters</Text>
            </View>

            <View style={styles.normalRow}>
              <Text style={styles.normalText}>Cuisine</Text>
              <View style={styles.btnbox}>
                {cuisineList.map((cuisine, i) => (
                  (cuisine == '🍜Japanese') ? 
                  <SmallBtn key={i} title={cuisine} selected={true} onPress={() => {}}/> :
                  <SmallBtn key={i} title={cuisine} selected={false} onPress={() => {}}/> 
                ))}
              </View>
            </View>

            <View style={styles.normalRow}>
              <Text style={styles.normalText}>Distance</Text>
              <Slider
                style={styles.sliders}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#EC988D"
                maximumTrackTintColor="grey"
              />
            </View>

            <View style={styles.normalRow}>
              <Text style={styles.normalText}>Age</Text>
              <Slider
                style={styles.sliders}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#EC988D"
                maximumTrackTintColor="grey"
              />
            </View>

            <View style={styles.normalRow}>
              <Text style={styles.normalText}>Places to visit</Text>
              <View style={styles.btnbox}>
                {placesToVisit.map(places => (
                  (places == '🦖 Museums') ? 
                  <SmallBtn title={places} selected={true} onPress={() => {}}/> :
                  <SmallBtn title={places} selected={false} onPress={() => {}}/>
                ))}
              </View>
            </View>

            <View style = {styles.buttonRow}>
            <Button
            textColor='#B6B6B6'
            title="Cancel"
            color='#EDD5D1'
            onPress={() => closePrompt()}/>
            <Button 
                title="Apply"
                color='#EC988D'
                onPress={() => {}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sliders: {
      width: 350,
      height: 200
    },
    container: {
      flex: 1,
      color: '#1E1E1E',
      padding: 20
    },
    buttonRow: {
      position: 'absolute',
      bottom: '10%',
      alignSelf: 'center',
      flexDirection: 'row',
      gap: 20,
    },
    btnbox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    normalRow: {
      flexDirection: 'column',
      alignSelf: 'baseline', 
      paddingTop: 10,
      paddingBottom: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 28,
        borderRadius: 40,
        elevation: 3,
        backgroundColor: 'black',
        width: 160,
        textAlign: 'center'
      },
      mainText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
      normalText: {
        fontSize: 15,
        padding: 5,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      }
  });