import React, { useState } from "react";
import { View, Text, StyleSheet, Button, PermissionsAndroid, ScrollView, LogBox,TouchableOpacity } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import Header from './header'
import Footer from './footer'

function RapportExpodet() {
 

  return (
    <NativeBaseProvider>
      <View style={styles.view1}>
          <Header />  
        <ScrollView style={{marginTop:-350}}>
          <View>
            <View>
              <Text style={styles.textexpo}>Famille de produit</Text>
            </View>
    <View style={styles.container}>
      {/* Première ligne */}
      <View style={styles.row}>
        <View style={styles.cell}><Text>Marques</Text></View>
        <View style={styles.cell}><Text>Référence</Text></View>
        <View style={styles.cell}><Text>Prix</Text></View>
        <View style={styles.cell}><Text>:</Text></View>
      </View>

      {/* Deuxième ligne */}
      <View style={styles.row}>
        <View style={styles.cell1}><Text>Donnée 1</Text></View>
        <View style={styles.cell1}><Text>Donnée 2</Text></View>
        <View style={styles.cell1}><Text>Donnée 3</Text></View>
        <TouchableOpacity>
        <View style={styles.cell2}><Text style={styles.textcell2}>Modifer</Text></View>
        </TouchableOpacity>
      </View>
    </View>
   
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
    borderColor: 'D0D3D4',
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

export default RapportExpodet;
