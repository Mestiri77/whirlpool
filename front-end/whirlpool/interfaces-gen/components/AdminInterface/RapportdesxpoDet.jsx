import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { NativeBaseProvider } from "native-base";
import Header from './header';
import Footer from './footer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RapportExpodet() {
  const port = '192.168.248.6';
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);
  const [categ, setCateg] = useState('');
  const [marque,setMarque]=useState({})
  const [ref,setRef]=useState({})

  const fetchArticleByCategory = async (categ) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/articles/artCat/${categ}`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  const fetchMarque = async (id) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/marques//marques/${id}`);
      setMarque(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  const fetchRef = async (id) => {
    try {
      const response = await axios.get(`http://${port}::3000/api/reference/references/${id}`);
      setRef(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
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

  useEffect(() => {
    getData('category');
    fetchRef(articles.Reference_idReference)
    fetchMarque(ref.Marque_idMarque)
  }, []);

  useEffect(() => {
    if (categ) {
      fetchArticleByCategory(categ);
    }
  }, [categ]);

  return (
    <NativeBaseProvider>
      <View style={styles.view1}>
        <Header />
        <ScrollView style={{ marginTop: -350 }}>
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
              {articles.map((article, index) => (
                <View style={styles.row} key={index}>
                  <View style={styles.cell1}><Text>{marque.marquename}</Text></View>
                  <View style={styles.cell1}><Text>{ref.Referencename}</Text></View>
                  <View style={styles.cell1}><Text>{articles.prix}</Text></View>
                  <TouchableOpacity onPress={() => navigation.navigate('Modifpopup', { article })}>
                    <View style={styles.cell2}><Text style={styles.textcell2}>Modifier</Text></View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
    marginTop: "5%",
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center",
  },
});

export default RapportExpodet;
