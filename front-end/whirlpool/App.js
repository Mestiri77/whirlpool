import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import Login from './interfaces-gen/components/login'
import Creationpdv from '../whirlpool/interfaces-gen/components/AdminInterface/creationpdv'
import Home from '../whirlpool/interfaces-gen/components/AdminInterface/HomePage'
export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});