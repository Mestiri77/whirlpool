import * as React from "react";
import {FlatList,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // Importez FontAwesome ou tout autre icône dont vous avez besoin


function Footer() {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
    <View style={styles.item}>
      <FontAwesome name="sign-out" size={24} color="#FFF" />
      <Text style={styles.text}>Log out</Text>
    </View>
      </TouchableOpacity>
      <TouchableOpacity>
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
      text: {
        color: '#FFF',
        marginLeft: 5,
      },
});

export default Footer;