import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { NativeBaseProvider, Modal } from "native-base";
import Header from './header';
import Footer from './footer';
import Modifpopup from './ModifRapExpo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import port from "../port";
import { useRoute } from '@react-navigation/native';

function RapportExpodet() {
  const navigation = useNavigation();
  const route = useRoute();
  const { adm,sameExpoData} = route.params;
  const [articles, setArticles] = useState([]);
  const [categ, setCateg] = useState('');
  const [marques, setMarques] = useState({});
  const [refs, setRefs] = useState({});
  const [showpopup, setShowpop] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [dataChanged, setDataChanged] = useState(false);
  const [sortedArticles, setSortedArticles] = useState([]);
  const sortArticlesByPrice = () => {
    const sorted = [...articles].sort((a, b) => b.prix - a.prix);
    setSortedArticles(sorted);
  };
  const WHIRLPOOL_LOGO = require('../../../assets/WHIRLPOOL_LOGO.png');
  const fetchArticleByCategory = async (categ) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/articles/artCat/${categ}`);
  
      // Filtrer les articles qui ont le même idArticle dans sameExpoData
      const filteredArticles = response.data.filter(article => {
        return sameExpoData.some(item => item.Article_idArticle === article.idArticle);
      });
  
      console.log(filteredArticles); // Vérifiez la sortie dans la console pour vous assurer que les données sont correctes
  
      setArticles(filteredArticles); // Mettez à jour l'état des articles avec les données filtrées
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  
  const fetchRef = async (id) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/reference/references/${id}`);
      setRefs(prevRefs => ({ ...prevRefs, [id]: response.data }));
      return response.data;
    } catch (error) {
      console.error('Error fetching reference:', error);
    }
  };

  const fetchMarque = async (id) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/marques/marques/${id}`);
      setMarques(prevMarques => ({ ...prevMarques, [id]: response.data }));
    } catch (error) {
      console.error('Error fetching marque:', error);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setCateg(value);
      }
    } catch (e) {
      console.error('Error reading value from AsyncStorage:', e);
    }
  };

  const exportToExcel = async () => {
    const data = [
      ["Marques", "Référence", "Prix"],
      ...articles.map(article => [
        marques[refs[article.Reference_idReference]?.Marque_idMarque]?.marquename || '',
        refs[article.Reference_idReference]?.Referencename || '',
        article.prix
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapport Expo");

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const uri = FileSystem.cacheDirectory + 'rapport_expo.xlsx';
    await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(uri);
  };

  useEffect(() => {
    getData('category');
  }, []);

  useEffect(() => {
    if (categ) {
      fetchArticleByCategory(categ);
    }
  }, [categ, dataChanged]);
  useEffect(() => {
    sortArticlesByPrice();
  }, [articles, dataChanged]);
  useEffect(() => {
    articles.forEach(async article => {
      const refData = await fetchRef(article.Reference_idReference);
      if (refData) {
        fetchMarque(refData.Marque_idMarque);
      }
    });
  }, [articles,dataChanged]);

  const handleModifyClick = (article) => {
    const refData = refs[article.Reference_idReference];
    const marqueData = marques[refData?.Marque_idMarque];
    const price = article.idArticle;
    setPopupData({ article, refData, marqueData, price, setDataChanged,dataChanged });
    setShowpop(true);
  };

  const handleDataChange = () => {
    setDataChanged(!dataChanged);
  };

  return (
    <NativeBaseProvider>
      <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />
      <View style={styles.view1}>
        <Header />
        <ScrollView style={{ marginTop: -150 }}>
          <View>
            <View>
              <Text style={styles.textexpo}>{categ}</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.cell}><Text>Marques</Text></View>
                <View style={styles.cell}><Text>Référence</Text></View>
                <View style={styles.cell}><Text>Prix</Text></View>
                <View style={styles.cell}><Text>Action</Text></View>
              </View>
              {sortedArticles.map((article, index) => (
                <View style={styles.row} key={index}>
                  <View style={styles.cell1}><Text>{marques[refs[article.Reference_idReference]?.Marque_idMarque]?.marquename || ''}</Text></View>
                  <View style={styles.cell1}><Text>{refs[article.Reference_idReference]?.Referencename || ''}</Text></View>
                  <View style={styles.cell1}><Text>{article.prix}</Text></View>
                  <TouchableOpacity onPress={() => handleModifyClick(article)}>
                    <View style={styles.cell2}><Text style={styles.textcell2}>Modifier</Text></View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={exportToExcel} style={styles.btns}>
          <Text style={styles.btnText}>Exporter</Text>
        </TouchableOpacity>
      </View>
      <Modal isOpen={showpopup} onClose={() => setShowpop(false)}>
        <Modifpopup {...popupData} onClose={() => setShowpop(false)} onDataChange={handleDataChange} />
      </Modal>
      <Footer adm={adm} />
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#D0D3D4',
    marginTop: 5,
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
    backgroundColor: '#D0D3D4',
    borderWidth: 0.5,
    borderColor: '#D0D3D4',
  },
  image12: {
    width: 125,
    height: 95,
    position: "absolute",
    top: 0,
    left: 15,
  },
  cell2: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDC100',
    borderWidth: 0.5,
    borderColor: '#D0D3D4',
  },
  textcell2: {
    color: 'white',
  },
  btns: {
    backgroundColor: '#FDC100',
    padding: 10,
    borderRadius: 5,
    width: 150,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center",
  },
});

export default RapportExpodet;
