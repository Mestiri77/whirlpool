import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { CheckIcon, Select, Box, Icon, Center, NativeBaseProvider, ScrollView } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import port from '../port';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

import { useRoute } from '@react-navigation/native';

const downicon = require('../../../assets/icons8-down-50.png');
const WHIRLPOOL_LOGO = require('../../../assets/WHIRLPOOL_LOGO.png');

function CreationNRapport() {

  const route = useRoute();
  const { ani } = route.params;

  const [load, setLoad] = React.useState(false);

  const [marque, setMarque] = React.useState("");
  const [categ, setCateg] = React.useState("");
  const [Ref, setRef] = React.useState("");
  const [prix, setPrix] = React.useState("");
  const [capacite, setCapacite] = React.useState("");
  const [unite, setUnite] = React.useState("");
  const [couleur, setCouleur] = React.useState("");

  const [idref, setIdref] = React.useState(null);
  const [idmarque, setIdmarque] = React.useState(null);
  const [idcateg, setIdcateg] = React.useState(null);

  const [references, setReferences] = React.useState([]);
  const [sellouts, setSellouts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [totals, setTotals] = React.useState({});

  const tdc = ["L", "kg", "ft³", "W", "BTU", "bar"];

  const dataArticle = {
    coloeur: couleur,
    typeC: unite,
    capacite: capacite,
    Reference_idReference: idref,
    prix: prix
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

  const fetchRefByCatg = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`http://${port}:3000/api/reference/referencebycateg/${id}`);
      setReferences(response.data);
      calculateTotals(response.data);
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

  const calculateTotals = async (references) => {
    let tempTotals = {};
    for (let ref of references) {
      let refSells = await getRefSellByidRef(ref.idReference);
      let total = 0;
      for (let refSell of refSells) {
        let sellout = sellouts.find(sell => sell.idSellout === refSell.Sellout_idSellout);
        if (sellout) {
          total += sellout.nbrV;
        }
      }
      tempTotals[ref.idReference] = total;
    }
    setTotals(tempTotals);
  };

  React.useEffect(() => {
    fetchAllCategories();
    getAllSellout();
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

  const Tableaux = () => {
    return (
      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <View style={styles.container2}>
          <View style={styles.row2}>
            <View style={styles.cell}><Text>Reference</Text></View>
            <View style={styles.cell3}><Text>Total Ventes</Text></View>
          </View>
          {references.map(el => (
            <View style={styles.row2} key={el.idReference}>
              <View style={styles.cell1}><Text style={{ color: "white" }}>{el.Referencename}</Text></View>
              <View style={styles.cell2}><Text>{totals[el.idReference] || 0}</Text></View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />

      <Header />
      <View style={styles.container}>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.textexpo}>Date :</Text>
          <Text style={styles.textexpo}>Magasin :</Text>
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          <Example text={'Categories'} />
          {Tableaux()}
        </ScrollView>
        <Center>
          <TouchableOpacity onPress={() => { }} style={styles.btns}>
            <Text style={styles.btnText}>Valider</Text>
          </TouchableOpacity>
        </Center>
      </View>
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
});

export default CreationNRapport;