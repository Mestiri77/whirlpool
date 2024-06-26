import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { CheckIcon,Input, Select, Box,Icon, Center, NativeBaseProvider, ScrollView } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import port from '../port'
import axios from 'axios';
import Header from './header';
import Footer from './footer';

import { useNavigation,useRoute } from '@react-navigation/native';

const downicon = require('../../../assets/icons8-down-50.png');
const WHIRLPOOL_LOGO=require('../../../assets/WHIRLPOOL_LOGO.png')

function CreationNRapport() {

  const route = useRoute();
  const { ani } = route.params;

  const [load,setLoad]=React.useState(false)

  const [marque,setMarque]  = React.useState("");
  const [categ,setCateg]= React.useState("");
  const [Ref, setRef] = React.useState("");
  const [prix,setPrix] = React.useState("");
  const [capacite,setCapacite]= React.useState("");
  const [unite,setUnite]= React.useState("");
  const [couleur,setCouleur] = React.useState("");

  const [idref,setIdref]=React.useState(null)
  const [idmarque,setIdmarque]=React.useState(null)
  const [idcateg,setIdcateg]=React.useState(null)

  const [references,setReferences]=React.useState([])
  const [marques,setMarques]=React.useState([])
  const [Categories,setCategories]=React.useState([])
  const tdc=["L", "kg", "ft³", "W", "BTU", "bar"]


  const dataArticle={
    coloeur:couleur,
    typeC:unite,
    capacite:capacite,
    Reference_idReference:idref,
    prix:prix
  }
///////////////////////////Function///////////////////////
const Fetchallref=async()=>{
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
  const Fetchallcateg=async()=>{
    try{
      const response=await axios.get("http://"+port+":3000/api/categories/categorie")
      setCategories(response.data)
    }
    catch (error) {
      console.error('Error fetching :', error)
    }
  }

  const PostArticle=async(data1,id,data2,showAlert )=>{
    try{
      data1.Reference_idReference=id
      console.log(data1.Reference_idReference,'idddd');
      if(data1.Reference_idReference!=null){
        await axios.post("http://"+port+":3000/api/articles/articles",data1)
        await axios.put("http://"+port+":3000/api/reference/references/"+id,data2)
        showAlert('success', "Un Nouveau Article a été créé");
      }
  
      setLoad(!load)
      console.log('article added');
    }
    catch (error) {
      console.error('Error Ading :', error)
      showAlert('error', "Erreur lors de la création de l'Article. Veuillez réessayer plus tard.");
  
    }
  }

  React.useEffect(()=>{
    Fetchallref()
    Fetchallmarq()
    Fetchallcateg()
  },[load])
///////////////////////////Function///////////////////////

const findId = (data, name, dataname, idname, setid) => {
  const element = data.find(el => el[dataname] === name);
  if (element) {
    console.log(element);
    setid(element[idname]);
  }
}

const validAdd=()=>{
  Promise.all([
    findId(marques,marque,'marquename','idMarque',setIdmarque),
    findId(Categories,categ,'Categoryname','idCategory',setIdcateg),
    findId(references,Ref,'Referencename','idReference',setIdref)
  ]).then(()=>{
    PostArticle(dataArticle,idref,updateRef,showAlert)
  })
  .catch(error => {
    console.error('Error in operation:', error);
  });
}

  function RowItem({ text, settruc2 }) {
    if (settruc2 == "") {
      return (
        <View style={styles.row}>
          <Text style={styles.text}>{text}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Image
              resizeMode="contain"
              source={downicon}
              style={styles.leftimage}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  const RenderInput = (placeholder) => {
    if(placeholder=="Capacité"){
        return(
            <Center mt={3} ml={'26%'}>
        <Input
          w="290%"
          InputLeftElement={
            <MaterialIcons name="person" size={24} color="black" style={{ marginLeft: 2 }} />
          }
          placeholder={placeholder}
          onChangeText={(text) => setCapacite(text)}
        />
      </Center>
        )
    }
    else if(placeholder=="Couleur"){
      return(
        <Center mt={3}>
        <Input
          w="75%"
          InputLeftElement={
            <MaterialIcons name="person" size={24} color="black" style={{ marginLeft: 2 }} />
          }
          placeholder={placeholder}
          onChangeText={(text) => setCouleur(text)}
        />
      </Center>
      )
  }
    return (
      <Center mt={3}>
        <Input
          w="75%"
          InputLeftElement={
            <MaterialIcons name="person" size={24} color="black" style={{ marginLeft: 2 }} />
          }
          placeholder={placeholder}
          onChangeText={(text) => setPrix(text)}
        />
      </Center>
    );
  };

  const Example = ({text}) => {

    if(text=='Références'){
      return (
        <Center>
            <Box maxW="400" mt={3}>
            <Select selectedValue={Ref} minWidth="280" accessibilityLabel={text} placeholder={text} _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}
        InputLeftElement={
          <Icon as={<MaterialIcons name="tag" />} size={5} ml="2" color="muted.400" />
        }  mt={1} onValueChange={itemValue => setRef(itemValue)}>
          {references.map(el=>(
            <Select.Item label={el.Referencename} value={el.Referencename}/>
          ))}
          </Select>
        </Box>
      </Center>
      )
    }
    else if(text=='Marque'){
      return (
        <Center>
            <Box maxW="400" mt={3}>
            <Select selectedValue={marque} minWidth="280" accessibilityLabel={text} placeholder={text} _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}
        InputLeftElement={
          <Icon as={<MaterialIcons name="sell" />} size={5} ml="2" color="muted.400" />
        }  mt={1} onValueChange={itemValue => setMarque(itemValue)}>
          {marques.map(el=>(
            <Select.Item label={el.marquename} value={el.marquename}/>
          ))}
          </Select>
        </Box>
      </Center>
      )
    }
    else if(text=='Categories'){
      return (
        <Center>
            <Box maxW="400" mt={3}>
            <Select selectedValue={categ} minWidth="280" accessibilityLabel={text} placeholder={text} _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}
        InputLeftElement={
          <Icon as={<MaterialIcons name="category" />} size={5} ml="2" color="muted.400" />
        }  mt={1} onValueChange={itemValue => setCateg(itemValue)}>
          {Categories.map(el=>(
            <Select.Item label={el.Categoryname} value={el.Categoryname}/>
          ))}
          </Select>
        </Box>
      </Center>
      )
    }
    else if(text=="unités"){
      return  <Center>
        <Box maxW="150" mt={3}mr={12}>
          <Select
            selectedValue={unite}
            minWidth="100"
            accessibilityLabel={text}
            placeholder={text}
            onValueChange={(itemValue) => setUnite(itemValue)}
          >
            {tdc.map(el=>(
                  <Select.Item label={el} value={el} />
            ))}
            
          </Select>
        </Box>
      </Center>
    }
    
  };


  return (
    <NativeBaseProvider>
            <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />

      <Header />
      <View style={styles.container}>
        <RowItem text="Créer un nouveau rapport" settruc2={""} />
        <ScrollView style={{marginTop:40}}>
        <Example text={'Marque'} />
        <Example text={'Categories'} />
        <Example text={'Références'} />
        {RenderInput("Prix")}
        <View style={styles.doubleInput}>
          {RenderInput("Capacité")}
          <Example text={'unités'} />
        </View>
        {RenderInput("Couleur")}
        </ScrollView>
        <TouchableOpacity onPress={() => {}} style={styles.btns}>
          <Text style={styles.btnText}>Valider</Text>
        </TouchableOpacity>
      </View>
      <Footer ani={ani} />
      </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 80,
    marginTop:-550
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
});

export default CreationNRapport;