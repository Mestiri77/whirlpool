import * as React from "react";
import { Alert, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CheckIcon, Input, Center, Box, NativeBaseProvider, Select } from "native-base";
import axios from "axios";
import Footer from './footer';

function CreationCompte() {
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mdp, setMdp] = React.useState("");
  const [role, setRole] = React.useState("");
  const [pdv, setPdv] = React.useState("");
  const [pdvId, setPdvId] = React.useState("");
  const [nomspdv, setNomspdv] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const port = '192.168.1.6';

  const roles = ["manager", "animatrice"];

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

  const ExampleInput = ({ text, state, setState }) => {
    return (
      <Box alignItems="center" mt={5}>
        <Input
          mx="0"
          placeholder={text}
          w="100%"
          value={state}
          onChangeText={(e) => setState(e)}
        />
      </Box>
    );
  };

  const fetchPdvsname = async () => {
    try {
      const response = await axios.get(`http://${port}:3000/api/pdvs/pdvs`);
      if (response.data && Array.isArray(response.data)) {
        const pdvNames = response.data.map((pdv) => pdv.pdvname);
        setNomspdv(pdvNames);
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching PDVs:', error);
      Alert.alert("Error", "Failed to fetch PDVs. Please check your network connection.");
    }
  };

  const fetchId = async (pdvName) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/pdvs/getId/${pdvName}`);
      setPdvId(response.data.idPDV); 
    } catch (error) {
      console.error('Error fetching PDV ID:', error);
      Alert.alert("Error", "Failed to fetch PDV ID. Please try again.");
    }
  };

  const handleCreateAccount = async () => {
    if (!nom || !prenom || !email || !mdp || !role || !pdv) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const user = {
      nom,
      prenom,
      email,
      mdp,
      role,
      PDV_idPDV: pdvId
    };

    try {
      await axios.post(`http://${port}:3000/auth/registerAnim`, user);
      setLoad(!load);
      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      Alert.alert("Error", "Failed to create account. Please check your input and try again.");
    }
  };

  React.useEffect(() => {
    fetchPdvsname();
  }, [load]);

  return (
    <NativeBaseProvider>
      <View style={styles.view1}>
        <Center flex={1} px="0">
          <Text style={styles.text1}>Creation De Compte</Text>
          <ExampleInput text={"Nom :"} state={nom} setState={setNom} />
          <ExampleInput text={"Prenom :"} state={prenom} setState={setPrenom} />
          <ExampleInput text={"Email :"} state={email} setState={setEmail} />
          <ExampleInput text={"Mot De Passe :"} state={mdp} setState={setMdp} />
          <Example text={'Role :'} setoption={setRole} option={role} options={roles} />
          <Example text={'Point de vente :'} setoption={setPdv} option={pdv} options={nomspdv} />
        </Center>
      </View>
      <Center>
        <TouchableOpacity onPress={handleCreateAccount} style={styles.btns}>
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
