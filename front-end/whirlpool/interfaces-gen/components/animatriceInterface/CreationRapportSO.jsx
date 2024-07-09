import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Select, Box, Center, NativeBaseProvider, Modal, Button } from "native-base";
import axios from 'axios';
import port from '../port';
import Toast from 'react-native-simple-toast';
import Header from './header';
import Footer from './footer';
import { useRoute } from '@react-navigation/native';

function CreationRapportSO() {
    console.disableYellowBox = true; // Pour masquer tous les avertissements jaunes

    const route = useRoute();
    const { ani } = route.params;

    const [load,setLoad]=useState(true)
    const [city,setCity]= React.useState("");

    const [categ, setCateg] = useState("");
    const [categories, setCategories] = useState([]);
    const [references, setReferences] = useState([]);
    const [article, setArticle]=useState([]);
    const [couleurs,setCouleurs]=useState([]);
    const [capacites,setCapacites]=useState([]);

    const [sales, setSales] = useState({});

    const [couleur, setCouleur]=useState("")
    const [capacitee,setCapacitee]=useState(null)

    const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
    const [modalVisibleSup, setModalVisibleSup] = useState(false);

    const [selectedReferenceId, setSelectedReferenceId] = useState(null);
    const WHIRLPOOL_LOGO = require('../../../assets/WHIRLPOOL_LOGO.png');



    const handleCityChange = (newCity) => {
        setCity(newCity);
      };
    const  fetchallArticle=async (id)=>{
        try{
            const response = await axios.get("http://"+port+":3000/api/articles/articles")
            const articles = response.data;
            console.log("idd",id);
            const couleurs = articles.map(article =>{
                if(article.Reference_idReference===id){
                    return article.coloeur
                }
            });
            const capacites = articles.map(article =>{
                if(article.Reference_idReference===id){
                    return article.capacite
                }
            });

            setArticle(response.data);
            setCouleurs(couleurs)
            setCapacites(capacites)
            
            console.log(couleurs,capacites);
        }
        catch (error) {
            console.error('Error fetching Article:', error);
        }
    }

    const fetchAllCateg = async () => {
        try {
            const response = await axios.get(`http://${port}:3000/api/categories/categorie`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const fetchRefByCatg = async (id) => {
        if (!id) return;
        try {
            const response = await axios.get(`http://${port}:3000/api/reference/referencebycateg/${id}`);
            setReferences(response.data);
            const initialSales = response.data.reduce((acc, ref) => {
                acc[ref.idReference] = { name: ref.Referencename, sales: 0, idarticles: null };
                return acc;
            }, {});
            setSales(initialSales);
            await fetchExistingSales(response.data, initialSales);
        } catch (error) {
            console.error('Error fetching references:', error);
        }
    };

    const fetchExistingSales = async (references, initialSales) => {
        try {
            const selloutResponse = await axios.get(`http://${port}:3000/api/sellout/sellouts`);
            const refselResponse = await axios.get(`http://${port}:3000/api/refsel/ReferenceSel`);
            const todayDate = new Date().toISOString().split('T')[0];

            const existingSales = selloutResponse.data.filter(sellout => sellout.PDV_idPDV === ani.PDV_idPDV && sellout.dateCr.split('T')[0] === todayDate);
            const salesMap = references.reduce((acc, ref) => {
                const refSellouts = refselResponse.data.filter(refsel => refsel.Reference_idReference === ref.idReference);
                const totalSales = refSellouts.reduce((sum, refsel) => {
                    const sellout = existingSales.find(sellout => sellout.idSellout === refsel.Sellout_idSellout);
                    return sellout ? sum + sellout.nbrV : sum;
                }, 0);
                acc[ref.idReference] = { ...initialSales[ref.idReference], sales: totalSales, idarticles: null };
                return acc;
            }, { ...initialSales });

            setSales(salesMap);
        } catch (error) {
            console.error('Error fetching existing sales:', error);
        }
    };

    useEffect(() => {
        fetchAllCateg();
        fetchallArticle(selectedReferenceId)
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

    const handleReferenceClick = async (refId) => {
        setSelectedReferenceId(refId);
        setModalVisibleAdd(true);
        setLoad(!load)
    };
    const handleReferenceSupClick = async (refId) => {
        setSelectedReferenceId(refId);
        setModalVisibleSup(true);
        setLoad(!load)
    };

    const confirmIncrement = async () => {
        try {
            if (!couleur || !capacitee) {
                Toast.show("remplire tou les champ svp.", Toast.LONG);
                return;
            }
            
            if (selectedReferenceId !== null) {
                const response = await axios.post(`http://${port}:3000/api/articles/arcticlebyCC/${selectedReferenceId}`, {
                    couleur: couleur,
                    capacite: capacitee
                });
                const articleId = response.data.idArticle;
                const existingSales = sales[selectedReferenceId]?.articles?.[articleId]?.sales || 0;
                const updatedSales = existingSales + 1;

                await handleSelloutCreationorUpdate(selectedReferenceId, updatedSales, articleId,"add");

                setSales(prevSales => ({
                    ...prevSales,
                    [selectedReferenceId]: {
                        ...prevSales[selectedReferenceId],
                        articles: {
                            ...prevSales[selectedReferenceId]?.articles,
                            [articleId]: {
                                ...prevSales[selectedReferenceId]?.articles?.[articleId],
                                sales: updatedSales,
                                couleur: couleur,
                                capacite: capacitee
                            }
                        }
                    }
                }));
                Toast.show("Ajout avec succès!", Toast.SHORT);
                setModalVisibleAdd(false); // Cacher le modal après validation
                setCouleur("");
                setCapacitee("");
            }
        } catch (error) {
            console.error('Error updating sales:', error);
        }
    };

    const confirmDecrement = async () => {
        try {
            if (!couleur || !capacitee) {
                Toast.show("remplire tout les champs svp.", Toast.LONG);
                return;
            }
            if (selectedReferenceId !== null) {
                const response = await axios.post(`http://${port}:3000/api/articles/arcticlebyCC/${selectedReferenceId}`, {
                    couleur: couleur,
                    capacite: capacitee
                });
                const articleId = response.data.idArticle;
                const existingSales = sales[selectedReferenceId]?.articles?.[articleId]?.sales || 0;
                const updatedSales = existingSales - 1; // Décrémenter au lieu d'incrémenter
    
                await handleSelloutCreationorUpdate(selectedReferenceId, updatedSales, articleId,"sup");
    
                setSales(prevSales => ({
                    ...prevSales,
                    [selectedReferenceId]: {
                        ...prevSales[selectedReferenceId],
                        articles: {
                            ...prevSales[selectedReferenceId]?.articles,
                            [articleId]: {
                                ...prevSales[selectedReferenceId]?.articles?.[articleId],
                                sales: updatedSales, // Mettre à jour les ventes décrémentées
                                couleur: couleur,
                                capacite: capacitee
                            }
                        }
                    }
                }));
                Toast.show("Correction avec succès!", Toast.SHORT);
                setModalVisibleSup(false); // Cacher le modal après validation
                setCouleur("");
                setCapacitee("");
            }
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

    const handleSelloutCreationorUpdate = async (idref, updatedSales, idart, option) => {
        try {
            const allrefsel = await axios.get(`http://${port}:3000/api/refsel/ReferenceSel`);
            const todayDate = new Date().toISOString().split('T')[0];
    
            // Recherche de l'enregistrement refsel existant pour la référence et l'article
            const existingRefSel = allrefsel.data.find(el => el.Reference_idReference === idref && el.Article_idArticle === idart && el.createdAt.split('T')[0] === todayDate);
    
            let updatedSellout = {}; // Déclaration de la variable en dehors des conditions
    
            if (existingRefSel) {
                // Si un refsel existe, mettre à jour le sellout correspondant
                const selloutResponse = await axios.get(`http://${port}:3000/api/sellout/sellouts/${existingRefSel.Sellout_idSellout}`);
                if (option === "add") {
                    updatedSellout = {
                        ...selloutResponse.data,
                        nbrV: selloutResponse.data.nbrV + 1 // Incrementer nbrV
                    };
                } else {
                    updatedSellout = {
                        ...selloutResponse.data,
                        nbrV: selloutResponse.data.nbrV - 1 // Décrémenter nbrV
                    };
                }
                await axios.put(`http://${port}:3000/api/sellout/sellouts/${existingRefSel.Sellout_idSellout}`, updatedSellout);
            } else {
                // Sinon, créer un nouveau sellout
                const selloutData = { dateCr: todayDate, nbrV: updatedSales, PDV_idPDV: ani.PDV_idPDV };
                const selloutcreate = await axios.post(`http://${port}:3000/api/sellout/sellouts`, selloutData);
                const selloutId = selloutcreate.data.idSellout;
    
                // Créer un nouvel enregistrement refsel associant la référence et le sellout
                await axios.post(`http://${port}:3000/api/refsel/creatRefSel`, {
                    Reference_idReference: idref,
                    Sellout_idSellout: selloutId,
                    Article_idArticle: idart
                });
            }
            setLoad(!load);
        } catch (error) {
            console.error('Error creating or updating sellout:', error);
        }
    };
    
    const Example = ({ text }) => {
        if(text==="Categories"){
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
        }
        else if(text==="Couleur"){
            return (
                <Center>
                    <Box maxW="400" mt={3}>
                        <Select
                            selectedValue={couleur}
                            minWidth="280"
                            accessibilityLabel={text}
                            placeholder={text}
                            onValueChange={(itemValue) => setCouleur(itemValue)}
                        >
                            {couleurs.map(el => {
                                if(el){
                                    return(<Select.Item label={el} value={el} />)
                                }  
                            })}
                        </Select>
                    </Box>
                </Center>
            );
        }
        else if(text==="Capacite"){
            return (
                <Center>
                    <Box maxW="400" mt={3}>
                        <Select
                            selectedValue={capacitee}
                            minWidth="280"
                            accessibilityLabel={text}
                            placeholder={text}
                            onValueChange={(itemValue) => setCapacitee(itemValue)}
                        >
                            {capacites.map(el =>{
                                if(el){
                                    return(<Select.Item label={el} value={el} />)
                                }
                            })}
                        </Select>
                    </Box>
                </Center>
            );
        }
        return null
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
                            <TouchableOpacity style={styles.cell1} onPress={() => handleReferenceSupClick(item.idReference)}>
                                <Text style={styles.textcell1}>Corriger</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    };
    return (
        <NativeBaseProvider>
            <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />
            <Header onCityChange={handleCityChange} />
            <View style={styles.container}>
                <Example text={'Categories'} />
                <Table />

                {/* Modal for Confirmation */}
                <Modal isOpen={modalVisibleAdd} onClose={() => setModalVisibleAdd(false)}>
                    <Modal.Content>
                        <Modal.Header>Confirmation</Modal.Header>
                        <Modal.Body>
                            <View style={{margin:5}}>
                                <Text>Choisir le Couleur :</Text>
                                <Example text={'Couleur'} />
                            </View>
                            <View style={{margin:5}}>
                                <Text>Choisir la Capacite :</Text>
                                <Example text={'Capacite'} />
                            </View>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button onPress={() => setModalVisibleAdd(false)}>Annuler</Button>
                                <Button colorScheme="teal" onPress={confirmIncrement}>Valider</Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                
                {/* Modal for Delite */}
                <Modal isOpen={modalVisibleSup} onClose={() => setModalVisibleSup(false)}>
                    <Modal.Content>
                        <Modal.Header>Confirmation</Modal.Header>
                        <Modal.Body>
                            <View style={{margin:5}}>
                                <Text>Choisir le Couleur :</Text>
                                <Example text={'Couleur'} />
                            </View>
                            <View style={{margin:5}}>
                                <Text>Choisir la Capacite :</Text>
                                <Example text={'Capacite'} />
                            </View>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button onPress={() => setModalVisibleSup(false)}>Annuler</Button>
                                <Button colorScheme="teal" onPress={confirmDecrement}>Valider</Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
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
        marginTop: -950
    },
    tableContainer: {
        marginTop: -450,
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
    image12: {
        width: 125,
        height: 95,
        position: "absolute",
        top: 0,
        left: 15,
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