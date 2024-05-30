import * as React from "react";
import {FlatList,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity,Button} from "react-native";
import { Alert,CheckIcon,Input, HStack,Select, IconButton,CloseIcon,VStack,Box, Center, NativeBaseProvider,Stack, Icon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import port from '../port'
import Footer from './footer'


const leftimage = require('../../../assets/left-icon.png'); 
const downicon = require('../../../assets/down-icon.png')
const IconRregion=require ('../../../assets/region-icon.png')
const ptDv = require ('../../../assets/point-de-vente-icon.png')
const refference = require('../../../assets/reference-icon.png')
const categorie = require ('../../../assets/category-icon.png')
const marque =require ('../../../assets/marque-icon.png')
function Creationpdv() {
  const [alertData, setAlertData] = React.useState({ visible: false, status: '', message: '' });

const [load,setload]=React.useState(false)  
const [pdv,setPdv]=React.useState(false);
const [affanim, setAffanim] = React.useState(false);
const [categ,setCateg] =React.useState(false);
const [marque, setMarque] = React.useState(false);
const [ref,setRef]=React.useState(false)
const [categs,setCategs]=React.useState([]);
const [marques,setMarques]=React.useState([])
const [nomspdv,setNomspdv]=React.useState([]);
const [nomsanims,setNomanims]=React.useState([]);


const [nomsanim,setNomanim]=React.useState('Animatrices');
const [nompdv,setNompdv]=React.useState("Point de Vente");
const [nomcateg,setNomcateg]=React.useState('')
const [nommarq,setNommar]=React.useState('')
const [nomref,setNomref]=React.useState("")
const [region,setRegion]=React.useState('Region')

const [idcateg,setIdcateg]=React.useState(null)
const [idmarque,setIdmarque]=React.useState(null)
const [iduser,setIdUser]=React.useState([])
const [idpdv,setIdpdv]=React.useState([])
const [pdvs, setPdvs] = React.useState([]);
// const port='192.168.218.26'

const Regions=["Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kébili","Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]
 
const Ref={
  Referencename:nomref,
  Marque_idMarque:idmarque,
  Category_idCategory:idcateg
}

const Pdv={
  pdvname:nompdv,
  location:region
}
////////////////////////FUNCTIONS///////////////////////////
const Fetchallmarq=async()=>{
  try{
    const response=await axios.get("http://"+port+":3000/api/marques/marques")
    setMarques(response.data)
    console.log(response.data);
  }catch (error) {
    console.error('Error fetching :', error)
  }
}
const Fetchallcateg=async()=>{
  try{
    const response=await axios.get("http://"+port+":3000/api/categories/categories")
    setCategs(response.data)
    console.log(response.data);
  }
  catch (error) {
    console.error('Error fetching :', error)
  }
}
const fetchPdvsname = async () => {
  try {
    const response = await axios.get(`http://${port}:3000/api/pdvs/pdvs`);
    const pdvNames = response.data.map(pdv => pdv.pdvname);
    setNomspdv(pdvNames);
  } catch (error) {
    console.error('Error fetching PDVs:', error)
  }
}
const getpdvByname=async(info)=>{
  try{
    let response=await axios.get("http://"+port+":3000/api/pdvs/getId/"+info)
    setIdpdv(response.data.idPDV)
    return response.data.idPDV
    setload(!load)
  }
  catch (error) {
    console.error('Error fetching PDV:', error)
  }
}
const fetchAnimname = async () => {
  try {
    const response = await axios.get(`http://${port}:3000/api/users/`);
    const nameAnims = response.data.reduce((acc, el) => {
      if (el.role === 'animatrice' && el.name && el.lastname) {
        const fullName = `${el.name} ${el.lastname}`;
        if (!acc.includes(fullName.trim())) {
          acc.push(fullName.trim());
        }
      }
      return acc;
    }, []);

    console.log(nameAnims);
    setNomanims(nameAnims);
  } catch (error) {
    console.error('Error fetching Anims:', error);
  }
};
const getIdbyname = async (name, lastname) => {
  try {
    const response = await axios.get(`http://${port}:3000/api/users/getonenameuser`, {
      params: {
        name: name,
        lastname: lastname
      }
    });

    if (response.data && response.data.idusers) {
      console.log(response.data.idusers, "id de l'utilisateur"); // Vérifiez que vous recevez l'ID de l'utilisateur
      setIdUser(response.data.idusers);
      return response.data.idusers; // Retourne l'ID de l'utilisateur
    } else {
      throw new Error('User ID not found');
    }
  } catch (error) {
    console.error('Error fetching user by name:', error);
    throw error; // Laisser l'erreur être capturée par le bloc catch de la fonction appelante
  }
};


const Addpdvs=async (info,showAlert)=>{
  try{
    axios.post('http://'+port+':3000/api/pdvs/pdvs',info)
    console.log('pdv aded');
    setload(!load)
    showAlert('success', "Un Nouveau Point de vente a été créé");
  }
   catch (error) {
    console.error('Error adding point de vente:', error)
    showAlert('error', "Erreur lors de la création de la point de vente. Veuillez réessayer plus tard.");

  }
}
const AddCateg=async (info,showAlert)=>{
  try{
      axios.post('http://'+port+':3000/api/categories/categories',{Categoryname:info})
      setload(!load)
    showAlert('success', "Un Nouveau Categorie a été créé");

  }
   catch (error) {
    console.error('Error adding Category', error)
    showAlert('error', "Erreur lors de la création de la point de vente. Veuillez réessayer plus tard.");

  }
}
const AddMarque=async (info,showAlert)=>{
  try{
    axios.post('http://'+port+':3000/api/marques/marques',{marquename:info})
    setload(!load)
    showAlert('success', "Un Nouveau Marque a été créé");
  }
  catch (error) {
    console.error('Error adding Marque', error)
    showAlert('error', "Erreur lors de la création de la point de vente. Veuillez réessayer plus tard.");

  }
}
const AddRef=async(info,showAlert)=>{
  try{
    axios.post('http://'+port+':3000/api/reference/references',info)
    setload(!load)
    showAlert('success', "Un Nouveau Refernce a été créé");
  }
  catch (error) {
    console.error('Error adding Marque', error)
    showAlert('error', "Erreur lors de la création de la point de vente. Veuillez réessayer plus tard.");

  }
}
const updateAnimByPdv = async (userId, pdvId, showAlert) => {
  try {
    if (!userId || !pdvId) {
      throw new Error('User ID or PDV ID is missing');
    }

    const response = await axios.put(`http://${port}:3000/api/users/animbypdv/${userId}`, { PDV_idPDV: pdvId });

    if (response.status === 200) {
      console.log('Animateur bien affecté');
      showAlert('success', "Animateur bien affecté");
    } else {
      console.error('Error updating user1:', response);
      showAlert('error', "Erreur lors de la mise à jour de l'animateur. Veuillez réessayer plus tard.");
    }
  } catch (error) {
    console.error('Error updating user2:', error);
    showAlert('error', "Erreur lors de la mise à jour de l'animateur. Veuillez réessayer plus tard.");
  }
};


React.useEffect(()=>{
  fetchPdvsname();
  fetchAnimname()
  Fetchallmarq()
  Fetchallcateg()
},[load])
////////////////////////FUNCTIONS///////////////////////////

const ExampleAlert = ({ status, message, onClose }) => {
  return (
      <Stack space={3} w="100%" maxW="400">
        <Alert w="100%" status={status}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {message}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{ borderWidth: 0 }}
                icon={<CloseIcon size="3" />}
                _icon={{ color: "coolGray.600" }}
                onPress={onClose}
              />
            </HStack>
          </VStack>
        </Alert>
      </Stack>
  );
};
const showAlert = (status, message) => {
  setAlertData({ visible: true, status, message });
};

const hideAlert = () => {
  setAlertData({ visible: false, status: '', message: '' });
};

const affectanim = async (nameanim, namepdv) => {
  let name = '';
  let lastname = '';

  if (nameanim !== "") {
    const parts = nameanim.split(' ');
    name = parts[0];
    lastname = parts[1];
  }

  try {
    const userId = await getIdbyname(name, lastname); // Fetch user ID by name and last name
    const pdvId = await getpdvByname(namepdv); // Fetch PDV ID by name
    console.log(pdvId,userId,'gooo');
    await updateAnimByPdv(userId, pdvId, showAlert); // Update assuming this function requires userId and pdvId

    console.log('Animateur bien affecté');
  } catch (error) {
    console.error('Error in operation:', error);
  }
};

  function RowItem({ text, truc,settruc}) {
    return (
      
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity onPress={() => {settruc(!truc),console.log(truc,text)}}>
          <Image
            resizeMode="contain"
            source={truc ? downicon : leftimage}
            style={styles.leftimage}
          />
        </TouchableOpacity>
      </View>
    );
  }
    /////////////////////////Exemple//////////////////////////////
  const Example = ({text}) => {
    if(text=='Point de Vente'){
      return (
        <Center>
        <Box maxW="400">
         
          <Select
            selectedValue={nompdv}
            minWidth="240"
            accessibilityLabel={nompdv}
            placeholder={nompdv}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
            InputLeftElement={
              <Icon as={<MaterialIcons name="store" />} size={5} ml="2" color="muted.400" />
            } 
            mt={1}
            onValueChange={itemValue => setNompdv(itemValue)}
          >
            {nomspdv.map((el, index) => (
              <Select.Item key={index} label={el} value={el} />
            ))}
          </Select>
        </Box>
      </Center>
      );
    }
    else if(text=='Animatrices'){
      return(
        <Center>
        <Box maxW="400">
          <Select
            selectedValue={nomsanim}
            minWidth="240"
            accessibilityLabel={nomsanim}
            placeholder= {nomsanim}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
            InputLeftElement={
              <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
            } 
            mt={1}
            onValueChange={itemValue => setNomanim(itemValue)}
          >
          {nomsanims.map(el=>{
            return(
            <Select.Item label={el} value={el} />
          )
          })}

          </Select>
        </Box>
      </Center>
      )
    }
    else if(text=="Categories"){
      return(
        <Center>
        <Box maxW="400">
          <Select
            selectedValue={nomcateg}
            minWidth="318"
            accessibilityLabel={nomcateg}
            placeholder= {text}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
            InputLeftElement={
              <Icon as={<MaterialIcons name="category" />} size={5} ml="2" color="muted.400" />
            } 
            mt={1}
            onValueChange={(itemValue) => {
              setNomcateg(itemValue);
              const selectedCategory = categs.find(el => el.Categoryname === itemValue);
              setIdcateg(selectedCategory ? selectedCategory.idCategory : null);
            }}          >
          {categs.map(el=>{
            return(
            <Select.Item label={el.Categoryname} value={el.Categoryname} />
          )
          })}
          </Select>
        </Box>
      </Center>
      )
    }
    else if(text=="Marques"){
      return(
        <Center>
        <Box maxW="400">
          <Select
            selectedValue={nommarq}
            minWidth="318"
            accessibilityLabel={nommarq}
            placeholder= "Marque"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
            InputLeftElement={
              <Icon as={<MaterialIcons name="sell" />} size={5} ml="2" color="muted.400" />
            } 
            mt={1}
            onValueChange={(itemValue) => {
              setNommar(itemValue);
              const selectedMarque = marques.find(el => el.marquename === itemValue);
              setIdmarque(selectedMarque ? selectedMarque.idMarque : null);
            }}          >
          {marques.map(el=>{
            return(
            <Select.Item label={el.marquename} value={el.marquename} />
          )
          })}
          </Select>
        </Box>
      </Center>
      )
    }
    /////////////////////////Exemple//////////////////////////////
    return (
      <Center>
        <Box maxW="400">
          <Select
            selectedValue={region}
            minWidth="240"
            accessibilityLabel={region}
            placeholder= {region}
            InputLeftElement={
              <Icon as={<MaterialIcons name="location-on" />} size={5} ml="2" color="muted.400" />
            } 
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
            mt={1}
            onValueChange={itemValue => setRegion(itemValue)}
          >
            {Regions.map(el=>(
              <Select.Item  label={el} value={el} />
            ))}
          </Select>
        </Box>
      </Center>
    );
  };
  const renderform =(key)=>{
    if (key==='pdv'&& pdv) {
      return (
        <View style={styles.inputs}>
           <Center flex={1} px="3">
          <Stack space={4} w="100%" alignItems="center">
            <Input 
              w={{
                base: "75%",
                md: "25%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="store" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder="Point de vente" 
              onChangeText={item=>setNompdv(item)}
            />
           
          </Stack>
        <Example text="Region" />
        <TouchableOpacity onPress={() =>{ Addpdvs(Pdv,showAlert),console.log('add',Pdv);}} style={styles.btns}>
        <Text style={styles.btnText}>Valideé</Text>
      </TouchableOpacity>
        </Center>
        </View>
      )
    }
    else if ( key==='affanim'&& affanim){
      return (
      <View style={styles.inputs}>
      <Center flex={1} px="3">
      <Example text="Point de Vente"  />
      </Center>
      <Center flex={1} px="3">
      <Example text="Animatrices" />
      </Center>
      <Center flex={1} px="3">
          <TouchableOpacity onPress={() => {affectanim(nomsanim, nompdv) }} style={styles.btns}>
        <Text style={styles.btnText}>Valider</Text>
      </TouchableOpacity>
      </Center>
      </View>
      )
    }
    else if (key==='categ'&& categ){
      return (
      <View style={styles.inputs}>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Input mx="3" placeholder="Category" 
            InputLeftElement={
              <Icon as={<MaterialIcons name="category" />} size={5} ml="2" color="muted.400" />
            } onChangeText={item=>setNomcateg(item)}  w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
      <TouchableOpacity onPress={() => AddCateg(nomcateg,showAlert)} style={styles.btns}>
        <Text style={styles.btnText}>Valider</Text>
      </TouchableOpacity>
      </Center>
      </View>
      )
    }
    else if (key==='marque'&& marque){
      return (
      <View style={styles.inputs}>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Input mx="3" placeholder="Marque"
            InputLeftElement={
              <Icon as={<MaterialIcons name="sell" />} size={5} ml="2" color="muted.400" />
            } onChangeText={item=>setNommar(item)} w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
      <TouchableOpacity onPress={() => AddMarque(nommarq,showAlert)} style={styles.btns}>
        <Text style={styles.btnText}>Valider</Text>
      </TouchableOpacity>
      </Center>
      </View>
      )
    }
    else if (key==='ref'&& ref){
      return (
      <View style={styles.inputs}>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Input mx="3" placeholder="Reference" 
            InputLeftElement={
              <Icon as={<MaterialIcons name="tag" />} size={5} ml="2" color="muted.400" />
            } onChangeText={item=>setNomref(item)} w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
         <Example text={"Categories" }/>
        <Example text={"Marques"} />
      <TouchableOpacity onPress={() => AddRef(Ref,showAlert)} style={styles.btns}>
        <Text style={styles.btnText}>Valider</Text>
      </TouchableOpacity>
      </Center>
      </View>
      )
    }
  }
  return (
    <NativeBaseProvider>

    <View style={styles.view1}>
      <Text style={{fontSize:18, fontWeight:700 , marginTop:20}}>Creation de Point de Vente :</Text>
    {alertData.visible && (
          <ExampleAlert
            status={alertData.status}
            message={alertData.message}
            onClose={hideAlert}
          />
        )}
      <View style={styles.view2}>
        <Image
          resizeMode="contain"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/12f4aba34bd6fde10767af48f78f20f36401e32be5ece9adacbb2971412c1df1?apiKey=354f2f8c1f9f40aca64d3ce2e19fda26&",
          }}
          style={styles.image1}
        />
     <ScrollView>
        <RowItem text="Point de vente" truc={pdv} settruc={setPdv} />
        {pdv&&renderform('pdv')}
        <RowItem text="Affectation Animatrice" truc={affanim} settruc={setAffanim}/>
        {affanim&&renderform('affanim')}
        <RowItem text="Categories" truc={categ} settruc={setCateg}/>
        {categ&&renderform('categ')}
        <RowItem text="Marques"truc={marque} settruc={setMarque} />
        {marque&&renderform('marque')}
        <RowItem text="References" truc={ref} settruc={setRef}/>
        {ref&&renderform('ref')}
      </ScrollView>
      </View>
    </View>
    <Footer/>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  btns: {
    backgroundColor: '#FDC100', // Background color of the button
    padding: 10,
    borderRadius: 5,
    width:150,
    marginTop:"5%",
    
  },
  btnText: {
    color: 'white', // Text color
    fontSize: 16,
    textAlign:"center"
  },
  inputs:{
    marginTop:'5%',
    marginBottom:'5%',
  },
  view1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 39,
    paddingHorizontal: 35,
    paddingBottom: 80,
  },
  view2: {
    flex: 1,
    alignItems: 'center',
  },
  image1: {
    width: 24,
    height: 24, // Added height for aspect ratio
    marginBottom: 20, // Give some space below the image
  },
  row: {
    flexDirection: 'row', // Layout children in a row
    justifyContent: 'space-between', // Align children to the start and end of the container
    width: '100%', // Make the row take the full width
    alignItems: 'center', // Align items vertically
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 50, // Space between text and arrow
  },
  leftimage: {
    width: 30,
    height: 30,
  },
});
export default Creationpdv;