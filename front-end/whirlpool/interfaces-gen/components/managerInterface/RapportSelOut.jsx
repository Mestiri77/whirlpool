import React, { useState } from "react";
import { View, Text, StyleSheet,Image, Button, TouchableOpacity,ScrollView } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import Header from './header';
import Footer from './footer';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import port from '../port'
import { useRoute } from '@react-navigation/native';


function RapportSellOut() {
    const route = useRoute();
    const { month, pdv } = route.params;
    const { adm } = route.params;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [pdvs,setPdvs]=useState('')
    const [references,setReferences]=React.useState([])
    const [sellouts,setSellouts]=React.useState([])
    const [sellRef,setSellRef]=React.useState([])
    const [nbrDventes,setNbrDvents]=React.useState([])
    const [daysBetweenDates, setDaysBetweenDates] = useState([]);
    const WHIRLPOOL_LOGO=require('../../../assets/WHIRLPOOL_LOGO.png')

    console.log(startDate);
    console.log(new Date());

/////////////////////////////////////Functions////////////////////////////////////////
const Fetchallref=async()=>{
    try{
      const response=await axios.get("http://"+port+":3000/api/reference/references")
      setReferences(response.data)
    }catch (error) {
        console.error('Error fetching :', error)
      }
    }
const GetAllSellouts=async()=>{
    try{
        const response=await axios.get("http://"+port+":3000/api/sellout/sellouts")
        setSellouts(response.data)
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
const getPdvs = async (pdv) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/pdvs/getId/${pdv}`);
      setPdvs(response.data);
    } catch (error) {
      console.error('Error fetching pdvs:', error);
    }
  };
const exportToExcel = async () => {
    const data = [
      ["Reference", ...daysBetweenDates], // Première ligne avec les dates
      ...references.map(ref => { // Lignes de données pour chaque référence
        const nbrDVArray = FetchNbrDV(ref.idReference);
        const totalSales = fetchTotalSales(ref.idReference);
        const objectif = FetchObjectif(ref.idReference);
        const percentage = calculatePercentage(totalSales, objectif).percentage + "%";

        return [ref.Referencename, ...nbrDVArray, totalSales, objectif, percentage];
      })
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapport Sell-Out");

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const uri = FileSystem.cacheDirectory + 'rapport_sellout.xlsx';
    await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(uri);
};

React.useEffect(()=>{
    Fetchallref()
    GetAllSellouts()
    GetRefSel()
    getPdvs(pdv)
    const daysArray = calculateDaysBetweenDates(startDate, endDate);
    setDaysBetweenDates(daysArray);
  },[startDate, endDate])
/////////////////////////////////////////////////////////////////////////////////////

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        setStartDate(selectedDate || startDate); 
    };

    const handleEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(false);
        setEndDate(selectedDate || endDate);
    };

    const showStartDatePickerHandler = ()=>{
            return(
                <View style={styles.dateContainer}>
                    <Text>Date Du :</Text>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} >
                    <Text>{startDate.toLocaleDateString('fr-FR')}</Text>
                    </TouchableOpacity>
                    <Text>Au :</Text>
                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)} >
                    <Text>{endDate.toLocaleDateString('fr-FR')}</Text>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    onChange={handleStartDateChange}
                />
            )}
            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    onChange={handleEndDateChange}
                />
            )}
            </View>
            )
    }
    const calculateDaysBetweenDates = (startDate, endDate) => {
        const daysArray = [];
        let currentDate = new Date(startDate);
    
        while (currentDate <= endDate) {
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const formattedDate = `${month}-${day}`;
            console.log(formattedDate, "herr");
            daysArray.push(formattedDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return daysArray;
    };
    const FetchNbrDV = (referenceId) => {
        const nbrDVArray = daysBetweenDates.map(date => {
            const totalNbrV = sellouts.reduce((total, sellout) => {
                const selloutDate = sellout.dateCr.substring(5);  // Assure-toi que sellout.dateCr est dans le format 'YYYY-MM-DD'
    
                if (selloutDate === date) {
                    const match = sellRef.some(elrefsel => 
                        elrefsel.Reference_idReference === referenceId && 
                        elrefsel.Sellout_idSellout === sellout.idSellout
                    );
    
                    if (match) {
                        return total + sellout.nbrV;
                    }
                }
    
                return total;
            }, 0);
    
            return totalNbrV;
        });
    
        return nbrDVArray;
    };
    const FetchObjectif = (referenceId) => {
        const object=references.find(el=>
            el.idReference===referenceId
        )
        return object.objectif
    };
    const fetchSalesByDate = (referenceId, date) => {
        const selloutsByReference = sellRef.filter(elrefsel =>
            elrefsel.Reference_idReference === referenceId
        );
        const selloutsIds = selloutsByReference.map(elrefsel => elrefsel.Sellout_idSellout);

        const sales = sellouts.filter(elsel =>
            selloutsIds.includes(elsel.idSellout) &&
            elsel.dateCr.includes(date) // Vous devrez peut-être adapter cette condition en fonction du format de votre date
        );

        return sales.reduce((total, el) => total + el.nbrV, 0);
    };
    const fetchTotalSales = (referenceId) => {
        let totalSales = 0;

        daysBetweenDates.forEach(date => {
            totalSales += fetchSalesByDate(referenceId, date);
        });

        return totalSales;
    };
    const calculatePercentage = (totalSales, objectif) => {
        let percentage = 0;
        if (objectif !== 0) {
            percentage = ((totalSales / objectif) * 100).toFixed(2);
        }
        let color = '';
        if (percentage >= 80) {
            color = '#5cb85c'; // Vert si le pourcentage est supérieur ou égal à 80%
        } else if (percentage >= 50 && percentage < 80) {
            color = '#f0ad4e'; // Jaune si le pourcentage est entre 50% et 79.99%
        } else {
            color = '#d9534f'; // Rouge si le pourcentage est inférieur à 50%
        }
        return { percentage, color };
    };
   
    const Tableaux = () => {
        return (
            <ScrollView horizontal style={{ marginTop: 2 }}>
            <View style={styles.container2}>
                {/* Première ligne */}
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Reference</Text></View>
                    <View style={styles.cell5}><Text>Ventes</Text></View>
                        {daysBetweenDates.map((item, index) => (
                        // Vérifie si l'élément actuel n'est pas le dernier
                        index !== daysBetweenDates.length - 1 && (
                            <View key={index} style={styles.cell5}>
                                <Text></Text>
                            </View>
                            )
                         ))}
                    <View style={styles.cell3}><Text>Total</Text></View>
                    <View style={styles.cell3}><Text>Objectif</Text></View>
                    <View style={styles.cell3}><Text>%</Text></View>
                </View>

                {/* Deuxième ligne */}
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Jour\Mois</Text></View>
                    {/* Afficher les ventes pour chaque jour */}
                    {daysBetweenDates.map((item, index) => (
                        <View key={index} style={styles.cell}>
                            <Text>{item}</Text>
                        </View>
                    ))}
                      <View style={styles.cell4}><Text></Text></View>
                    <View style={styles.cell4}><Text></Text></View>
                    <View style={styles.cell4}><Text></Text></View>
                </View>

                {/* Dernière ligne */}
                {references.map(el=>(
                <View style={styles.row}>
                    <View style={styles.cell2}><Text style={styles.textcell2}>{el.Referencename}</Text></View>
                    {FetchNbrDV(el.idReference).map((nbrDV, dateIndex) => (
            <View key={dateIndex} style={styles.cell1}>
                <Text>{nbrDV}</Text>
            </View>
        ))}
                        <View style={styles.cell1}><Text>{fetchTotalSales(el.idReference)}</Text></View>
                    <View style={styles.cell1}><Text>{FetchObjectif(el.idReference)}</Text></View>
                    <View style={[styles.cell1, { backgroundColor: calculatePercentage(fetchTotalSales(el.idReference), FetchObjectif(el.idReference)).color }]}>
                    <Text>{calculatePercentage(fetchTotalSales(el.idReference), FetchObjectif(el.idReference)).percentage}%</Text>
                        </View>
                </View>
                ))}
            </View>
        </ScrollView>
        );
      };

    return (
        <NativeBaseProvider>
                  <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />

            <View style={styles.container}>
                <Header />
                <Center flex={1} mt={'-140%'}>
                        <Text style={styles.title}>Rapport Sell-Out</Text>
                    <View style={styles.content}>
                       {showStartDatePickerHandler()}
                    </View>
                </Center>
                <ScrollView style={styles.scrollView}>
                {Tableaux()}
                </ScrollView>
                <Center>
                <TouchableOpacity onPress={() =>{exportToExcel}} style={styles.btns}>
                <Text style={styles.btnText}>Exporter</Text>
                </TouchableOpacity>
                </Center>
                <Footer adm={adm} />
            </View>
        </NativeBaseProvider>
    );
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
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor:'#D0D3D4',
        padding:10,
        width:"100%"
    },
    container2: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#D0D3D4',
        maxWidth:90,
        minWidth:90
    },
    cell1: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0D3D4', 
        borderWidth: 0.5,
        borderColor: 'black',
        maxWidth:90,
        minWidth:90

    },
    cell2: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDC100', 
        borderWidth: 0.5,
        borderColor: 'black',
        maxWidth:90,
        minWidth:90
    },
    cell3: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,  // Bordure seulement en haut
        borderRightWidth:0.5,
        borderLeftWidth:0.5,
        borderColor: '#D0D3D4',
        maxWidth:90,
        minWidth:90
    },
    cell4: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5, 
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        borderColor: '#D0D3D4',
        maxWidth:90,
        minWidth:90
    },
    cell5: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,  // Bordure seulement en haut
        borderColor: '#D0D3D4',
        maxWidth:90,
        minWidth:90
    },
    textcell2: {
        color: 'white',
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
      image12: {
        width: 125,
        height: 95,
        position: "absolute",
        top: 0,
        left: 15,
      },
});

export default RapportSellOut;
