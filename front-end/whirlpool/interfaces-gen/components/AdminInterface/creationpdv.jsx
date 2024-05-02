import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Input, Box, Center, NativeBaseProvider, Button } from "native-base";


const leftimage = require('../../../assets/icons8-right-50.png'); 
const downicon = require('../../../assets/icons8-down-50.png')

function Creationpdv() {
const [pdv,setPdv]=React.useState(false);
const [affanim, setAffanim] = React.useState(false);
const [categ,setCateg] =React.useState(false);
const [marque, setMarque] = React.useState(false);
const [ref,setRef]=React.useState(false)

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
  const renderform =(key)=>{
    if ( pdv) {
      return (
        <View>
        <Center flex={1} px="3">
          <Box alignItems="center">
            <Input mx="3" placeholder="Input" w="100%" />
          </Box>
        </Center>
        <Center flex={1} px="3">
          <Box alignItems="center">
            <Input mx="3" placeholder="Input" w="100%" />
          </Box>
        </Center>
        <Center flex={1} px="3">
            <Box alignItems="center">
          <Button onPress={() => console.log("hello world")}>Click Me</Button>
            </Box>
        </Center>
        </View>
      )
    }
    else if ( affanim){
      return (
      <View>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Input mx="3" placeholder="Input" w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Input mx="3" placeholder="Input" w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
          <Box alignItems="center">
        <Button onPress={() => console.log("hello world")}>Click Me</Button>
          </Box>
      </Center>
      </View>
      )
    }
    else if (categ){
      return (
      <View>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Input mx="3" placeholder="Input" w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
          <Box alignItems="center">
        <Button onPress={() => console.log("hello world")}>Click Me</Button>
          </Box>
      </Center>
      </View>
      )
    }
    else if (marque){
      return (
      <View>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Input mx="3" placeholder="Input" w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
          <Box alignItems="center">
        <Button onPress={() => console.log("hello world")}>Click Me</Button>
          </Box>
      </Center>
      </View>
      )
    }
    else if (ref){
      return (
      <View>
      <Center flex={1} px="3">
        <Box alignItems="center">
          <Input mx="3" placeholder="Input" w="100%" />
        </Box>
      </Center>
      <Center flex={1} px="3">
          <Box alignItems="center">
        <Button onPress={() => console.log("hello world")}>Click Me</Button>
          </Box>
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
        {pdv&&renderform()}
        <RowItem text="Affectation Animatrice" truc={affanim} settruc={setAffanim}/>
        {affanim&&renderform()}
        <RowItem text="Categories" truc={categ} settruc={setCateg}/>
        {categ&&renderform()}
        <RowItem text="Marques"truc={marque} settruc={setMarque} />
        {marque&&renderform()}
        <RowItem text="References" truc={ref} settruc={setRef}/>
        {ref&&renderform()}
      </ScrollView>
      </View>

    </View>
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