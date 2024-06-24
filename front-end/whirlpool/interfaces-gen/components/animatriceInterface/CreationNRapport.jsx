import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Input, Select, Box, Center, NativeBaseProvider, ScrollView } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import Header from './header';
import Footer from './footer';

import { useNavigation,useRoute } from '@react-navigation/native';

const downicon = require('../../../assets/icons8-down-50.png');

function CreationNRapport() {

  const route = useRoute();
  const { ani } = route.params;

  const [marque,setMarque]  = React.useState("");
  const [categ,setCateg]= React.useState("");
  const [Ref, setRef] = React.useState("");
  const [prix,setPrix] = React.useState("");
  const [capacite,setCapacite]= React.useState("");
  const [unite,setUnite]= React.useState("");
  const [couleur,setCouleur] = React.useState("");

  function RowItem({ text, settruc2 }) {
    if (settruc2 == "") {
      return (
        <View style={styles.row}>
          <Text style={styles.text}>{text}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Image
              resizeMode="contain"
              source={downicon}
              style={styles.leftimage}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  const RenderInput = (placeholder) => {
    if(placeholder=="Capacité"){
        return(
            <Center mt={3} ml={'26%'}>
        <Input
          w="290%"
          InputLeftElement={
            <MaterialIcons name="person" size={24} color="black" style={{ marginLeft: 2 }} />
          }
          placeholder={placeholder}
          onChangeText={(text) => setRef(text)}
        />
      </Center>
        )
    }
    return (
      <Center mt={3}>
        <Input
          w="75%"
          InputLeftElement={
            <MaterialIcons name="person" size={24} color="black" style={{ marginLeft: 2 }} />
          }
          placeholder={placeholder}
          onChangeText={(text) => setRef(text)}
        />
      </Center>
    );
  };

  const Example = ({ text }) => {
    if(text=="unités"){
      return  <Center>
        <Box maxW="150" mt={3}mr={12}>
          <Select
            selectedValue={Ref}
            minWidth="100"
            accessibilityLabel={text}
            placeholder={text}
            onValueChange={(itemValue) => setRef(itemValue)}
          >
            <Select.Item label="aaaaa" value="aaaaa" />
            <Select.Item label="aaaaa" value="aaaaa" />
            <Select.Item label="aaaaa" value="aaaaa" />
          </Select>
        </Box>
      </Center>
    }
    else{

        return (
          <Center>
            <Box maxW="400" mt={3}>
              <Select
                selectedValue={Ref}
                minWidth="280"
                accessibilityLabel={text}
                placeholder={text}
                onValueChange={(itemValue) => setRef(itemValue)}
              >
                <Select.Item label="aaaaa" value="aaaaa" />
                <Select.Item label="aaaaa" value="aaaaa" />
                <Select.Item label="aaaaa" value="aaaaa" />
              </Select>
            </Box>
          </Center>
        );
    }
  };

  return (
    <NativeBaseProvider>
      <Header />
      <View style={styles.container}>
        <RowItem text="Créer un nouveau rapport" settruc2={""} />
        <ScrollView style={{marginTop:40}}>
        {RenderInput("Marque")}
        <Example text={'Categories'} />
        <Example text={'Références'} />
        {RenderInput("Prix")}
        <View style={styles.doubleInput}>
          {RenderInput("Capacité")}
          <Example text={'unités'} />
        </View>
        <Example text={'Couleur'} />
        </ScrollView>
        <TouchableOpacity onPress={() => {}} style={styles.btns}>
          <Text style={styles.btnText}>Valider</Text>
        </TouchableOpacity>
      </View>
      <Footer ani={ani} />
      </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 80,
    marginTop:-550
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  leftimage: {
    width: 30,
    height: 30,
  },
  doubleInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btns: {
    backgroundColor: '#FDC100',
    padding: 10,
    borderRadius: 5,
    width: 150,
    marginTop: "5%",
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center",
  },
});

export default CreationNRapport;
