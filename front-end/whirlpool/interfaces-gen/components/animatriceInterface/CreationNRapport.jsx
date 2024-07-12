import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity,Modal,ActivityIndicator } from "react-native";
import { CheckIcon, Select, Box, Icon, Center, NativeBaseProvider, ScrollView,Input  } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import port from '../port';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

import { useRoute } from '@react-navigation/native';

const downicon = require('../../../assets/icons8-down-50.png');
const WHIRLPOOL_LOGO = require('../../../assets/WHIRLPOOL_LOGO.png');

function CreationNRapport() {
  console.disableYellowBox = true; // Pour masquer tous les avertissements jaunes

  const route = useRoute();
  const { ani } = route.params;
  const [city,setCity]= React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const [load, setLoad] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modif, setModif]= React.useState(false)

  const [categ, setCateg] = React.useState("");
  const [selctrefname,setSelectrefname]=React.useState("");

  const [idref,setIdref] = React.useState(null);

  const [references, setReferences] = React.useState([]);
  const [sellouts, setSellouts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [pdv, setPdv] = React.useState([]);
  const [refsbyid,setRefsbyid]= React.useState([]);

  const [totals, setTotals] = React.useState({});
  const [colors, setColors] = React.useState({});
  const [capacite, setCapacite] = React.useState({});
  const [typeC, setTypeC] = React.useState({});
  const [prix, setPrix] = React.useState({});
  const [nbrv,setNbrv] = React.useState({});
  const [datev,setDatev] = React.useState({});

console.log(datev);

  const tdc = ["L", "kg", "ft³", "W", "BTU", "bar"];
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const currentMonthName = monthNames[new Date().getMonth()];

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };
  ///////////////////////////Function///////////////////////

  const getAllSellout = async () => {
    try {
      const response = await axios.get(`http://${port}:3000/api/sellout/sellouts`);
      setSellouts(response.data);
    } catch (error) {
      console.error('Error fetching sellouts:', error);
    }
  };

  const getRefSellByidRef = async (id) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/refsel/RefSels/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching refsell:', error);
    }
  };
  const getSelloutByid=async(id)=>{
    try {
      const response = await axios.get(`http://${port}:3000/api/sellout/sellouts/${id}`)
      return response.data
    }
    catch (error) {
      console.error('Error fetching article:', error);
    }
  }
  const getArticlebyid=async(id)=>{
    try {
      const response = await axios.get(`http://${port}:3000/api/articles/articles/${id}`)
      console.log(response.data.coloeur);
      return response.data
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  }
  const getRefSellByidRef2 = async (id) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/refsel/RefSels/${id}`);
      setRefsbyid(response.data)
      console.log(response.data,"herre");

      // Récupération des couleurs pour chaque article
    let tempColors = {};
    for (let ref of response.data) {
      let articleData = await getArticlebyid(ref.Article_idArticle);
      if (articleData) {
        tempColors[ref.Article_idArticle] = articleData.coloeur;
      }
    }
       // Récupération des capacite pour chaque article
       let tempCapacite = {};
       for (let ref of response.data) {
         let articleData = await getArticlebyid(ref.Article_idArticle);
         if (articleData) {
          tempCapacite[ref.Article_idArticle] = articleData.capacite;
         }
       }
       // Récupération des capacite pour chaque article
       let tempTypeC = {};
       for (let ref of response.data) {
         let articleData = await getArticlebyid(ref.Article_idArticle);
         if (articleData) {
          tempTypeC[ref.Article_idArticle] = articleData.typeC;
         }
       }
      // Récupération des capacite pour chaque article
      let tempPrix = {};
      for (let ref of response.data) {
        let articleData = await getArticlebyid(ref.Article_idArticle);
        if (articleData) {
          tempPrix[ref.Article_idArticle] = articleData.prix;
        }
      }
      // Récupération des Nbrv pour chaque article
      let tempNbrv = {};
      for (let ref of response.data) {
        let articleData = await getSelloutByid(ref.Sellout_idSellout);
        if (articleData) {
          tempNbrv[ref.Sellout_idSellout] = articleData.nbrV
        }
      }
        // Récupération des date pour chaque article vendue
      let tempDate = {};
      for (let ref of response.data) {
        let articleData = await getSelloutByid(ref.Sellout_idSellout);
        if (articleData) {
          tempDate[ref.Sellout_idSellout] = articleData.updatedAt
        }
      }
      setDatev(tempDate)
      setNbrv(tempNbrv)
      setPrix(tempPrix)
      setCapacite(tempCapacite)
      setTypeC(tempTypeC)
      setColors(tempColors);

    } catch (error) {
      console.error('Error fetching refsell:', error);
    }
  };
  const fetchRefByCatg = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`http://${port}:3000/api/reference/referencebycateg/${id}`);
      setReferences(response.data);
      calculateTotals(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching references:', error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(`http://${port}:3000/api/categories/categorie`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const getnamePdv =async ()=>{
    try {
      const response = await axios.get("http://"+port+":3000/api/pdvs/pdvs/"+ani.PDV_idPDV)
      setPdv(response.data)
    }
    catch (error) {
      console.error('Error fetching PDV:', error);
    }
  }

  const calculateTotals = async (references) => {
    let tempTotals = {};
    const currentMonth = new Date().getMonth(); // get current month (0-11)
    const currentYear = new Date().getFullYear(); // get current year
  
    for (let ref of references) {
      let refSells = await getRefSellByidRef(ref.idReference);
      let total = 0;
      console.log(refSells);
      for (let refSell of refSells) {
        let sellout = sellouts.find(sell => sell.idSellout === refSell.Sellout_idSellout);
        if (sellout) {
          let selloutDate = new Date(sellout.updatedAt);
          if (selloutDate.getMonth() === currentMonth && selloutDate.getFullYear() === currentYear) {
            total += sellout.nbrV;
          }
        }
      }
      tempTotals[ref.idReference] = total;
    }
  
    setTotals(tempTotals);
  };

  React.useEffect(() => {
    fetchAllCategories();
    getAllSellout();
    getnamePdv();
  }, []);

  React.useEffect(() => {
    const fetchReferencesForCategory = async () => {
      const categoryId = findId(categories, categ, 'Categoryname', 'idCategory');
      fetchRefByCatg(categoryId);
    };
    if (categ) {
      fetchReferencesForCategory();
    }
  }, [load, categ]);

  ///////////////////////////Function///////////////////////

  const findId = (data, name, dataname, idname) => {
    const element = data.find(el => el[dataname] === name);
    if (element) {
      return element[idname];
    }
    return null;
  };

  const ExampleInput = ({text}) => {
    return<Box alignItems="center">
        <Input mx="3" placeholder={text} w="100%" />
      </Box>; 
       };

  const Example = ({ text }) => {
    if (text === 'Categories') {
      return (
        <Center>
          <Box maxW="400" mt={3}>
            <Select selectedValue={categ} minWidth="320" accessibilityLabel={text} placeholder={text} _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
              InputLeftElement={
                <Icon as={<MaterialIcons name="category" />} size={5} ml="2" color="muted.400" />
              } mt={1} onValueChange={itemValue => setCateg(itemValue)}>
              {categories.map(el => (
                <Select.Item label={el.Categoryname} value={el.Categoryname} key={el.idCategory} />
              ))}
            </Select>
          </Box>
        </Center>
      );
    }
  };

  const handlebtnRef=(id,name)=>{
    setSelectrefname(name)
    setIdref(id)
    setModalVisible(true)
    getRefSellByidRef2(id)
  }

  const Tableaux = () => {
    return (
      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <View style={styles.container2}>
          <View style={styles.row2}>
            <View style={styles.cell}><Text>Reference</Text></View>
            <View style={styles.cell3}><Text>Total Ventes</Text></View>
          </View>
          {isLoading ? (
  <ActivityIndicator size="large" color="#FDC100" style={{ marginTop: 20 }} />
) : (

          references.map(el => (
            <View style={styles.row2} key={el.idReference}>
              <View style={styles.cell1}>
                <TouchableOpacity onPress={()=>{handlebtnRef(el.idReference,el.Referencename)}}>
                <Text style={{ color: "white" }}>{el.Referencename}</Text>
                </TouchableOpacity>
                </View>
              <View style={styles.cell2}><Text>{totals[el.idReference] || 0}</Text></View>
            </View>
          )))}
        </View>
      </View>
    );
  };

  const Popup = ()=>{
    return (
      <View style={styles.container21}>
        
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalBackground}>
          {
            <View style={styles.modalContainer}>
              <ScrollView>
              <Text style={styles.text2}>Reference : {selctrefname}</Text>
              {refsbyid.map(el=>(
              <React.Fragment key={el.Article_idArticle}>
              <Text style={styles.text2}>Couleur : {colors[el.Article_idArticle]}</Text>
              <Text style={styles.text2}>Capacite : {capacite[el.Article_idArticle]}</Text>
              <Text style={styles.text2}>Type De Capacite : {typeC[el.Article_idArticle]}</Text>
              <Text style={styles.text2}>Prix : {prix[el.Article_idArticle]}</Text>
              <Text style={styles.text2}>Nombre De Ventes : {nbrv[el.Sellout_idSellout]}</Text>
              {datev && datev[el.Sellout_idSellout] && (
                    <Text style={styles.text2}>Date de Vente : {datev[el.Sellout_idSellout].split('T')[0]}</Text>
                  )}
              <View style={styles.separator} />
            </React.Fragment>
              ))}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btn2}>
                  <Text style={styles.btnText2}>Fermer</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          }
          
        </View>
      </Modal>
    </View>
    )
  }

  return (
    <NativeBaseProvider>
      <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />

      <Header onCityChange={handleCityChange}/>
      <View style={styles.container}>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.textexpo}>Magasin : {pdv.pdvname} </Text>
          <Text style={styles.textexpo}>Mois : {currentMonthName} </Text>
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          <Example text={'Categories'} />
          {Tableaux()}
        </ScrollView>
      </View>
      {Popup()}
      <Footer ani={ani} />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 80,
    marginTop:-480
  },
  textexpo: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom:4
  },
  image12: {
    width: 125,
    height: 95,
    position: "absolute",
    top: 0,
    left: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  leftimage: {
    width: 30,
    height: 30,
  },
  doubleInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  container2: {
    flexDirection: 'column',
  },
  row2: {
    flexDirection: 'row',
    marginBottom:9
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: '#D0D3D4',
    marginBottom:10,
    maxWidth: 200,
    minWidth: 200
  },
  cell1: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDC100',
    
    maxWidth: 200,
    minWidth: 200,
  },
  cell2: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0D3D4',
    maxWidth: "30%",
    minWidth: "30%",
    marginLeft:30

  },
  cell3: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: "30%",
    minWidth: "30%",
    marginLeft:30,
    backgroundColor: '#D0D3D4',
    marginBottom:10
  },
  container21: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    height:300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,

  },
  text2: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#FDC100',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom:15
  },  
  btn2: {
    backgroundColor: '#D0D3D4',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop:5
  },
  btnText2: {
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default CreationNRapport;