import * as React from "react";
import { Alert, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CheckIcon,Input,CloseIcon,HStack,IconButton, Divider,Heading, Button, Select, Box, Center, NativeBaseProvider,Stack, Icon,Skeleton, VStack,} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Footer from './footer';

function CreationCompte() {
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mdp, setMdp] = React.useState("");
  const [role, setRole] = React.useState("");
  const [pdv, setPdv] = React.useState("");
  const [pdvs, setPdvs] = React.useState("");
  const [idpdvs, setIdpdvs] = React.useState(null);
  const [nomspdv, setNomspdv] = React.useState([]);
  const [load, setLoad] = React.useState(false);

  const port = '192.168.1.26';

  const roles = ["manager", "animatrice","admin"];
  const datauser={ 
    name:nom,
    lastname:prenom,
    email:email,
    password:mdp,
    role:role,
    PDV_idPDV:idpdvs,
     }
/////////////////////////////Functions///////////////////////////
const CreatUser=async(data)=>{
  try{
      axios.post("http://"+port+":3000/api/users/creatuser",data)
      console.log("adedd");
  }catch (error) {
    console.error('Error Update :', error)
  }
}
const fetchPdvsname = async () => {
  try {
    const response = await axios.get(`http://${port}:3000/api/pdvs/pdvs`);
    const pdvNames = response.data.map(pdv => pdv.pdvname);
    setPdvs(response.data)
    setNomspdv(pdvNames);
  } catch (error) {
    console.error('Error fetching PDVs:', error)
  }
}

React.useEffect(() => {
  fetchPdvsname()
}, []);
////////////////////////////////////////////////////////////////



  const Example = ({ text, setoption, option, options }) => {
    return (
      <Center>
        <Box maxW="400" mt={5}>
          <Select
            selectedValue={option}
            minWidth="100%"
            accessibilityLabel={`Choose ${text}`}
            placeholder={text}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setoption(itemValue);
              if (text === 'Point de vente :') fetchId(itemValue);
            }}
          >
            {options.map((item, index) => (
              <Select.Item key={index} label={item} value={item} />
            ))}
          </Select>
        </Box>
      </Center>
    );
  };

  const RenderInput = (text,setState) => {

    return (
      <Stack space={4} w="100%" alignItems="center" mt="5%">
            <Input 
              w={{
                base: "100%",
                md: "25%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder={text}
              onChangeText={item=>setState(item)}
            />
           
          </Stack>
    );
  };

  const findId = (data, name, dataname, idname) => {
    return new Promise((resolve, reject) => {
      const element = data.find(el => el[dataname] === name);
      if (element) {
        resolve(element[idname]);
      } else {
        reject(`No element found with ${dataname} = ${name}`);
      }
    });
  };

  const handleCreation = async () => {
    try {
      if (role === "animatrice") {
        const pdvId = await findId(pdvs, pdv, 'pdvname', 'idPDV');
        setIdpdvs(pdvId);
        datauser.PDV_idPDV = pdvId;
      }
      await CreatUser(datauser);
    } catch (error) {
      console.error('Error in handleCreation:', error);
    }
  };


  return (
    <NativeBaseProvider>
      <View style={styles.view1}>
        <Center flex={1} px="0">
          <Text style={styles.text1}>Creation De Compte</Text>
          {RenderInput("Nom :",setNom)}
          {RenderInput("Prenom :",setPrenom)}
          {RenderInput("Email :",setEmail)}
          {RenderInput("Mot De Passe :",setMdp)}
          <Example text={'Role :'} setoption={setRole} option={role} options={roles} />
          {role=="animatrice"&&<Example text={'Point de Vente'} setoption={setPdv} option={pdv} options={nomspdv} />}
        </Center>
      </View>
      <Center>
        <TouchableOpacity onPress={()=>handleCreation()} style={styles.btns}>
          <Text style={styles.btnText}>créé</Text>
        </TouchableOpacity>
      </Center>
      <Footer />
    </NativeBaseProvider>
  );
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
  text1: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  btns: {
    backgroundColor: '#FDC100',
    padding: 10,
    borderRadius: 5,
    width: 150,
    marginTop: "5%",
    marginBottom: '10%',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center"
  },
});

export default CreationCompte;
