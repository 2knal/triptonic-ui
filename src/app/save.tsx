import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button} from 'react-native';
import BackButton from '@/components/utils/back-button';
import ForwardButton from '@/components/utils/forward-button';
import { useNavigation } from '@react-navigation/native';

export default function Save() {
    const [text, setText] = useState('');
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
                {/* <Link href='/trip' asChild>
                    <Button
                    title=""
                    color='#EC988D'
                    onPress={() => {}}/>
                </Link> */}
        <BackButton title="<-" onPress={()=>this.props.navigation.navigate('Trip')}/>
            <Text style={styles.normalText}>Every trip must have a cool name</Text>
            <TextInput 
                style={styles.input}
                placeholder='New York Trip!'
                onChangeText={(text) => setText(text)}
                value={text}>
            </TextInput>
        <ForwardButton title="->" onPress={()=>this.props.navigation.navigate('Login')}/>
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
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'grey',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 25,
        elevation: 3,
        width: 300,
        textAlign: 'center',
        borderColor: '#EC988D',
        color: 'grey'
    }
});