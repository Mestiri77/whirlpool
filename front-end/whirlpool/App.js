import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './interfaces-gen/components/login'
import Creationpdv from '../whirlpool/interfaces-gen/components/AdminInterface/creationpdv'
import CreationArt from '../whirlpool/interfaces-gen/components/AdminInterface/creationdArticle'
import ConsultRapports from '../whirlpool/interfaces-gen/components/AdminInterface/ConsultationDesRapports'
import RapportExpo from './interfaces-gen/components/AdminInterface/RapportExpo';
import RapportExpoDet from './interfaces-gen/components/AdminInterface/RapportdesxpoDet'
import Modifpopup from './interfaces-gen/components/AdminInterface/ModifRapExpo'
import RapportPriceMap from './interfaces-gen/components/AdminInterface/RapportPriceMap'
import RapportPriceMapDet from './interfaces-gen/components/AdminInterface/RapportPriceMapDet'
import RapportSellOut from './interfaces-gen/components/AdminInterface/RapportsSellOut';
import RapportDePresence from './interfaces-gen/components/AdminInterface/RapportDePresence'
import RapportLog from './interfaces-gen/components/AdminInterface/RapportLog'
import CreationCompte from './interfaces-gen/components/AdminInterface/creationCompte'
import PopupRapport from './interfaces-gen/components/AdminInterface/PopupRapport'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} /> */}
          {/* <Stack.Screen name="Creationpdv" component={Creationpdv} />
          <Stack.Screen name="CreationArt" component={CreationArt} /> */}
          <Stack.Screen name="ConsultRapports" component={ConsultRapports} />
          <Stack.Screen name="RapportExpo" component={RapportExpo} />
          <Stack.Screen name="RapportExpoDet" component={RapportExpoDet} />
          <Stack.Screen name="Modifpopup" component={Modifpopup} />
          <Stack.Screen name="RapportPriceMap" component={RapportPriceMap} />
          <Stack.Screen name="RapportPriceMapDet" component={RapportPriceMapDet} />
          <Stack.Screen name="RapportSellOut" component={RapportSellOut} />
          <Stack.Screen name="RapportDePresence" component={RapportDePresence} />
          <Stack.Screen name="RapportLog" component={RapportLog} />
          <Stack.Screen name="CreationCompte" component={CreationCompte} />
          <Stack.Screen name="PopupRapport" component={PopupRapport} />
        </Stack.Navigator>
      </NavigationContainer>
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