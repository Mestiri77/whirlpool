import * as React from "react";
import {  View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Alert,CheckIcon,Input,CloseIcon,HStack,IconButton, Divider,Heading, Button, Select, Box, Center, NativeBaseProvider,Stack, Icon,Skeleton, VStack,} from "native-base";
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

  const [alertData, setAlertData] = React.useState({ visible: false, status: '', message: '' });

  const [load, setLoad] = React.useState(false);

  const port = '192.168.218.26';

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
const CreatUser=async(data,showAlert)=>{
  try{
      axios.post("http://"+port+":3000/api/users/creatuser",data)
      console.log("adedd");
      showAlert('success', "Un Nouveau Utilisateur a été créé");
      }catch (error) {
    console.error('Error Update :', error)
    showAlert('error', "Erreur lors de la création de l'utilisateur. Veuillez réessayer plus tard.");

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

const showAlert = (status, message) => {
  setAlertData({ visible: true, status, message });
};

const hideAlert = () => {
  setAlertData({ visible: false, status: '', message: '' });
};

const ExampleAlert = ({ status, message, onClose }) => {
  return (
    <Center flex={1} px="3">
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
    </Center>
  );
};


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
if(text=="Mot De Passe :"){
  return(
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
      secureTextEntry
      isRequired
      isEmpty={item => item.trim().length === 0} 
    />
   
  </Stack>
  )
}
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
              isRequired
              isEmpty={item => item.trim().length === 0} 
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
      await CreatUser(datauser,showAlert);

    } catch (error) {
      console.error('Error in handleCreation:', error);
    }
  };


  return (
    <NativeBaseProvider>
      <View style={styles.view1}>
        <Center flex={1} px="0">
       {alertData.visible && (
          <ExampleAlert
            status={alertData.status}
            message={alertData.message}
            onClose={hideAlert}
          />
        )}
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
