import React, { useState } from "react";
import { View, Text,Image, StyleSheet,Button, PermissionsAndroid, ScrollView, LogBox,TouchableOpacity,ActivityIndicator  } from "react-native";
import { NativeBaseProvider, Center,Box,Select,CheckIcon,Stack,Input,Icon} from "native-base";
import Header from './header'
import Footer from './footer'
import port from '../port'
import axios from 'axios'
import { useNavigation,useRoute } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";


function RapportPriceMap(){
  const route = useRoute();
  const { adm,month, pdv } = route.params;

  const [loading, setLoading] = useState(true);

  const [pdvs,setPdvs]=React.useState([])
  const [categ,setCateg]=React.useState([])

  const [date, setDate] = useState('');
  // const [pdv,setPdv]=React.useState('')
  const [pdvsel,setPdvsel]=React.useState('')
  const [popupVisible, setPopupVisible] = useState(false);
  const WHIRLPOOL_LOGO=require('../../../assets/WHIRLPOOL_LOGO.png')



///////////////////////////////Functions//////////////////////////////

const getAllPdvs = async () => {
  try {
    let response = await axios.get("http://" + port + ":3000/api/pdvs/pdvs");
    setPdvs(response.data);
  } catch (error) {
    console.error('Error fetching PDVs:', error);
  }
};

const Fetchallcateg = async () => {
  try {
    const response = await axios.get("http://" + port + ":3000/api/categories/categorie");
    console.log(response.data);
    setCateg(response.data);
  } catch (error) {
    console.error('Error fetching:', error);
  }
};

React.useEffect(() => {
  const fetchData = async () => {
    await getAllPdvs();
    await Fetchallcateg();
    setLoading(false); // Mettre à jour l'état de chargement ici
  };

  fetchData();
}, []);

/////////////////////////////////////////////////////////////////////


   
const RenderInput=(text)=>{
  if(text=='Date :'){
    return(
      <Stack space={4} w="100%" alignItems="center" mt="5%">
      <Input 
        w={{
          base: "75%",
          md: "25%"
        }} 
        InputLeftElement={
          <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
        } 
        placeholder={text}
             />
     
    </Stack>
    )
  }
  return(
    <Stack space={4} w="100%" alignItems="center" mt="5%">
    <Input 
      w={{
        base: "75%",
        md: "25%"
      }} 
      InputLeftElement={
        <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
      } 
      placeholder={text}
           />
   
  </Stack>
  )
}

    const navigation = useNavigation();

    const Example = ({text}) => {

          return (
            <Center>
            <Box maxW="400">
              <Select
                selectedValue={pdvsel}
                minWidth="100%"
                
                accessibilityLabel="Choose Service"
                placeholder={text}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setPdvsel(itemValue)}
           
              >
                {pdvs.map(el=>(
                <Select.Item label={el.pdvname} value={el.pdvname} />
                ))}
                
              </Select>
            </Box>
          </Center>
          )
        }

        return (
          <NativeBaseProvider>
            <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />
            <View style={styles.view1}>
              <Header />
              {loading ? (
                <Center flex={1}>
                  <ActivityIndicator size="large" color="#FDC100" />
                </Center>
              ) : (
                <Center flex={8}>
                  <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 30 }}>Rapports Price Map :</Text>
                  <View style={styles.View2}>
                    <Text style={{ fontSize: 18, fontWeight: 300 }}>Date : {month}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 300 }}>Point De Vente : {pdv}</Text>
                  </View>
                  <View style={styles.categtext}>
                    <Text style={{ fontSize: 18, fontWeight: 300 }}>Categories</Text>
                  </View>
                  <ScrollView style={styles.viewbtns}>
                    <View>
                      {categ.map(el => (
                        <TouchableOpacity
                          style={styles.btns}
                          key={el.idCategory}
                          onPress={() => {
                            navigation.navigate('RapportPriceMapDet', { categoryId: el.idCategory, adm });
                          }}
                        >
                          <Text style={styles.btnText}>{el.Categoryname}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </Center>
              )}
            </View>
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
         View2:{
          marginLeft:-200
         },
         image12: {
          width: 125,
          height: 95,
          position: "absolute",
          top: 0,
          left: 15,
        },
      categtext:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#D0D3D4',
        padding:10,
        borderRadius:5,
        marginTop:15
      },
      viewbtns:{
        width:"100%",
      },
      btns: {
        backgroundColor: '#FDC100',
        padding: 10,
        borderRadius: 5,
        width: "100%", // Utiliser toute la largeur disponible
        marginTop: 10, // Ajouter un espace en haut
        alignSelf: 'center', 
      },
      
      btnText: {
        color: 'white', // Text color
        fontSize: 16,
        textAlign:"center"
      },
})
export default RapportPriceMap;