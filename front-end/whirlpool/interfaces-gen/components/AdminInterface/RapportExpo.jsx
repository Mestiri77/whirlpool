import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, PermissionsAndroid, ScrollView, LogBox,TouchableOpacity } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import { useNavigation,useRoute } from '@react-navigation/native';
import Header from './header'
import Footer from './footer'
import axios from 'axios'
import port from '../port'
import AsyncStorage from '@react-native-async-storage/async-storage';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

function RapportExpo() {
  const route = useRoute()
const { month, pdv }=route.params
  const navigation = useNavigation();


  
  const [load,setLoad]=React.useState(false)

  const [categ,setCateg]=React.useState([])
  const [references,setReferences]=React.useState([])
  const [marques,setMarques]=React.useState([])
  const [pdvs,setPdvs]=React.useState([])
const [ anim ,setAnim]=React.useState({})
 
  
  const [idWhirlpool,setIdwhirlpool]=React.useState(null)

  const storeData = async (key, category) => {
    try {
      await AsyncStorage.setItem(key, category);
    } catch (e) {
      console.error(e);
    }
  };

/////////////////Functions///////////////////////////
const FetchAnim=async(pdvs)=>{
  try{
    const response=await axios.get(`http://`+port+`:3000/api/users/user/${pdvs}`)
    console.log(response.data);
    setAnim(response.data)
  }
  catch (error) {
    console.error('Error fetching :', error)
  }
}
const Fetchallcateg=async()=>{
  try{
    const response=await axios.get("http://"+port+":3000/api/categories/categories")
    console.log(response.data);
    setCateg(response.data)
  }
  catch (error) {
    console.error('Error fetching :', error)
  }
}

const Fetchallref=async(categname)=>{
  try{
    const response=await axios.get("http://"+port+":3000/api/reference/references")
    setReferences(response.data)
  }catch (error) {
      console.error('Error fetching :', error)
    }
  }
  const Fetchallmarq=async()=>{
    try{
      const response=await axios.get("http://"+port+":3000/api/marques/marques")
      setMarques(response.data)
    }catch (error) {
      console.error('Error fetching :', error)
    }
  }
  const getpdvByID=async(id)=>{
    try{
  router.get('/namepdv',pdvController.getOnePDV)
      let response=await axios.get("http://"+port+":3000/api/pdvs/pdvs/"+id)
      setPdvs(response.data)
      setLoad(!load)
    }
    catch (error) {
      console.error('Error fetching PDVs:', error)
    }
  }
///////////////////////////////////////////////////////////////////////////////
  const findIdWhirlpool = () => {
    const marqueselement = marques.find(el => el.marquename === 'whirlpool');
    if (marqueselement) {
      setIdwhirlpool(marqueselement.idMarque);
    }
  }
const CountSameCateg=(id)=>{
  let count=0
  references.forEach(el=>{
    if(el.Category_idCategory==id){
      count++
    }
  })
  return count
}
const Findwhirlpool=(id)=>{
  let whirlpool=0
  references.forEach(el=>{
    if(el.Marque_idMarque==idWhirlpool&&el.Category_idCategory==id){
      whirlpool++
    }
  })
return whirlpool
}
const CountTaux = (total, partie) => {
  const taux = (partie / total) * 100;
  if (!isNaN(taux)) {
    return taux.toFixed(2); // Cela va arrondir le nombre à deux chiffres après la virgule
  } else {
    return 0;
  }
}
 const TotalExpoGlob=()=>{
  let total=0
  {categ.map(el => (
    total+=CountSameCateg(el.idCategory)
    ))}
    return total
 }
 const TotalExpoWhirl=()=>{
  let total=0
  { categ.map(el => (
    total+=Findwhirlpool(el.idCategory)
    ))}
    return total
 }
 const TotalTaux=()=>{
  let total=0
  {categ && categ.map(el => (
    total+=CountTaux(CountSameCateg(el.idCategory),Findwhirlpool(el.idCategory))
    ))}
    return total
 }
 const exportToExcel = async () => {
  const data = [
    ["Famille de produit", "Expo Globale", "Expo Whirlpool", "Taux D'exposition"],
    ...categ.map(el => [
      el.Categoryname,
      CountSameCateg(el.idCategory),
      Findwhirlpool(el.idCategory),
      CountTaux(CountSameCateg(el.idCategory), Findwhirlpool(el.idCategory)) + "%"
    ]),
    ["Total", TotalExpoGlob(), TotalExpoWhirl(), TotalTaux() + "%"]
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rapport Expo",true);

  const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  const uri = FileSystem.cacheDirectory + 'rapport_expo.xlsx';
  console.log("good");
  await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
  await Sharing.shareAsync(uri);
};

React.useEffect(()=>{
  Fetchallcateg()
  Fetchallref()
  Fetchallmarq()
  findIdWhirlpool()
  FetchAnim(pdvs)
  getpdvByID(anim.PDV_idPDV)
},[load])
////////////////////////////////////////////////////
  return (
    <NativeBaseProvider>
      <View style={styles.view1}>
          <Header />  
        <ScrollView style={{marginTop:-50}}>
        <View>
        <View >
    <Text style={styles.textexpo}>Date :</Text>
    <Text style={styles.textexpo}>Zone :{pdvs.location}</Text>
    <Text style={styles.textexpo}>Magasin :{pdv}</Text>
    <Text style={styles.textexpo}>Animatrice {anim.name}:</Text>
  </View>
  <View style={styles.container2}>
    {/* Première colonne */}
    <View style={styles.column}>
    <View style={styles.cell}><Text>Famille de produit</Text></View >
      {categ && categ.map(el => (
      <View style={styles.cell1}>
        <Text>{el.Categoryname}</Text>
      </View >
      ))}
      <View style={styles.cell}><Text>Total</Text></View>
    </View>

    {/* Deuxième colonne */}
    <View style={styles.column}>
    <View style={styles.cell}><Text>Expo Globale</Text></View>
    {categ && categ.map(el => (
      <TouchableOpacity   onPress={() => {navigation.navigate('RapportExpoDet');
      storeData('category', el.Categoryname);
      }}>
      <View style={styles.cell2}>
      <Text style={styles.textcell2}>{CountSameCateg(el.idCategory)}</Text>
      </View >
      </TouchableOpacity>
      ))}
      {/* Espace réservé pour les données */}
      <View style={styles.cell}><Text>{TotalExpoGlob()}</Text></View>
    </View>

    {/* Troisième colonne */}
    <View style={styles.column}>
    <View style={styles.cell}><Text>Expo Whirlpool</Text></View>
      {categ && categ.map(el => (
      <View style={styles.cell1}>
        <Text>{Findwhirlpool(el.idCategory)}</Text>
      </View >
      ))}
      {/* Espace réservé pour les données */}
      <View style={styles.cell}><Text>{TotalExpoWhirl()}</Text></View>
    </View>

    {/* Quatrième colonne */}
    <View style={styles.column}>
    <View style={styles.cell}><Text>Taux D'exposition</Text></View>
      {categ && categ.map(el => (
      <View style={styles.cell1}>
        <Text>{CountTaux(CountSameCateg(el.idCategory),Findwhirlpool(el.idCategory))}%</Text>
      </View >
      ))}
      {/* Espace réservé pour les données */}
      <View style={styles.cell}><Text>{TotalTaux()}%</Text></View>
    </View>
  </View>
    <Center>
    <TouchableOpacity onPress={() =>{exportToExcel()}} style={styles.btns}>
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
  2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5, 
    borderColor: '#D0D3D4',
    marginTop:5 
  },
  container2: {
    flexDirection: 'row', // Organise les éléments horizontalement (colonnes)
    justifyContent: 'space-between', // Espace les éléments de manière égale sur l'axe principal
    alignItems: 'flex-start', // Aligne les éléments au début de l'axe secondaire
  },
  column: {
    flexDirection: 'column', // Organise les éléments verticalement (colonnes)
    alignItems: 'flex-start', // Aligne les éléments au début de l'axe secondaire
    borderBottomWidth: 1,
    borderColor: 'black',
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
    borderRightWidth:0.5,
    borderBottomWidth:0.5,
    borderLeftWidth:0.5,
    borderColor: '#D0D3D4', 
    maxWidth:95,
    minWidth:95,
    maxHeight:55,
    minHeight:55
  },
  cell1: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0D3D4', 
    borderRightWidth:0.5,
    borderLeftWidth:0.5,
    borderTopWidth: 0.5,  // Bordure seulement en haut
    borderColor: 'black',
    maxWidth:95,
    minWidth:95,
    maxHeight:55,
    minHeight:55


},
// cell2: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopWidth: 0.5,  // Bordure seulement en haut
//     backgroundColor: '#D0D3D4', 
//     borderColor: 'black',
//     maxWidth:"50%",
//     minWidth:"50%",
//     maxHeight:55,
//     minHeight:55
// },
cell2:{
  flex: 1,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderTopWidth: 0.5,  // Bordure seulement en haut
  backgroundColor: '#FDC100', // Background color of the button
  borderColor: 'black',
    maxWidth:95,
    minWidth:95,
    maxHeight:55,
    minHeight:55
},
cell3: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,  // Bordure seulement en haut
    borderColor: '#D0D3D4',
    maxWidth:"50%",
    minWidth:"50%",
    maxHeight:55,
    minHeight:55
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