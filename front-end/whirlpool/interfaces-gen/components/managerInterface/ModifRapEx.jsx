import * as React from "react";
import {FlatList,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity} from "react-native";
import { NativeBaseProvider, Center,Stack,Input,Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import port from "../port";


function Modifpopup({ article, refData, marqueData, price,onClose }) {
  // const { idref, idmarque, idarticle } = route.params;
    const [modif,setModif] = React.useState('');
    const [reff, setReff] = React.useState('');
    const [marque, setMarque] = React.useState('');
    const [prix, setPrix] = React.useState(null);
    const [refresh,setRefresh]=React.useState(false)
    const modification =(reff , marque ,prix )=>{
      
      if (reff){
axios.put (`http://${port}:3000/api/reference/references/${refData.idReference}`, {Referencename: reff})
console.log('ref modifier');
      }
      if(marque){
        axios.put (`http://${port}:3000/api/marques/marques/${marqueData.idMarque}`, {marquename:marque})
        console.log('marq modifier');

      }
      if(prix){
        axios.put (`http://${port}:3000/api/articles/price/${article.idArticle}`,{prix:prix})
        console.log('art modifier');

      }
    }
    const RenderInput=(text, value, onChange)=>{
        if(text=="Reference"&&value==reff,onChange== setReff){    
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
              value={value}
              onChangeText={onChange}            />
           
          </Stack>
          )
        }
    else if(text=="Marque"&&value== marque,onChange== setMarque) {
        return (
            <Stack space={4} w="42%" alignItems="center" mt="5%" ml="7%" >
            <Input 
              w={{
                base: "75%",
                md: "15%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder={text}
              value={value}
              onChangeText={onChange}            />
           
          </Stack>
         )
    }
    else if(text=="Prix"&&value==  prix,onChange== setPrix) {
        return (
            <Stack space={4} w="42%" alignItems="center" mt="5%" mr="7%" style={{}} >
            <Input 
              w={{
                base: "75%",
                md: "25%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder={text}
              value={value}
              onChangeText={onChange}            />
           
          </Stack>
         )
    }
    }
  return (
    <NativeBaseProvider>
    <View style={styles.view1}>
        <Center><View style={styles.view2}><Text style={{fontWeight:500}}>Modifer Cette Ligne</Text></View></Center>
        <View style={styles.allinputs}>
        {RenderInput('Reference', reff, setReff)}
        <View style={styles.inputs}>
        {RenderInput('Marque', marque, setMarque)}
        {RenderInput('Prix', prix, setPrix)}
        </View>
        </View>
        <Center>
        <View style={styles.btnsh}>
        <TouchableOpacity onPress={() =>{modification(reff,marque,prix);setRefresh(!refresh)}} style={styles.btnmod}>
            <Text style={styles.btnTextmod}>Modifier</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() =>{}} style={styles.btncans}>
            <Text style={styles.btnTextcans}>Supprimer</Text>
        </TouchableOpacity> */}
        </View>
        <TouchableOpacity onPress={() =>{onClose()}} style={styles.btnsup}>
            <Text style={styles.btnTextcans}>Annuler</Text>
        </TouchableOpacity>
        </Center>
    </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
    view1: {
        flex: 0,
        justifyContent: 'center',
        padding: 5,
        width:'80%',
        height:'50%',
        margin:'10%',
        marginTop:'40%',
        borderRadius: 15,
        borderWidth:0.2,
        backgroundColor:"white",
      },
      view2:{
        padding: 20,
      },
      inputs:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        
      },
      btnmod:{
        borderWidth:1,
        borderColor:"#FDC100",
        width:100,
        height:42,
        alignItems:'center',
        padding:9,
        marginRight:15,
        borderRadius: 5,
      },
      btnTextmod:{
        color:"#FDC100"
      },
      btncans:{
        borderWidth:1,
        borderColor:"#D0D3D4",
        width:100,
        height:42,
        alignItems:'center',
        padding:9,
        borderRadius: 5
      },
      btnTextcans:{
        color:'#D0D3D4'
      },
      btnsh:{
        flexDirection: "row",
        marginTop:25
      },
      btnsup:{
        borderWidth:1,
        borderColor:"#D0D3D4",
        width:100,
        height:42,
        alignItems:'center',
        padding:9,
        marginTop:15,
        borderRadius: 5
      }
    //   allinputs:{
    //     width:"90%"
    //   },
    });

export default Modifpopup;
