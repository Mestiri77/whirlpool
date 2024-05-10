import * as React from "react";
import {FlatList,Alert,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity,} from "react-native";
import { CheckIcon,Input,CloseIcon,HStack,IconButton, Divider,Heading, Button, Select, Box, Center, NativeBaseProvider,Stack, Icon,Skeleton, VStack,} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';

const leftimage = require('../../../assets/icons8-right-50.png'); 
const downicon = require('../../../assets/icons8-down-50.png')

function CreationArticle(){
const [load,setLoad]=React.useState(false)

const [creatArt,setCreatArt]=React.useState(false)
const [modifArt,setModifArt]=React.useState(false)
const [showpop,setShowpop]=React.useState(false);
const [validmodif,setValidmodif]=React.useState(false)

const [modif,setModif]=React.useState("")

const [Ref,setRef]=React.useState("")
const [Marq,setMarq]=React.useState("")
const [couleur,setCouleur]=React.useState("")
const [categ,setCateg]=React.useState("")
const [typeC,setTypeC]=React.useState("")
const [capacite,setCapacite]=React.useState("")
const [idref,setIdref]=React.useState("")
const [idmarque,setIdmarque]=React.useState('')
const [idcateg,setIdcateg]=React.useState('')


const [references,setReferences]=React.useState([])
const [marques,setMarques]=React.useState([])
const [Categories,setCategories]=React.useState([])
const tdc=["L", "kg", "ft³", "W", "BTU", "bar"]
const [oneref,setOneref]=React.useState([])
const [oneArticle,setOneArticle]=React.useState([])

const port='192.168.1.28'

const dataArticle={
  coloeur:couleur,
  typeC:typeC,
  capacite:capacite,
  Reference_idReference:idref,
}
const updateRef={
  Marque_idMarque:idmarque,
  Category_idCategory:idcateg,
}
const coleurdata={
  coloeur:modif
}
const capacitedata={
  capacite:modif
}

/////////////////////////////////////////////FUNCTIONs/////////////////////////////
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
    const response=await axios.get("http://"+port+":3000/api/categories/categories")
    setCategories(response.data)
  }
  catch (error) {
    console.error('Error fetching :', error)
  }
}

const PostArticle=async(data1,id,data2)=>{
  try{
    await axios.post("http://"+port+":3000/api/articles/articles",data1)
    await axios.put("http://"+port+":3000/api/reference/references/"+id,data2)
    setLoad(!load)
    console.log('article added');
  }
  catch (error) {
    console.error('Error Ading :', error)
  }
}
const getOneArticlebyref=async(id)=>{
  try{
    console.log(id);
    const res=await axios.get("http://"+port+":3000/api/articles/articlesbyref/"+id)
    setOneArticle(res.data)
  }
  catch (error) {
    console.error('Error fetching oneart:', error)
  }
}
const getOneRef=async(id)=>{
  try{
    const response=await axios.get("http://"+port+":3000/api/reference/references/"+id)
    setOneref(response.data)
  }
  catch (error) {
    console.error('Error fetching oneref:', error)
  }
}

const Editref=async(data,id)=>{
  try{
    await axios.put("http://"+port+":3000/api/reference/references/"+id,{Referencename:data})
    setLoad(!load)
    console.log('updated');
  }
  catch (error) {
    console.error('Error Update :', error)
  }
}

const EditMarque=async(data,id)=>{
  try{
    await axios.put("http://"+port+":3000/api/marques/marques/"+id,{marquename:data})
  }
  catch (error) {
    console.error('Error Update :', error)
  }
}

const EditArticle=async(data,id)=>{
  try{
    await axios.put("http://"+port+":3000/api/articles/articles/"+id,data)
  }
  catch (error) {
    console.error('Error Update :', error)
  }
  
}


const findId = (data, name, dataname, idname, setid) => {
  const element = data.find(el => el[dataname] === name);
  if (element) {
    console.log(element);
    setid(element[idname]);
  }
}

const Modifbtn = (truc) => {
  console.log('oneref:', oneref); // Check the entire object/array
  if(truc === 'marque')
 { if (oneref ) {
    console.log('Marque_idMarque:', oneref.Marque_idMarque);
    let idMarq = oneref.Marque_idMarque;
    console.log(modif);
    EditMarque(modif, idMarq);}

  } else if (truc === 'couleur') {
        // Assuming `oneArticle` is an array of objects returned from your query
        if (oneArticle) {
          let idArticle = oneArticle.idArticle; // Assuming the first element has the ID you need
          console.log(idArticle);
          EditArticle(coleurdata, idArticle); // Assuming `modif` is a predefined object with modification details
        } else {
          console.log('No matching records found');
        }
        
  }
  else if (truc === 'capacite') {
    // Assuming `oneArticle` is an array of objects returned from your query
    if (oneArticle) {
      let idArticle = oneArticle.idArticle; // Assuming the first element has the ID you need
      console.log(idArticle);
      EditArticle(capacitedata, idArticle); // Assuming `modif` is a predefined object with modification details
    } else {
      console.log('No matching records found');
    }}
};

