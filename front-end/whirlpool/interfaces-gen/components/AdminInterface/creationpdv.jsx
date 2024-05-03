import * as React from "react";
import {FlatList,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity,Button} from "react-native";
import { CheckIcon,Input,  Select, Box, Center, NativeBaseProvider,Stack, Icon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';


const leftimage = require('../../../assets/icons8-right-50.png'); 
const downicon = require('../../../assets/icons8-down-50.png')

function Creationpdv() {
const [pdv,setPdv]=React.useState(false);
const [affanim, setAffanim] = React.useState(false);
const [categ,setCateg] =React.useState(false);
const [marque, setMarque] = React.useState(false);
const [ref,setRef]=React.useState(false)
const [nomspdv,setNomspdv]=React.useState([]);
const [nompdv,setNompdv]=React.useState("");
const [nomcateg,setNomcateg]=React.useState('')
const [nommarq,setNommar]=React.useState('')
const [nomref,setNomref]=React.useState("")
const [pdvs, setPdvs] = React.useState([]);


const fetchPdvsname = async () => {
  try {
    const response = await axios.get('http://192.168.1.18:3000/api/pdvs/pdvs');
    const pdvNames = response.data.map(pdv => pdv.pdvname);
    setNomspdv(pdvNames);
    console.log(pdvNames);
  } catch (error) {
    console.error('Error fetching PDVs:', error)
  }
}

React.useEffect(()=>{
  fetchPdvsname();
},[])

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
  const Example = ({text}) => {
    const [service, setService] = React.useState(""); // Use useState from React
    if(text=='Point de Vente'){
      return (
        <Center>
          <Box maxW="400">
            <Select
              selectedValue={service}
              minWidth="240"
              accessibilityLabel={text}
              placeholder= {text}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={itemValue => setService(itemValue)}
            >
            {nomspdv.map(el=>{
              return(
              <Select.Item label={el} value={el} />
            )
            })}
  
            </Select>
          </Box>
        </Center>
      );
    }
    return (
      <Center>
        <Box maxW="400">
          <Select
            selectedValue={service}
            minWidth="240"
            accessibilityLabel={text}
            placeholder= {text}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
            mt={1}
            onValueChange={itemValue => setService(itemValue)}
          >
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />

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
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder="Point de vente" 
            />
           
          </Stack>
        <Example text="Region" />
        <TouchableOpacity onPress={() => console.log('Button Pressed!')} style={styles.btns}>
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
      <Example text="Animatrice" />
      </Center>
      <Center flex={1} px="3">
          <TouchableOpacity onPress={() => console.log('Button Pressed!')} style={styles.btns}>
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
          <Input mx="3" placeholder="Input" w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
      <TouchableOpacity onPress={() => console.log('Button Pressed!')} style={styles.btns}>
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
          <Input mx="3" placeholder="Input" w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
      <TouchableOpacity onPress={() => console.log('Button Pressed!')} style={styles.btns}>
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
          <Input mx="3" placeholder="Input" w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
      <TouchableOpacity onPress={() => console.log('Button Pressed!')} style={styles.btns}>
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