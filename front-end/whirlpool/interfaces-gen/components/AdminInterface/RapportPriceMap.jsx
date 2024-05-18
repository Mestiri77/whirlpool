import React, { useState } from "react";
import { View, Text, StyleSheet,Button, PermissionsAndroid, ScrollView, LogBox,TouchableOpacity } from "react-native";
import { NativeBaseProvider, Center,Box,Select,CheckIcon} from "native-base";
import Header from './header'
import Footer from './footer'
import axios from 'axios'

function RapportPriceMap(){

  const [load,setLoad]=React.useState(false)

  const [pdvs,setPdvs]=React.useState([])
  const [categ,setCateg]=React.useState([])

  const [pdv,setPdv]=React.useState('')
  const [pdvsel,setPdvsel]=React.useState('')

  const port='192.168.1.26'

///////////////////////////////Functions//////////////////////////////

const getAllPdvs=async()=>{
  try{
    let response=await axios.get("http://"+port+":3000/api/pdvs/pdvs")
    setPdvs(response.data)
  }
  catch (error) {
    console.error('Error fetching PDVs:', error)
  }
}
const Fetchallcateg=async()=>{
  try{
    const response=await axios.get("http://"+port+":3000/api/categories/categories")
    console.log(response.data);
    setCateg(response.data)
  }
  catch (error) {
    console.error('Error fetching :', error)
  }
}

React.useEffect(()=>{
  getAllPdvs()
  Fetchallcateg()
},[])
/////////////////////////////////////////////////////////////////////

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

return(
    <NativeBaseProvider>
        <View style={styles.view1}>
        <Header />  
        <Center flex={8}>
            <Text style={{fontSize:18,fontWeight:600,marginBottom:30}}> Rapports Price Map : </Text>
            <View >
        <Example text={"Date :"}/>
        <Example text={"Point de Vente :"}/>
        </View>
        <View style={styles.categtext} ><Text style={{fontSize:18,fontWeight:300}}>Categories</Text></View>
        <ScrollView style={styles.viewbtns}>
            <View  >
              {categ.map(el=>(
                <TouchableOpacity style={styles.btns}>
                <Text style={styles.btnText}>{el.Categoryname}</Text>
               </TouchableOpacity>
              ))}
            </View>
        </ScrollView>
        </Center>
        </View>
        <Footer/>
    </NativeBaseProvider>
)

}
const styles = StyleSheet.create({
    view1: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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