// const Modifbtn=(truc)=>{
//   if(truc==='marque'){
//     Promise.all([
//       getOneRef(idref)
//     ]).then(()=>{
//       let idMarq=oneref.map(el=>(el.Marque_idMarque))
//       EditMarque(modif,idMarq)
//     })
//   }
//   else if(truc==='article'){
//     Promise.all([
//       getOneArticlebyref(idref)
//     ]).then(()=>{
//       let idArticle=oneArticle.map(el=>(el.idArticle))
//       EditArticle(modif,idArticle)
//     })
//   }
// }

const validAdd=()=>{
  Promise.all([
    findId(marques,Marq,'marquename','idMarque',setIdmarque),
    findId(Categories,categ,'Categoryname','idCategory',setIdcateg),
    findId(references,Ref,'Referencename','idReference',setIdref)
  ]).then(()=>{
    PostArticle(dataArticle,idref,updateRef)
  })
  .catch(error => {
    console.error('Error in operation:', error);
  });
}

React.useEffect(()=>{
  Fetchallref()
  Fetchallmarq()
  Fetchallcateg()
},[load])
//////////////////////////////////////////////////////////////////////////////////


    function RowItem({ text, truc,settruc,settruc2}) {
        if(settruc2==""){
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
        else{
        return (
          <View style={styles.row}>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={() => {settruc(!truc),settruc2(true),console.log(truc,text)}}>
              <Image
                resizeMode="contain"
                source={truc ? downicon : leftimage}
                style={styles.leftimage}
              />
            </TouchableOpacity>
          </View>
          
        );
    }
      }
      const Example = ({text}) => {

        if(text=='Reference'){
          return (
            <Center>
            <Box maxW="400">
              <Select selectedValue={Ref} minWidth="240" accessibilityLabel={text} placeholder={text} _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setRef(itemValue)}>
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
            <Box maxW="400">
              <Select selectedValue={Marq} minWidth="240" accessibilityLabel={text} placeholder={text} _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setMarq(itemValue)}>
              {marques.map(el=>(
                <Select.Item label={el.marquename} value={el.marquename}/>
              ))}
              </Select>
            </Box>
          </Center>
          )
        }
        else if(text=='categorie'){
          return (
            <Center>
            <Box maxW="400">
              <Select selectedValue={categ} minWidth="240" accessibilityLabel={text} placeholder={text} _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setCateg(itemValue)}>
              {Categories.map(el=>(
                <Select.Item label={el.Categoryname} value={el.Categoryname}/>
              ))}
              </Select>
            </Box>
          </Center>
          )
        }
        else if(text=='Type de Capacité'){
          return (
            <Center>
            <Box maxW="400">
              <Select selectedValue={typeC} minWidth="240" accessibilityLabel={text} placeholder={text} _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setTypeC(itemValue)}>
              {tdc.map(el=>(
                <Select.Item label={el} value={el}/>
              ))}
              </Select>
            </Box>
          </Center>
          )
        }
        
      };

      const RenderInput= (text,modif)=>{
        if(modif==true){
          return(
            <Stack space={4} w="50%" alignItems="center" mt="5%">
            <Input 
              w={{
                base: "75%",
                md: "25%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder={text}
              onChangeText={item=>setModif(item)}
            />
           
          </Stack>
          )
        }
        else if(text=='couleur'&& modif==false){
          return(
            <Stack space={4} w="100%" alignItems="center" mt="2%">
            <Input 
              w={{
                base: "75%",
                md: "25%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder={text}
              onChangeText={item=>setCouleur(item)}
            />
           
          </Stack>
          )
        }
        else if(text=='Capacite'&& modif==false){
          return(
            <Stack space={4} w="100%" alignItems="center" mt="2%">
            <Input 
              w={{
                base: "75%",
                md: "25%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder={text}
              onChangeText={item=>setCapacite(item)}
            />
           
          </Stack>
          )
        }
      }
      function Alerta() {
        Alert.alert(
          "Alerte",  // Titre de l'alerte
          "Choisir une Reference",  // Message de l'alerte
          [
            {
              text: "Annuler",
              onPress: () => console.log("Annuler Pressé"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressé") }
          ],
          { cancelable: false }  // Si false, l'alerte ne se fermera pas en cliquant à l'extérieur
        );
      }
      const closepop = () => {
        if (Ref !== '') {
          console.log(Ref);
          const element = references.find(el => el['Referencename'] === Ref);
          if (element) {
            console.log(element);
            const idReference = element['idReference'];
            console.log('here', idReference);
            setIdref(idReference);
            getOneRef(idReference);
            getOneArticlebyref(idReference);
            setShowpop(false);
          }
        }
        else{
          <Center flex={1} px="3">
            <View style={styles.alert}>
          {Alerta()}
          </View>
      </Center>
    }
    }
      const renderPopup=()=>{
        return(
                  <View style={{marginTop:'20%'}}>
                  <Center flex={1} px="3">
                  <Center w="100%">
        <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
        borderColor: "coolGray.500"
        }} _light={{
        borderColor: "coolGray.200"
        }}>
          <Center flex={1} px="3" mt="2">
          <Text style={styles.textprop}>Choisir la réfèrence :</Text>
          </Center>

          <Example text={'Reference'} />
          <Stack mb="8" mt="1" direction={{
          base: "row",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0",
        }}>
            <Button size="sm" variant="outline" borderColor="#FDC100" _text={{ color: '#FDC100' }} 
            onPress={()=> {closepop()}}
            >
              Valider
            </Button>
            <Button size="sm" variant="outline" borderColor="#D0D3D4" _text={{ color: '#D0D3D4' }}
            onPress={()=> {setShowpop(false),setModifArt(false)}}
            >
              Annuler
            </Button>
          </Stack>
        </VStack>
        </Center>;
        </Center>
        </View>
          )
      }
    
      const renderModif=()=>{
        return(
          <View>
          <Stack mb="4" mt="8" direction={{
                    base: "row",
                    md: "row"
                  }} space={2} mx={{
                    base: "auto",
                    md: "0",
                  }}>              
            {RenderInput('Reference',true)}
            <TouchableOpacity onPress={() =>{Editref(modif,idref)}} style={styles.btns}>
    <Text style={styles.btnText}>Modifier</Text>
  </TouchableOpacity>
          </Stack>

          <Stack mb="4" mt="1" direction={{
                    base: "row",
                    md: "row"
                  }} space={2} mx={{
                    base: "auto",
                    md: "0",
                  }}>              
            {RenderInput('Marque',true)}
            <TouchableOpacity onPress={() =>{Modifbtn('marque')}} style={styles.btns}>
    <Text style={styles.btnText}>Modifier</Text>
  </TouchableOpacity>
          </Stack>
          <Stack mb="4" mt="1" direction={{
                    base: "row",
                    md: "row"
                  }} space={2} mx={{
                    base: "auto",
                    md: "0",
                  }}>              
            {RenderInput('Couleur',true)}
            <TouchableOpacity onPress={() =>{Modifbtn('couleur')}} style={styles.btns}>
    <Text style={styles.btnText}>Modifier</Text>
  </TouchableOpacity>
          </Stack>
          <Stack mb="4" mt="1" direction={{
                    base: "row",
                    md: "row"
                  }} space={2} mx={{
                    base: "auto",
                    md: "0",
                  }}>              
            {RenderInput('Capaciter',true)}
            <TouchableOpacity onPress={() =>{Modifbtn('capacite')}} style={styles.btns}>
    <Text style={styles.btnText}>Modifier</Text>
  </TouchableOpacity>
          </Stack>
    </View>
        )
      }
      const renderform=(text)=>{
        if(text=="Créer un nouveau article"){
            return(

                <View style={styles.inputs}>
                <Center flex={1} px="3">
                <Example text={"Reference"}/>
                <Example text={"Marque"} />
                {RenderInput('couleur',false)}
                <Example text={"categorie"}/>
                <Example text={"Type de Capacité"}/>
                {RenderInput('Capacite',false)}
                <TouchableOpacity onPress={() =>{validAdd()}} style={styles.btns}>
        <Text style={styles.btnText}>Valideé</Text>
      </TouchableOpacity>
            </Center>
            </View>
            )
        }
        else if(showpop){
            return(
              renderPopup()
            )
        }
        else if (!showpop){
          return(
            renderModif()
          )
        }
      }

    return (
        <NativeBaseProvider>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <Image
              resizeMode="contain"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/12f4aba34bd6fde10767af48f78f20f36401e32be5ece9adacbb2971412c1df1?apiKey=354f2f8c1f9f40aca64d3ce2e19fda26&",
              }}
              style={styles.image1}
            />
         <ScrollView>
            <RowItem text="Créer un nouveau article" truc={creatArt} settruc={setCreatArt} settruc2={""} />
            {creatArt&&renderform("Créer un nouveau article")}
            <RowItem text="Modifier un article" truc={modifArt} settruc={setModifArt} settruc2={setShowpop} />
            {modifArt&&renderform()}
          </ScrollView>
          </View>
    
        </View>
        </NativeBaseProvider>
      );
    }
      const styles = StyleSheet.create({
        alert: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
        },
        textprop:{
            fontSize: 18,
            fontWeight:"600"
        },
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
            })

export default CreationArticle;