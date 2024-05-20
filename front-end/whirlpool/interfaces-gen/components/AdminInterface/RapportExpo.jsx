import React, { useState } from "react";
import { View, Text, StyleSheet, Button, PermissionsAndroid, ScrollView, LogBox,TouchableOpacity } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Header from './header'
import Footer from './footer'

function RapportExpo() {
  const navigation = useNavigation();


  return (
    <NativeBaseProvider>
      <View style={styles.view1}>
          <Header />  
        <ScrollView style={{marginTop:-350}}>
          <View>
            <View>
              <Text style={styles.textexpo}>Date :</Text>
              <Text style={styles.textexpo}>Zone :</Text>
              <Text style={styles.textexpo}>Magasin :</Text>
              <Text style={styles.textexpo}>Animatrice :</Text>
            </View>
            <View style={styles.container}>
      {/* Première ligne */}
      <View style={styles.row}>
        <View style={styles.cell}><Text>Famille de produit</Text></View>
        <View style={styles.cell}><Text>Expo Globale</Text></View>
        <View style={styles.cell}><Text>Expo Whirlpool</Text></View>
        <View style={styles.cell}><Text>Taux D'exposition</Text></View>
      </View>

      {/* Deuxième ligne */}
      <View style={styles.row}>
        <View style={styles.cell1}><Text>Donnée 1</Text></View>
        <TouchableOpacity
      onPress={() => navigation.navigate('RapportExpoDet', { propKey: 'propValue' })}
    >
      <View style={styles.cell2}>
        <Text style={styles.textcell2}>Donnée 2</Text>
      </View>
    </TouchableOpacity>
        <View style={styles.cell1}><Text>Donnée 3</Text></View>
        <View style={styles.cell1}><Text>Donnée 4</Text></View>
      </View>

      {/* Dernière ligne */}
      <View style={[styles.row, styles.totalRow]}>
        <View style={[styles.cell, styles.totalCell]}><Text>Total</Text></View>
        <View style={styles.cell}><Text>Donnée totale 1</Text></View>
        <View style={styles.cell}><Text>Donnée totale 2</Text></View>
        <View style={styles.cell}><Text>Donnée totale 3</Text></View>
      </View>
    </View>
    <Center>
    <TouchableOpacity onPress={() =>{}} style={styles.btns}>
        <Text style={styles.btnText}>Exporter</Text>
      </TouchableOpacity>
      </Center>
          </View>
        </ScrollView>
      </View>
        <Footer/>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  textexpo:{
    fontSize: 15,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5, 
    borderColor: '#D0D3D4',
    marginTop:5 
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5, 
    borderColor: '#D0D3D4', 
  },
  cell1: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0D3D4', // Background color of the button
    borderWidth: 0.5, 
    borderColor: '#D0D3D4', 
  },
  cell2:{
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDC100', // Background color of the button
    borderWidth: 0.5, 
    borderColor: '#D0D3D4',
  },
  totalRow: {
    borderTopWidth: 1,
    borderColor: 'black',
  },
  totalCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcell2:{
    color: 'white', // Text color
  },
  btns: {
    backgroundColor: '#FDC100', // Background color of the button
    padding: 10,
    borderRadius: 5,
    width:150,
    marginTop:"5%",
    alignItems: 'center',
  },
  btnText: {
    color: 'white', // Text color
    fontSize: 16,
    textAlign:"center"
  },
});

export default RapportExpo;
