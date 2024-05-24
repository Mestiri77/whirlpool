import * as React from "react";
import {FlatList,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // Importez FontAwesome ou tout autre icône dont vous avez besoin
const Add=require('../../../assets/Add.png')


function Footer() {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
    <View style={styles.item}>
      <FontAwesome name="sign-out" size={24} color="#FFF" />
      <Text style={styles.text}>Log out</Text>
    </View>
      </TouchableOpacity >
      <TouchableOpacity>
        <View style={styles.item1}>
        <FontAwesome name="plus" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('WelcomeManager')}>
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