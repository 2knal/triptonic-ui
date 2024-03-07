import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Modal } from 'react-native';
import BackButton from '@/components/utils/back-button';
import ForwardButton from '@/components/utils/forward-button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';
import *  as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Login() {
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest ({
        iosClientId: "614287183784-e71c3kqifn8d87ln2t9n7uehqhkvfbac.apps.googleusercontent.com",
    });
    const [text, setText] = useState('');
    const navigation = useNavigation();
    React.useEffect(() => {
        handleSignInWithGoogle();
    }, [response])

    async function handleSignInWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if(!user) {
            if(response?.type === "success"){
         await getUserInfo(response.authentication.accessToken);
            }
           
        } else{
            setUserInfo(JSON.parse(user));
        }
    }
    const getUserInfo = async (token) => {
         if(!token) return;
         try {
              const response = await fetch(
"https://www.googleapis.com/userinfo/v2/me", {
     headers: {Authorization : `Bearer ${token}`},
}
              );
              const user = await response.json();
              await AsyncStorage.setItem(`@user`, JSON.stringify(user));
              setUserInfo(user);
         }
         catch(error) {

         }
    };
    const [isDialogVisible, setIsDialogVisible] = useState(false);

  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };
    return (
        <View style={styles.container}>
            <BackButton title="<-" />
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
            <Modal
            transparent = {true}
            visible= {isDialogVisible}
            animationType='fade'>
                <View style = {styles.centerView}>
      <View style = {styles.modalView}>
      <TextInput  keyboardType={'phone-pad'} style={[styles.modalText, styles.inputMargin]}
                    placeholder='Enter phone number'/>
        <View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.submitButton}
    onPress={() => setIsDialogVisible(false)}
    activeOpacity={0.8}
  >
    <Text style={styles.submitText}>Submit</Text>
  </TouchableOpacity>
</View>
      </View>
      </View>
    </Modal>
                <TouchableOpacity style={[styles.input, styles.inputMargin]} onPress={() =>setIsDialogVisible(true)}>
                    <View style={styles.iconTextContainer}>
                        <Icon name="call" size={20} color="#EC988D"/> 
                        <Text style={styles.buttonText}>Continue with phone number</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={[styles.input, styles.inputMargin]} onPress={() =>promptAsync()}>
                    <View style={styles.iconTextContainer}>
                        <Icon name="mail" size={20} color="#EC988D"/> 
                        <Text style={styles.buttonText}>Continue with email</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ForwardButton 
                title="->" 
                onPress={()=>navigation.navigate('/trip')}
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
    centerView : {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20
    },
    modalView: {
        padding: 35,
        borderRadius: 20,
        shadowColor: '#000',
        elevation: 5,
        color: 'black',
        width: 250,
        height: 158,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: 'peachpuff',
        borderWidth: 1,
        borderColor: 'coral',
    },
      blurBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
      },
      submitButton: {
        backgroundColor: '#EC988D',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        elevation: 5,
      },
      submitText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
      },
     
});
