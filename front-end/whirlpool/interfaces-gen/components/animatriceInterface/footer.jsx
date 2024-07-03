import * as React from "react";
import {FlatList,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // Importez FontAwesome ou tout autre icône dont vous avez besoin
const Add=require('../../../assets/Add.png')
import { useNavigation, useRoute } from '@react-navigation/native';


function Footer({ ani }) {
  const navigation = useNavigation();
  const route = useRoute();
  
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
    <View style={styles.item}>
      <FontAwesome name="sign-out" size={24} color="#FFF" />
      <Text style={styles.text}>Log out</Text>
    </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>navigation.navigate('WelcomeAnime',{ ani })}>
    <View style={styles.item}>
      <FontAwesome name="home" size={24} color="#FFF" />
      <Text style={styles.text}>Home</Text>
    </View>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#000',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        width:'100%'
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      item1: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:1,
        padding:15,
        backgroundColor:"#FDC100",
        borderRadius:15,
        color:'black'
      },
      text: {
        color: '#FFF',
        marginLeft: 5,
      },
});

export default Footer;