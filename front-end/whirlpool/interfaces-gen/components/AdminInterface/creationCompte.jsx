import * as React from "react";
import {FlatList,Alert,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity,} from "react-native";
import { CheckIcon,Input,CloseIcon,HStack,IconButton, Divider,Heading, Button, Select, Box, Center, NativeBaseProvider,Stack, Icon,Skeleton, VStack,} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Footer from './footer';

function CreationCompte(){
  const [nom,setNom]=React.useState("")
  const [prenom,setPrenom]=React.useState("")
  const [email,setEmail]=React.useState("")
  const [numero,setNumero]=React.useState("")
  const [mdp,setMdp]=React.useState("")
  const [role,setRole]=React.useState("")
  const [pdv,setPdv]=React.useState("")


  const Example = ({text ,setoption,option}) => {

    return (
      <Center>
      <Box maxW="400" mt={5}>
        <Select
          selectedValue={option}
          minWidth="100%"
          accessibilityLabel="Choose Service"
          placeholder={text}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setoption(itemValue)}
        >
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
      </Box>
    </Center>
    )
  }
  const ExampleInput = ({text}) => {
    return(
      
        <Box alignItems="center" mt={5}>
          <Input mx="0" placeholder={text} w="100%" />
        </Box>
)
      ;
  };

  return(
    <NativeBaseProvider>
      <View style={styles.view1}>
      <Center flex={1} px="0">
        <Text style={styles.text1}>Creation De Compte</Text>
        <ExampleInput text={'Nom :'}/>
        <ExampleInput text={'Prenom :'}/>
        <ExampleInput text={'Email :'}/>
        <ExampleInput text={'Mot De Passe :'}/>
        <ExampleInput text={'Numero :'}/>
        <Example text={'Role :'} setoption={setRole} option={role} />
        <Example text={'Role :'} setoption={setPdv} option={pdv} />
      </Center>
      </View>
      <Center>
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
                <Text style={styles.btnText}>Exporter</Text>
                </TouchableOpacity>
                </Center>
                <Footer />
    </NativeBaseProvider>
  )
}
const styles = StyleSheet.create({
  view1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 39,
    paddingHorizontal: 35,
    paddingBottom: 80,
  },
  text1:{
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  btns: {
    backgroundColor: '#FDC100', // Background color of the button
    padding: 10,
    borderRadius: 5,
    width:150,
    marginTop:"5%",
    marginBottom:'10%',
    alignItems: 'center',
  },
  btnText: {
    color: 'white', // Text color
    fontSize: 16,
    textAlign:"center"
  },
});
export default CreationCompte;