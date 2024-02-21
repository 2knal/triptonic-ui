import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Textarea from '../components/utils/textarea';
import { Link } from 'expo-router';
import BackButton from '@/components/utils/back-button';
import ForwardButton from '@/components/utils/forward-button';

export default function Save() {
    const [text, onChangeText] = useState();

    return (
        <View style={styles.container}>
                {/* <Link href='/trip' asChild>
                    <Button
                    title=""
                    color='#EC988D'
                    onPress={() => {}}/>
                </Link> */}
              <Link href='/trip' asChild>
        <BackButton 
          title="<"/>
      </Link>
            <Text style={styles.normalText}>Every trip must have a cool name</Text>
            <TextInput 
                style={styles.input}
                placeholder='New York Trip!'
                // onChangeText={onChangeText}
                value={text}>
            </TextInput>
            <Link href='/trip' asChild>
        <ForwardButton 
          title=">"/>
      </Link>
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