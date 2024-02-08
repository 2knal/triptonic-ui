import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import ActionSheet from '../components/action-sheet';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Link href="/home">Go to Home Page!</Link>
      <StatusBar style="auto" />
      <ActionSheet 
        index={0}
        children={
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
