import * as React from "react";
import { View, Text,Image, StyleSheet,TouchableOpacity } from "react-native";
import { Checkbox, Center, NativeBaseProvider } from "native-base";

function PopupCheckBox() {
    const [groupValues, setGroupValues] = React.useState([]);
    const WHIRLPOOL_LOGO=require('../../../assets/WHIRLPOOL_LOGO.png')

  const Example = () => {
    return (
      <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
        <Checkbox value="one" my={2}>
          Nouvelle Marque
        </Checkbox>
        <Checkbox value="two" my={2}>
          Nouvelle Categorie
        </Checkbox>
        <Checkbox value="three" my={2}>
          Nouvelle Référence
        </Checkbox>
        <Checkbox value="four" my={2}>
          Nouvelle Couleur
        </Checkbox>
      </Checkbox.Group>
    );
  };

  return (
    <NativeBaseProvider>
            <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />
      <View style={styles.container}>
        <Text style={styles.title}>Check Box</Text>
        <Center flex={1} px="3">
          <Example />
        </Center>
        <Center mt={0}>
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
                <Text style={styles.btnText}>Verifier</Text>
                </TouchableOpacity>
                </Center>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin:'20%',
    marginTop:'55%',
    width:"60%",
    minHeight:200,
    maxHeight:450,
    borderWidth:1,
    borderRadius:15
  },
  image12: {
    width: 125,
    height: 95,
    position: "absolute",
    top: 0,
    left: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
  },
  btns: {
    backgroundColor: 'white', // Background color of the button
    padding: 10,
    borderRadius: 5,
    width:150,
    marginTop:"0%",
    marginBottom:'10%',
    alignItems: 'center',
    borderWidth:1.5,
    borderColor:'#FDC100',
  },
  btnText: {
    color: '#FDC100', // Text color
    fontSize: 16,
    textAlign:"center"
  },
});

export default PopupCheckBox;
