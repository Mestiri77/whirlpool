import * as React from "react";
import {FlatList,Alert,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity,} from "react-native";
import { CheckIcon,Input,CloseIcon,HStack,IconButton, Divider,Heading, Button, Select, Box, Center, NativeBaseProvider,Stack, Icon,Skeleton, VStack,} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

function PopupRapport(){
    const [date,setDate]=React.useState(new Date())
    const [pdv,setPdv]=React.useState("")


    const navigation = useNavigation();

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
                <Text style={styles.title}>Rapport</Text>
            <ExampleInput text={'Date :'}/>
                <Example text={'Point De Vente'} setoption={setPdv} option={pdv} />
            <Center ml={"18%"} mt={10}>
            <TouchableOpacity
  onPress={() => navigation.navigate("RapportDePresence", { someProp: 'someValue' })}
  style={styles.btns}
>
  <Text style={styles.btnText}>Verifier</Text>
</TouchableOpacity>

                </Center>
            </View>
        </NativeBaseProvider>

    )
}
const styles = StyleSheet.create({
  view1: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
    paddingHorizontal: 35,
    paddingBottom: 80,
    borderWidth:1,
    borderRadius:15,
    width:"80%",
    height:"40%",
    margin:'10%',
    marginTop:'50%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
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
})
export default PopupRapport;