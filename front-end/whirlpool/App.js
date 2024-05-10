import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './interfaces-gen/components/login'
import Creationpdv from '../whirlpool/interfaces-gen/components/AdminInterface/creationpdv'
import CreationArt from '../whirlpool/interfaces-gen/components/AdminInterface/creationdArticle'

export default function App() {
  return (
    <View style={styles.container}>
      <CreationArt/>
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