import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, PermissionsAndroid, ScrollView, TouchableOpacity, Platform, Alert } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Header from './header'
import Footer from './footer'
import axios from 'axios'
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';

function RapportExpo() {
  const navigation = useNavigation();

  const [load, setLoad] = React.useState(false)
  const [categ, setCateg] = React.useState([])
  const [references, setReferences] = React.useState([])
  const [marques, setMarques] = React.useState([])
  const [pdv, setPdv] = React.useState([])
  const [idWhirlpool, setIdwhirlpool] = React.useState(null)
  const port = '192.168.1.26'

  //////////////////Functions///////////////////////////
  const Fetchallcateg = async () => {
    try {
      const response = await axios.get("http://" + port + ":3000/api/categories/categories")
      console.log(response.data);
      setCateg(response.data)
    }
    catch (error) {
      console.error('Error fetching :', error)
    }
  }

  const Fetchallref = async (categname) => {
    try {
      const response = await axios.get("http://" + port + ":3000/api/reference/references")
      setReferences(response.data)
    } catch (error) {
      console.error('Error fetching :', error)
    }
  }
  const Fetchallmarq = async () => {
    try {
      const response = await axios.get("http://" + port + ":3000/api/marques/marques")
      setMarques(response.data)
    } catch (error) {
      console.error('Error fetching :', error)
    }
  }
  const getpdvByID = async (id) => {
    try {
      let response = await axios.get("http://" + port + ":3000/api/pdvs/pdvs/" + id)
      setPdv(response.data)
      setLoad(!load)
    }
    catch (error) {
      console.error('Error fetching PDVs:', error)
    }
  }

  const findIdWhirlpool = () => {
    const marqueselement = marques.find(el => el.marquename === 'whirlpool');
    if (marqueselement) {
      setIdwhirlpool(marqueselement.idMarque);
    }
  }

  const CountSameCateg = (id) => {
    let count = 0
    references.forEach(el => {
      if (el.Category_idCategory == id) {
        count++
      }
    })
    return count
  }

  const Findwhirlpool = (id) => {
    let whirlpool = 0
    references.forEach(el => {
      if (el.Marque_idMarque == idWhirlpool && el.Category_idCategory == id) {
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

  const TotalExpoGlob = () => {
    let total = 0
    { categ.map(el => (
      total += CountSameCateg(el.idCategory)
    )) }
    return total
  }

  const TotalExpoWhirl = () => {
    let total = 0
    { categ.map(el => (
      total += Findwhirlpool(el.idCategory)
    )) }
    return total
  }

  const TotalTaux = () => {
    let total = 0
    { categ && categ.map(el => (
      total += CountTaux(CountSameCateg(el.idCategory), Findwhirlpool(el.idCategory))
    )) }
    return total
  }

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const exportToExcel = async () => {
    const isPermissionGranted = await requestExternalWritePermission();
    if (!isPermissionGranted) {
      Alert.alert('Permission Denied', 'Cannot access storage to save file');
      return;
    }

    const data = categ.map(el => ({
      'Famille de produit': el.Categoryname,
      'Expo Globale': CountSameCateg(el.idCategory),
      'Expo Whirlpool': Findwhirlpool(el.idCategory),
      "Taux D'exposition": `${CountTaux(CountSameCateg(el.idCategory), Findwhirlpool(el.idCategory))}%`
    }));

    data.push({
      'Famille de produit': 'Total',
      'Expo Globale': TotalExpoGlob(),
      'Expo Whirlpool': TotalExpoWhirl(),
      "Taux D'exposition": `${TotalTaux()}%`
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapport Expo");

    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    const path = `${RNFS.DownloadDirectoryPath}/RapportExpo.xlsx`;

    await RNFS.writeFile(path, wbout, 'ascii')
      .then(() => {
        Alert.alert('Success', 'File has been saved to your downloads folder!');
      })
      .catch(error => {
        console.error('Error writing file:', error);
        Alert.alert('Error', 'Could not save the file');
      });
  };

  React.useEffect(() => {
    Fetchallcateg()
    Fetchallref()
    Fetchallmarq()
    findIdWhirlpool()
  }, [load])

  return (
    <NativeBaseProvider>
      <View style={styles.view1}>
        <Header />
        <ScrollView style={{ marginTop: -250 }}>
          <View>
            <View>
              <Text style={styles.textexpo}>Date :</Text>
              <Text style={styles.textexpo}>Zone :</Text>
              <Text style={styles.textexpo}>Magasin :</Text>
              <Text style={styles.textexpo}>Animatrice :</Text>
            </View>
            <View style={styles.container2}>
              {/* Première colonne */}
              <View style={styles.column}>
                <View style={styles.cell}><Text>Famille de produit</Text></View >
                {categ && categ.map(el => (
                  <View style={styles.cell1} key={el.idCategory}>
                    <Text>{el.Categoryname}</Text>
                  </View >
                ))}
                <View style={styles.cell}><Text>Total</Text></View>
              </View>

              {/* Deuxième colonne */}
              <View style={styles.column}>
                <View style={styles.cell}><Text>Expo Globale</Text></View>
                {categ && categ.map(el => (
                  <TouchableOpacity key={el.idCategory} onPress={() => navigation.navigate('RapportExpoDet', { propKey: 'propValue' })}>
                    <View style={styles.cell2}>
                      <Text style={styles.textcell2}>{CountSameCateg(el.idCategory)}</Text>
                    </View >
                  </TouchableOpacity>
                ))}
                <View style={styles.cell}><Text>{TotalExpoGlob()}</Text></View>
              </View>

              {/* Troisième colonne */}
              <View style={styles.column}>
                <View style={styles.cell}><Text>Expo Whirlpool</Text></View>
                {categ && categ.map(el => (
                  <View style={styles.cell1} key={el.idCategory}>
                    <Text>{Findwhirlpool(el.idCategory)}</Text>
                  </View >
                ))}
                <View style={styles.cell}><Text>{TotalExpoWhirl()}</Text></View>
              </View>

              {/* Quatrième colonne */}
              <View style={styles.column}>
                <View style={styles.cell}><Text>Taux D'exposition</Text></View>
                {categ && categ.map(el => (
                  <View style={styles.cell1} key={el.idCategory}>
                    <Text>{CountTaux(CountSameCateg(el.idCategory), Findwhirlpool(el.idCategory))}%</Text>
                  </View >
                ))}
                <View style={styles.cell}><Text>{TotalTaux()}%</Text></View>
              </View>
            </View>
            <Center>
              <TouchableOpacity onPress={exportToExcel} style={styles.btns}>
                <Text style={styles.btnText}>Exporter</Text>
              </TouchableOpacity>
            </Center>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  textexpo: {
    fontSize: 15,
    fontWeight: '500',
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
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: '#D0D3D4',
    maxWidth: 95,
    minWidth: 95,
    maxHeight: 55,
    minHeight: 55
  },
  cell1: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0D3D4',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,  // Bordure seulement en haut
    borderColor: 'black',
    maxWidth: 95,
    minWidth: 95,
    maxHeight: 55,
    minHeight: 55
  },
  cell2: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,  // Bordure seulement en haut
    backgroundColor: '#FDC100', // Background color of the button
    borderColor: 'black',
    maxWidth: 95,
    minWidth: 95,
    maxHeight: 55,
    minHeight: 55
  },
  textcell2: {
    color: 'white', // Text color
  },
  btns: {
    backgroundColor: '#FDC100', // Background color of the button
    padding: 10,
    borderRadius: 5,
    width: 150,
    marginTop: "5%",
    alignItems: 'center',
  },
  btnText: {
    color: 'white', // Text color
    fontSize: 16,
    textAlign: "center"
  },
});

export default RapportExpo;
