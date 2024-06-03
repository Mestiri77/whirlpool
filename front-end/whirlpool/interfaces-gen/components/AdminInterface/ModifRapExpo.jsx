import * as React from "react";
import {FlatList,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity} from "react-native";
import { NativeBaseProvider, Center,Stack,Input,Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";


function Modifpopup({route}) {
  // const { idref, idmarque, idarticle } = route.params;
    const [modif,setModif] = React.useState('');
const [reff,setReff]=React.useState('')
const [marque , setMarque]=React.useState('')
const [article,setArticle]=React.useState('')
    const RenderInput=(text)=>{
        if(text=="Reference"){    
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
              onChangeText={item=>{setModif(item)}}
            />
           
          </Stack>
          )
        }
    else if(text=="Marque") {
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
              onChangeText={item=>setModif(item)}
            />
           
          </Stack>
         )
    }
    else if(text=="Prix") {
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
              onChangeText={item=>setModif(item)}
            />
           
          </Stack>
         )
    }
    }
  return (
    <NativeBaseProvider>
    <View style={styles.view1}>
        <Center><View style={styles.view2}><Text style={{fontWeight:500}}>Modifer Cette Ligne</Text></View></Center>
        <View style={styles.allinputs}>
        {RenderInput('Reference')}
        <View style={styles.inputs}>
        {RenderInput('Marque')}
        {RenderInput('Prix')}
        </View>
        </View>
        <Center>
        <View style={styles.btnsh}>
        <TouchableOpacity onPress={() =>{}} style={styles.btnmod}>
            <Text style={styles.btnTextmod}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{}} style={styles.btncans}>
            <Text style={styles.btnTextcans}>Supprimer</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() =>{}} style={styles.btnsup}>
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
        borderRadius: 5,
        borderWidth:0.2,
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
