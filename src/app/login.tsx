import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import BackButton from '@/components/utils/back-button';
import ForwardButton from '@/components/utils/forward-button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Login() {
    const [text, setText] = useState('');
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <BackButton 
                onPress={()=>navigation.navigate('Save')} 
                title="<-"
            />
            <Text style={styles.normalText}>Let's share the fun!</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={[styles.input, styles.inputMargin]}
                    placeholder='triptonic.xyz.010101'/>
                <Icon name="copy" size={20} color="#EC988D"/> 
            </View>
            <View style={styles.line}></View>
            <Text style={styles.normalText}>Login to save the trip</Text>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={[styles.input, styles.inputMargin]} onPress={() => console.log('Email Login Pressed')}>
                    <View style={styles.iconTextContainer}>
                        <Icon name="call" size={20} color="#EC988D"/> 
                        <Text style={styles.buttonText}>Continue with phone number</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={[styles.input, styles.inputMargin]} onPress={() => console.log('Email Login Pressed')}>
                    <View style={styles.iconTextContainer}>
                        <Icon name="mail" size={20} color="#EC988D"/> 
                        <Text style={styles.buttonText}>Continue with email</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ForwardButton 
                title="->" 
                onPress={()=>navigation.navigate('Trip')}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF4D9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    normalText: {
        fontSize: 17,
        padding: 5,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        alignItems: 'flex-start',
        color: 'grey',
    },
    buttonText: {
        fontSize: 16,
        color: '#EC988D',
        marginLeft: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 25,
        elevation: 4,
        width: 300,
        borderColor: '#EC988D',
        color: 'grey'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
    },
    inputMargin: {
        marginRight: 10,
    },
    line: {
        height: 1,
        marginVertical: 12,
        marginLeft: 80, 
        marginRight: 80, 
        backgroundColor: 'gray', 
        borderTopWidth: 1, 
        borderBottomWidth: 1,
        borderColor: 'gray',
        width: '90%',
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
