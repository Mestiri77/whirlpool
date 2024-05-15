import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity,ScrollView } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import Header from './header';
import Footer from './footer';
import DateTimePicker from '@react-native-community/datetimepicker';

function RapportSellOut() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    console.log(startDate);
    console.log(new Date());
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
    const data = [
        { jourMois: "01/05", ventes: 100 },
        { jourMois: "02/05", ventes: 120 },
        { jourMois: "03/05", ventes: 90 },
        // Ajoutez plus de données pour chaque jour au besoin
    ];
    const Tableaux = () => {
        return (
            <ScrollView horizontal style={{ marginTop: 2 }}>
            <View style={styles.container2}>
                {/* Première ligne */}
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Reference</Text></View>
                    <View style={styles.cell3}><Text>Ventes</Text></View>
                        {data.map((item, index) => (
                        // Vérifie si l'élément actuel n'est pas le dernier
                        index !== data.length - 1 && (
                            <View key={index} style={styles.cell3}>
                                <Text></Text>
                            </View>
                            )
                         ))}
                    <View style={styles.cell}><Text>Total</Text></View>
                    <View style={styles.cell}><Text>Objectif</Text></View>
                    <View style={styles.cell}><Text>%</Text></View>
                </View>

                {/* Deuxième ligne */}
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Jour\Mois</Text></View>
                    {/* Afficher les ventes pour chaque jour */}
                    {data.map((item, index) => (
                        <View key={index} style={styles.cell}>
                            <Text>{item.jourMois}</Text>
                        </View>
                    ))}
                      <View style={styles.cell}><Text>Total</Text></View>
                    <View style={styles.cell}><Text>Objectif</Text></View>
                    <View style={styles.cell}><Text>%</Text></View>
                </View>

                {/* Dernière ligne */}
                <View style={styles.row}>
                    <View style={styles.cell2}><Text style={styles.textcell2}>exmpReference</Text></View>
                    {data.map((item, index) => (
                        <View key={index} style={styles.cell1}>
                            <Text>{item.ventes}</Text>
                        </View>
                    ))}
                        <View style={styles.cell1}><Text>Donnée 3</Text></View>
                    <View style={styles.cell1}><Text>Donnée 3</Text></View>
                    <View style={styles.cell1}><Text>Donnée 4</Text></View>
                </View>
            </View>
        </ScrollView>
        );
      };

    return (
        <NativeBaseProvider>
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
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
                <Text style={styles.btnText}>Exporter</Text>
                </TouchableOpacity>
                </Center>
                <Footer />
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
        borderColor: '#D0D3D4',
        maxWidth:90,
        minWidth:90
    },
    cell3: {
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
});

export default RapportSellOut;
