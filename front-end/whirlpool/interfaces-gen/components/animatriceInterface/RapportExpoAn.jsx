import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import port from '../port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

function RapportExpo() {
  const route = useRoute();
  const { ani, month, pdv } = route.params;
  const navigation = useNavigation();

  const [load, setLoad] = useState(false);
  const [categ, setCateg] = useState([]);
  const [references, setReferences] = useState([]);
  const [marques, setMarques] = useState([]);
  const [expo, setExpo] = useState([]);
  const [articles, setArticles] = useState([]);
  const [pdvs, setPdvs] = useState({});
  const [anim, setAnim] = useState([]);
  const [expolist, setExpolist] = useState([]);
  const [idWhirlpool, setIdwhirlpool] = useState(null);
  const WHIRLPOOL_LOGO = require('../../../assets/WHIRLPOOL_LOGO.png');

  const storeData = async (key, category) => {
    try {
      await AsyncStorage.setItem(key, category);
    } catch (e) {
      console.error(e);
    }
  };

  // Functions
  const getExpo = useCallback(async () => {
    try {
      const response = await axios.get("http://" + port + ":3000/api/expositions/expositions");
      setExpo(response.data);
    } catch (error) {
      console.error('Error fetching Expositions:', error);
    }
  }, []);

  const getAllArticle = useCallback(async () => {
    try {
      const response = await axios.get("http://" + port + ":3000/api/articles/articles");
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching Articles:', error);
    }
  }, []);

  const Fetchallcateg = useCallback(async () => {
    try {
      const response = await axios.get("http://" + port + ":3000/api/categories/categorie");
      setCateg(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const Fetchallref = useCallback(async () => {
    try {
      const response = await axios.get("http://" + port + ":3000/api/reference/references");
      setReferences(response.data);
    } catch (error) {
      console.error('Error fetching references:', error);
    }
  }, []);

  const Fetchallmarq = useCallback(async () => {
    try {
      const response = await axios.get("http://" + port + ":3000/api/marques/marques");
      setMarques(response.data);
    } catch (error) {
      console.error('Error fetching marques:', error);
    }
  }, []);

  const getpdvByID = useCallback(async (name) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/pdvs/getId/${name}`);
      setPdvs(response.data);
    } catch (error) {
      console.error('Error fetching PDVs:', error);
    }
  }, []);

  const FetchAnim = useCallback(async (idpdv) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/user/user/${idpdv}`);
      setAnim(response.data);
    } catch (error) {
      console.log('Error fetching animators:', error);
    }
  }, []);

  const findIdWhirlpool = useCallback(() => {
    const marqueselement = marques.find(el => el.marquename === 'whirlpool');
    if (marqueselement) {
      setIdwhirlpool(marqueselement.idMarque);
    }
  }, [marques]);

  const CountSameCateg2 = (id) => {
    const refByCateg = references.filter(el => el.Category_idCategory === id);
    const idArts = articles.filter(article =>
      refByCateg.some(ref => ref.idReference === article.Reference_idReference)
    );
    const someExpo = expo.filter(elem =>
      idArts.some(article => article.idArticle === elem.Article_idArticle) && pdvs.idPDV === elem.PDV_idPDV
    );
   return someExpo ;
  };

  const CountSameCateg = (id) => {
    const refByCateg = references.filter(el => el.Category_idCategory === id);
    const idArts = articles.filter(article =>
      refByCateg.some(ref => ref.idReference === article.Reference_idReference)
    );
    const someExpo = expo.filter(elem =>
      idArts.some(article => article.idArticle === elem.Article_idArticle) && pdvs.idPDV === elem.PDV_idPDV
    );
    return someExpo.length ;
  };

  const Findwhirlpool = (id) => {
    const refByCategMar = references.filter(el => el.Marque_idMarque === idWhirlpool && el.Category_idCategory === id);
    const idArts = articles.filter(article =>
      refByCategMar.some(ref => ref.idReference === article.Reference_idReference)
    );
    const someExpo = expo.filter(elem =>
      idArts.some(article => article.idArticle === elem.Article_idArticle) && pdvs.idPDV === elem.PDV_idPDV
    );
    return someExpo.length;
  };

  const CountTaux = (total, partie) => {
    const taux = (partie / total) * 100;
    return isNaN(taux) ? 0 : taux.toFixed(2);
  };

  const TotalExpoGlob = () => {
    return categ.reduce((total, el) => total + CountSameCateg(el.idCategory), 0);
  };

  const TotalExpoWhirl = () => {
    return categ.reduce((total, el) => total + Findwhirlpool(el.idCategory), 0);
  };

  const TotalTaux = () => {
    return categ.reduce((total, el) => total + CountTaux(CountSameCateg(el.idCategory), Findwhirlpool(el.idCategory)), 0);
  };

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
    XLSX.utils.book_append_sheet(wb, ws, "Rapport Expo", true);

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const uri = FileSystem.cacheDirectory + 'rapport_expo.xlsx';
    await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(uri);
  };

  useEffect(() => {
    const initializeData = async () => {
      await Fetchallcateg();
      await Fetchallref();
      await Fetchallmarq();
      await getExpo();
      await getAllArticle();
      await getpdvByID(pdv);
    };

    initializeData().then(() => {
      findIdWhirlpool();
      if (pdvs.idPDV) {
        FetchAnim(pdvs.idPDV);
      }
    });
  }, [pdvs.idPDV, pdv, Fetchallcateg, Fetchallref, Fetchallmarq, getExpo, getAllArticle, getpdvByID, findIdWhirlpool]);

  return (
    <NativeBaseProvider>
      <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />

      <View style={styles.view1}>
        <Header />
        <ScrollView style={{ marginTop: -50 }}>
          <View>
            <View>
              <Text style={styles.textexpo}>Date :{month}</Text>
              <Text style={styles.textexpo}>Zone :{pdvs.location}</Text>
              <Text style={styles.textexpo}>Magasin :{pdv}</Text>
              <Text style={styles.textexpo}>Animatrice : {anim.length > 0 ? anim[0].name : "Loading..."}</Text>
            </View>
            <View style={styles.container2}>
              {/* Première colonne */}
              <View style={styles.column}>
                <View style={styles.cell}><Text>Famille de produit</Text></View >
                {categ.map(el => (
                  <View style={styles.cell1} key={el.idCategory}>
                    <Text>{el.Categoryname}</Text>
                  </View>
                ))}
                <View style={styles.cell}><Text>Total</Text></View>
              </View>

              {/* Deuxième colonne */}
              <View style={styles.column}>
                <View style={styles.cell}><Text>Expo Globale</Text></View>
                {categ.map(el => (
                  <TouchableOpacity key={el.idCategory} onPress={() => {
                    const sameExpoData = CountSameCateg2(el.idCategory);
                    navigation.navigate('RapportExpoDetAn', { ani,sameExpoData }); storeData('category', el.Categoryname); }}>
                    <View style={styles.cell2}>
                      <Text style={styles.textcell2}>{CountSameCateg(el.idCategory)}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
                <View style={styles.cell}><Text>{TotalExpoGlob()}</Text></View>
              </View>

              {/* Troisième colonne */}
              <View style={styles.column}>
                <View style={styles.cell}><Text>Expo Whirlpool</Text></View>
                {categ.map(el => (
                  <View style={styles.cell1} key={el.idCategory}>
                    <Text>{Findwhirlpool(el.idCategory)}</Text>
                  </View>
                ))}
                <View style={styles.cell}><Text>{TotalExpoWhirl()}</Text></View>
              </View>

              {/* Quatrième colonne */}
              <View style={styles.column}>
                <View style={styles.cell}><Text>Taux D'exposition</Text></View>
                {categ.map(el => (
                  <View style={styles.cell1} key={el.idCategory}>
                    <Text>{CountTaux(CountSameCateg(el.idCategory), Findwhirlpool(el.idCategory))}%</Text>
                  </View>
                ))}
                <View style={styles.cell}><Text>{TotalTaux()}%</Text></View>
              </View>
            </View>
            <Center>
              {/* <TouchableOpacity onPress={exportToExcel} style={styles.btns}>
                <Text style={styles.btnText}>Exporter</Text>
              </TouchableOpacity> */}
            </Center>
          </View>
        </ScrollView>
      </View>

      <Footer ani={ani} />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  image12: {
    width: 125,
    height: 95,
    position: "absolute",
    top: 0,
    left: 15,
  },
  textexpo: {
    fontSize: 15,
    fontWeight: '500',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    borderTopWidth: 0.5,
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
    borderTopWidth: 0.5,
    backgroundColor: '#FDC100',
    borderColor: 'black',
    maxWidth: 95,
    minWidth: 95,
    maxHeight: 55,
    minHeight: 55
  },
  textcell2: {
    color: 'white',
  },
  btns: {
    backgroundColor: '#FDC100',
    padding: 10,
    borderRadius: 5,
    width: 150,
    marginTop: "5%",
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center"
  },
});

export default RapportExpo;
