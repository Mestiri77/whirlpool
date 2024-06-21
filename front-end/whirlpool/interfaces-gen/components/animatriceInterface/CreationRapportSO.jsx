import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Select, Box, Center, NativeBaseProvider } from "native-base";
import axios from 'axios';
import port from '../port';

import Header from './header';
import Footer from './footer';

function CreationRapportSO() {
    const [load, setLoad] = useState(false);
    const [categ, setCateg] = useState("");
    const [city, setCity] = useState("");
    const [categories, setCategories] = useState([]);
    const [references, setReferences] = useState([]);
    const [sales, setSales] = useState({});

    console.log(sales);

    const fetchAllCateg = async () => {
        try {
            const response = await axios.get("http://" + port + ":3000/api/categories/categorie");
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchRefByCatg = async (id) => {
        if (!id) return;  // Do nothing if no category ID
        try {
            const response = await axios.get(`http://${port}:3000/api/reference/referencebycateg/${id}`);
            console.log(response.data);
            setReferences(response.data);
            const initialSales = response.data.reduce((acc, ref) => {
                acc[ref.idReference] = { name: ref.Referencename, sales: 0 };
                return acc;
            }, {});
            setSales(initialSales);
        } catch (error) {
            console.error('Error fetching references:', error);
        }
    };

    useEffect(() => {
        fetchAllCateg();
    }, [load]);

    useEffect(() => {
        const fetchReferencesForCategory = async () => {
            const categoryId = await findId(categories, categ, 'Categoryname', 'idCategory');
            fetchRefByCatg(categoryId);
        };

        if (categ) {
            fetchReferencesForCategory();
        }
    }, [categ, categories]);

    const handleCityChange = (newCity) => {
        setCity(newCity);
    };

    const handleReferenceClick = async (refId) => {
        setSales((prevSales) => ({
            ...prevSales,
            [refId]: { ...prevSales[refId], sales: prevSales[refId].sales + 1 }
        }));

        try {
            await handleSelloutCreationorUpdate(refId, sales[refId].sales + 1);
        } catch (error) {
            console.error('Error updating sales:', error);
        }
    };

    const handleCorrigerClick = async (refId) => {
        setSales((prevSales) => ({
            ...prevSales,
            [refId]: { ...prevSales[refId], sales: prevSales[refId].sales > 0 ? prevSales[refId].sales - 1 : 0 }
        }));

        try {
            await handleSelloutCreationorUpdate(refId, sales[refId].sales > 0 ? sales[refId].sales - 1 : 0);
        } catch (error) {
            console.error('Error updating sales:', error);
        }
    };

    const findId = (data, name, dataname, idname) => {
        return new Promise((resolve, reject) => {
            const element = data.find(el => el[dataname] === name);
            if (element) {
                resolve(element[idname]);
            } else {
                reject(`No element found with ${dataname} = ${name}`);
            }
        });
    };

    const handleSelloutCreationorUpdate = async (idref, updatedSales) => {
        try {
            // Obtenir tous les Ref-Sel existants
            const allrefsel = await axios.get(`http://${port}:3000/api/refsel/ReferenceSel`);
            const todayDate = new Date().toISOString().split('T')[0];

            let existingRefSel = allrefsel.data.find(el => el.Reference_idReference === idref && el.createdAt.split('T')[0] === todayDate);

            if (existingRefSel) {
                // Mettre à jour le sellout existant
                await axios.put(`http://${port}:3000/api/sellout/sellouts/${existingRefSel.Sellout_idSellout}`, { nbrV: updatedSales });
            } else {
                // Créer un nouveau sellout
                const selloutData = { dateCr: todayDate, nbrV: updatedSales };
                const selloutcreate = await axios.post(`http://${port}:3000/api/sellout/sellouts`, selloutData);
                const selloutId = selloutcreate.data.idSellout;

                // Créer une nouvelle entrée Reference_has_Sellout
                await axios.post(`http://${port}:3000/api/refsel/creatRefSel`, {
                    Reference_idReference: idref,
                    Sellout_idSellout: selloutId
                });
            }
        } catch (error) {
            console.error('Error creating or updating sellout:', error);
            // Gérez les erreurs et affichez un message à l'utilisateur si nécessaire
        }
    };

    const Table = () => {
        return (
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerCell}>References</Text>
                    <Text style={styles.headerCell}>Ventes</Text>
                    <Text style={styles.headerCell}>Corriger</Text>
                </View>
                <ScrollView>
                    {references.map((item, index) => (
                        <View style={styles.row} key={index}>
                            <TouchableOpacity style={styles.cell1} onPress={() => handleReferenceClick(item.idReference)}>
                                <Text style={styles.textcell1}>{item.Referencename}</Text>
                            </TouchableOpacity>
                            <View style={styles.cell}>
                                <Text style={styles.textcell}>{sales[item.idReference] ? sales[item.idReference].sales : 0}</Text>
                            </View>
                            <TouchableOpacity style={styles.cell1} onPress={() => handleCorrigerClick(item.idReference)}>
                                <Text style={styles.textcell1}>Corriger</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    };

    const Example = ({ text }) => {
        return (
            <Center>
                <Box maxW="400" mt={3}>
                    <Select
                        selectedValue={categ}
                        minWidth="280"
                        accessibilityLabel={text}
                        placeholder={text}
                        onValueChange={(itemValue) => setCateg(itemValue)}
                    >
                        {categories.map(el => (
                            <Select.Item label={el.Categoryname} value={el.Categoryname} key={el.idCategory} />
                        ))}
                    </Select>
                </Box>
            </Center>
        );
    };

    return (
        <NativeBaseProvider>
            <Header onCityChange={handleCityChange} />
            <View style={styles.container}>
                <Example text={'Categories'} />
                <Table />
                <TouchableOpacity style={styles.btns}>
                    <Text style={styles.btnText}>Valider</Text>
                </TouchableOpacity>
            </View>
            <Footer />
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
        marginTop: -550
    },
    tableContainer: {
        marginTop: -50,
        width: '100%'
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerCell: {
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: 'bold',
        margin: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
        width: '30%',
        borderRadius: 5
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: '#D0D3D4',
        borderRadius: 5,
        padding: 8,
        margin: 2
    },
    cell1: {
        flex: 1,
        borderRadius: 5,
        padding: 8,
        backgroundColor: '#FDC100',
        margin: 2
    },
    textcell1: {
        color: 'white',
        padding: 5,
        textAlign: 'center',
        fontSize: 16
    },
    textcell: {
        padding: 5,
        textAlign: 'center',
        fontSize: 16
    },
    btns: {
        backgroundColor: '#FDC100',
        padding: 10,
        borderRadius: 5,
        width: 150,
        marginTop: "5%",
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        textAlign: "center"
    },
});

export default CreationRapportSO;
