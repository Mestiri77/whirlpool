import * as React from "react";
import {FlatList,Alert,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity,} from "react-native";
import { CheckIcon,Input,CloseIcon,HStack,IconButton, Divider,Heading, Button, Select, Box, Center, NativeBaseProvider,Stack, Icon,Skeleton, VStack,} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "native-base";

import axios from 'axios';

const leftimage = require('../../../assets/icons8-right-50.png'); 

function ConsultationDesRapports(){

    function RowItem({ text,settruc2}) {
        if(settruc2==""){
            return (
                <View style={styles.row}>
                  <Text style={styles.text}>{text}</Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      resizeMode="contain"
                      source={leftimage}
                      style={styles.leftimage}
                    />
                  </TouchableOpacity>
                </View>
              );
        }
        }
return(
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
         <Link to='/RapportExpo'> 
         <RowItem text="Rapport Exposition" settruc2={""} /></Link>
         <Link to='./RapportPriceMap'> <RowItem text="Rapport Price Map" settruc2={""} /></Link>
<Link to='/RapportsSellOut'> <RowItem text="Rapport Sell-Out" settruc2={""} /></Link>
        <Link to='/RapportDePresence'><RowItem text="Rapport De Présence" settruc2={""} /></Link>
         <Link to='/RapportLog'><RowItem text="Rapport Log" settruc2={""} /></Link>
         
          </ScrollView>
          </View>
    
        </View>
    </NativeBaseProvider>


)
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
export default ConsultationDesRapports;