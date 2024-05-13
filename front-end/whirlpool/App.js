import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './interfaces-gen/components/login'
import Creationpdv from '../whirlpool/interfaces-gen/components/AdminInterface/creationpdv'
import CreationArt from '../whirlpool/interfaces-gen/components/AdminInterface/creationdArticle'
import ConsultRapports from '../whirlpool/interfaces-gen/components/AdminInterface/ConsultationDesRapports'
import RapportExpo from './interfaces-gen/components/AdminInterface/RapportExpo';
import RapportExpoDet from './interfaces-gen/components/AdminInterface/RapportdesxpoDet'
import Modifpopup from './interfaces-gen/components/AdminInterface/ModifRapExpo'
import RapportPriceMap from './interfaces-gen/components/AdminInterface/RapportPriceMap'
import RapportPriceMapDet from './interfaces-gen/components/AdminInterface/RapportPriceMapDet'

export default function App() {
  return (
    <View style={styles.container}>
      <RapportPriceMapDet/>
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