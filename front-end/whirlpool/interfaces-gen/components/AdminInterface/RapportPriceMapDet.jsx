import React, { useState } from "react";
import { View, Text, StyleSheet,Button, PermissionsAndroid, ScrollView, LogBox,TouchableOpacity } from "react-native";
import { NativeBaseProvider, Center,Box,Select,CheckIcon,Slider, Stack} from "native-base";
import Header from './header'
import Footer from './footer'

function RapportPriceMapDet(){
    const [color,setColor]=React.useState('')
    const [onChangeValue, setOnChangeValue] = React.useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);

    const Example = ({text}) => {
        if(text=="Couleur"){


          const Fetchallref=async()=>{
            try{
              const response=await axios.get("http://"+port+":3000/api/reference/references")
              setReferences(response.data)
            }catch (error) {
                console.error('Error fetching :', error)
              }
            }
            const GetRefSel=async()=>{
              try{
                  const response=await axios.get("http://"+port+":3000/api/refsel/ReferenceSel")
                  setSellRef(response.data)
                  console.log(response.data);
              }catch (error) {
                  console.error('Error fetching :', error)
                }
          }
        return (
          <Center>
          <Box maxW="400">
            <Select
              selectedValue={color}
              minWidth="100%"
              accessibilityLabel="Choose Service"
              placeholder={text}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setColor(itemValue)}
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
    else{
        return(
            <Center>
            <Box maxW="400" ml='-300'>
              <Select
                selectedValue={color}
                minWidth="30%"
                
                accessibilityLabel="Choose Service"
                placeholder={text}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setColor(itemValue)}
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
    }
      const ExampleSlider = () => {
        return (
        <Box mr='-5'ml='5' w="100%">
      <Slider w="130" maxW="300" defaultValue={onChangeValue} minValue={0} maxValue={100} accessibilityLabel="hello world"  step={1} 
      onChange={v => {
        setOnChangeValue(Math.floor(v));
      }}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </Box>
        );
    };

    const Tableaux = () => {
        return (
          <View style={{marginTop:20}}>
            <View style={styles.container}>
              {/* Première ligne */}
              <View style={styles.row}>
                <View style={styles.cell}><Text>Marque</Text></View>
                <View style={styles.cell}><Text>References</Text></View>
                <View style={styles.cell}><Text>Capacité</Text></View>
                <View style={styles.cell}><Text>Prix</Text></View>
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
            <ScrollView style={styles.scrollView}>
                <Center>
                    <Text style={styles.title}>Rapports Price Map :</Text>
                    <Example text={'Couleur'} />
                    <View style={styles.row1}>
                        <Text style={styles.label}>Capacité</Text>
                        <Text>{onChangeValue}</Text>
                        <ExampleSlider />
                        <Example text={'Unite'} />
                    </View>
                </Center>
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
 
    scrollView: {
        flex: 1,
        padding: 20,
        marginTop:-550
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 30,
    },
    row1: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 90,
        marginRight:5
    },
    textexpo:{
        fontSize: 15,
        fontWeight: '500',
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
      },
      cell1: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0D3D4', // Background color of the button
        borderWidth: 0.5, 
        borderColor: '#D0D3D4', 
      },
      cell2:{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDC100', // Background color of the button
        borderWidth: 0.5, 
        borderColor: '#D0D3D4',
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
export default RapportPriceMapDet;