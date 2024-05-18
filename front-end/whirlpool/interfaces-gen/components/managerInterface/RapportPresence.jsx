import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity,ScrollView } from "react-native";
import { NativeBaseProvider, Center,Box,Select,CheckIcon,Slider, Stack} from "native-base";
import Header from './header';
import Footer from './footer';
import DateTimePicker from '@react-native-community/datetimepicker';

function RapportDePresence(){

    const [date, setDate] = useState("");

    const Example = ({text}) => {
        return (
            <Center>
            <Box maxW="400">
              <Select
                selectedValue={date}
                minWidth="100%"
                accessibilityLabel="Choose Service"
                placeholder={text}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setDate(itemValue)}
              >
                <Select.Item label="AM" value="AM" />
                <Select.Item label="PM" value="PM" />
              </Select>
            </Box>
          </Center>
          )
    }
    const Tableaux = () => {
        return (
          <View style={{marginTop:20}}>
            <View style={styles.container2}>
              {/* Première ligne */}
              <View style={styles.row}>
                <View style={styles.cell}><Text>Animatrice</Text></View>
                <View style={styles.cell}><Text>Check in</Text></View>
                <View style={styles.cell}><Text>Check out</Text></View>
                <View style={styles.cell}><Text>Position GPS</Text></View>
              </View>
      
              {/* Deuxième ligne */}
              <View style={styles.row}>
                <View style={styles.cell1}><Text>Donnée 1</Text></View>
                <View style={styles.cell1}><Text style={styles.textcell1}>Donnée 2</Text></View>
                <View style={styles.cell1}><Text>Donnée 3</Text></View>
                <View style={styles.cell1}><Text>Donnée 4</Text></View>
              </View>
            </View>
          </View>
        );
      };

    return(
        <NativeBaseProvider>
            <View style={styles.container}>
            <Header />
            <Center flex={1} mt={'-140%'}>
                <Text style={styles.title}>Rapport De Présence</Text>
                <View style={styles.content}>
                    <Example text={'Time AM/PM'}/>
                </View>
            </Center>
            <ScrollView style={styles.scrollView}>
                {Tableaux()}
                </ScrollView>
                <Center>
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
                <Text style={styles.btnText}>Exporter</Text>
                </TouchableOpacity>
                </Center>
            <Footer />
            </View>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 30,
    },
    container2: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
      },
      cell: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5, 
        borderColor: '#D0D3D4', 
        maxWidth:95,
        minWidth:95
      },
      cell1: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0D3D4', 
        borderWidth: 0.5,
        borderColor: 'black',
        maxWidth:95,
        minWidth:95

    },
    cell2: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDC100', 
        borderWidth: 0.5,
        borderColor: '#D0D3D4',
        maxWidth:95,
        minWidth:95
    },
    cell3: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,  // Bordure seulement en haut
        borderColor: '#D0D3D4',
        maxWidth:95,
        minWidth:95
    },
      totalRow: {
        borderTopWidth: 1,
        borderColor: 'black',
      },
      totalCell: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      textcell2:{
        color: 'white', // Text color
      },
      scrollView: {
        flex: 1,
        padding: 20,
        marginTop:-200
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
})
export default RapportDePresence;