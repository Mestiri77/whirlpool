import * as React from "react";
import { FlatList, ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, Button } from "react-native";
import { Alert, CheckIcon, Input, HStack, Select, IconButton, CloseIcon, VStack, Box, Center, NativeBaseProvider, Stack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import port from '../port';
import Footer from './footer';

const leftimage = require('../../../assets/icons8-right-50.png'); 
const downicon = require('../../../assets/icons8-down-50.png');
const IconRregion = require('../../../assets/region-icon.png');
const ptDv = require('../../../assets/point-de-vente-icon.png');
const refference = require('../../../assets/reference-icon.png');
const categorie = require('../../../assets/category-icon.png');
const marque = require('../../../assets/marque-icon.png');

function Creationpdv() {
  const [alertData, setAlertData] = React.useState({ visible: false, status: '', message: '' });

  const [load, setload] = React.useState(false);  
  const [pdv, setPdv] = React.useState(false);
  const [affanim, setAffanim] = React.useState(false);
  const [categ, setCateg] = React.useState(false);
  const [marque, setMarque] = React.useState(false);
  const [ref, setRef] = React.useState(false);
  const [categs, setCategs] = React.useState([]);
  const [marques, setMarques] = React.useState([]);
  const [nomspdv, setNomspdv] = React.useState([]);
  const [nomsanims, setNomanims] = React.useState([]);

  const [nomsanim, setNomanim] = React.useState('Animatrices');
  const [nompdv, setNompdv] = React.useState("Point de Vente");
  const [nomcateg, setNomcateg] = React.useState('');
  const [nommarq, setNommar] = React.useState('');
  const [nomref, setNomref] = React.useState("");
  const [region, setRegion] = React.useState('Region');

  const [idcateg, setIdcateg] = React.useState(null);
  const [idmarque, setIdmarque] = React.useState(null);
  const [iduser, setIdUser] = React.useState([]);
  const [idpdv, setIdpdv] = React.useState([]);
  const [pdvs, setPdvs] = React.useState([]);
  // const port='192.168.218.26'

  const Regions = ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili", "Kef", "Mahdia", "Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"];

  const Ref = {
    Referencename: nomref,
    Marque_idMarque: idmarque,
    Category_idCategory: idcateg
  };

  const Pdv = {
    pdvname: nompdv,
    location: region
  };
  
  // Fetch functions and other logic...
  
  React.useEffect(() => {
    fetchPdvsname();
    fetchAnimname();
    Fetchallmarq();
    Fetchallcateg();
  }, [load]);

  const ExampleAlert = ({ status, message, onClose }) => {
    return (
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
    );
  };

  const showAlert = (status, message) => {
    setAlertData({ visible: true, status, message });
  };

  const hideAlert = () => {
    setAlertData({ visible: false, status: '', message: '' });
  };

  const affectanim = async (nameanim, namepdv) => {
    let name = '';
    let lastname = '';

    if (nameanim !== "") {
      const parts = nameanim.split(' ');
      name = parts[0];
      lastname = parts[1];
    }

    try {
      const userId = await getIdbyname(name, lastname); // Fetch user ID by name and last name
      const pdvId = await getpdvByname(namepdv); // Fetch PDV ID by name
      console.log(pdvId, userId, 'gooo');
      await updateAnimByPdv(userId, pdvId, showAlert); // Update assuming this function requires userId and pdvId

      console.log('Animateur bien affecté');
    } catch (error) {
      console.error('Error in operation:', error);
    }
  };

  function RowItem({ text, truc, settruc }) {
    return (
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity onPress={() => { settruc(!truc); console.log(truc, text); }}>
          <Image
            resizeMode="contain"
            source={truc ? downicon : leftimage}
            style={styles.leftimage}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const Example = ({ text }) => {
    if (text === 'Point de Vente') {
      return (
        <Center>
          <Box maxW="400">
            <Select
              selectedValue={nompdv}
              minWidth="240"
              accessibilityLabel={nompdv}
              placeholder={nompdv}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={itemValue => setNompdv(itemValue)}
            >
              {nomspdv.map(el => (
                <Select.Item label={el} value={el} />
              ))}
            </Select>
          </Box>
        </Center>
      );
    } else if (text === 'Animatrices') {
      return (
        <Center>
          <Box maxW="400">
            <Select
              selectedValue={nomsanim}
              minWidth="240"
              accessibilityLabel={nomsanim}
              placeholder={nomsanim}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={itemValue => setNomanim(itemValue)}
            >
              {nomsanims.map(el => (
                <Select.Item label={el} value={el} />
              ))}
            </Select>
          </Box>
        </Center>
      );
    } else if (text === "Categories") {
      return (
        <Center>
          <Box maxW="400">
            <Select
              selectedValue={nomcateg}
              minWidth="318"
              accessibilityLabel={nomcateg}
              placeholder={text}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setNomcateg(itemValue);
                const selectedCategory = categs.find(el => el.Categoryname === itemValue);
                setIdcateg(selectedCategory ? selectedCategory.idCategory : null);
              }}
            >
              {categs.map(el => (
                <Select.Item label={el.Categoryname} value={el.Categoryname} />
              ))}
            </Select>
          </Box>
        </Center>
      );
    } else if (text === "Marques") {
      return (
        <Center>
          <Box maxW="400">
            <Select
              selectedValue={nommarq}
              minWidth="318"
              accessibilityLabel={nommarq}
              placeholder="Marque"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setNommar(itemValue);
                const selectedMarque = marques.find(el => el.MarqueName === itemValue);
                setIdmarque(selectedMarque ? selectedMarque.idMarque : null);
              }}
            >
              {marques.map(el => (
                <Select.Item label={el.MarqueName} value={el.MarqueName} />
              ))}
            </Select>
          </Box>
        </Center>
      );
    } else if (text === "Reference") {
      return (
        <View style={styles.view}>
          <Input
            variant="underlined"
            placeholder="Reference"
            style={{ height: 40, margin: 12 }}
            value={nomref}
            onChangeText={setNomref}
          />
        </View>
      );
    } else {
      return (
        <Center>
          <Box maxW="400">
            <Select
              selectedValue={region}
              minWidth="240"
              accessibilityLabel={region}
              placeholder={region}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={itemValue => setRegion(itemValue)}
            >
              {Regions.map(el => (
                <Select.Item label={el} value={el} />
              ))}
            </Select>
          </Box>
        </Center>
      );
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Image source={ptDv} style={styles.image} />
              <RowItem text="Point de Vente" truc={pdv} settruc={setPdv} />
            </View>
            {pdv && <Example text="Point de Vente" />}
          </View>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Image source={leftimage} style={styles.image} />
              <RowItem text="Region" truc={affanim} settruc={setAffanim} />
            </View>
            {affanim && <Example text="Region" />}
          </View>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Image source={IconRregion} style={styles.image} />
              <RowItem text="Animatrices" truc={categ} settruc={setCateg} />
            </View>
            {categ && <Example text="Animatrices" />}
          </View>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Image source={categorie} style={styles.image} />
              <RowItem text="Categories" truc={marque} settruc={setMarque} />
            </View>
            {marque && <Example text="Categories" />}
          </View>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Image source={marque} style={styles.image} />
              <RowItem text="Marques" truc={ref} settruc={setRef} />
            </View>
            {ref && <Example text="Marques" />}
          </View>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Image source={refference} style={styles.image} />
              <RowItem text="Reference" truc={ref} settruc={setRef} />
            </View>
            {ref && <Example text="Reference" />}
          </View>
          {alertData.visible && (
            <ExampleAlert
              status={alertData.status}
              message={alertData.message}
              onClose={hideAlert}
            />
          )}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    padding: 16,
  },
  container: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  leftimage: {
    width: 24,
    height: 24,
  },
  view: {
    marginTop: 16,
  },
});

export default Creationpdv;
