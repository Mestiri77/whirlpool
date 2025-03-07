import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CheckIcon, Center, NativeBaseProvider, Box, Select, View, Icon, Spinner } from "native-base";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";  // Importing the icons from @expo/vector-icons
import port from '../port';
import { useRoute } from '@react-navigation/native';

function PopupRapport({ popupType, onClose, setPdv, setDate, date, pdv, rapportName, link }) {
    const navigation = useNavigation();
    const route = useRoute();
    const { adm } = route.params;
    const [month, setMonth] = React.useState("");
    const [nomspdv, setNomspdv] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [buttonLoading, setButtonLoading] = React.useState(false);
    const [warningVisible, setWarningVisible] = React.useState(false);

    const fetchPdvsname = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axios.get(`http://${port}:3000/api/pdvs/pdvs`);
            const pdvNames = response.data.map(pdv => pdv.pdvname);
            setNomspdv(pdvNames);
        } catch (error) {
            console.error('Error fetching PDVs:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    React.useEffect(() => {
        fetchPdvsname();
    }, []);

    const Example = ({ text, setOption, option }) => (
        <Center>
            <Box maxW="400" mt={5}>
                <Select
                    selectedValue={option}
                    minWidth="100%"
                    accessibilityLabel="Choisir le point de vente"
                    placeholder={text}
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                    }}
                    InputLeftElement={
                        <Icon as={<MaterialIcons name="store" />} size={5} ml="2" color="muted.400" />
                    } 
                    mt={1}
                    onValueChange={(itemValue) => setOption(itemValue)}
                >
                    {nomspdv.map((el, index) => (
                        <Select.Item key={index} label={el} value={el} />
                    ))}
                </Select>
            </Box>
        </Center>
    );

    const ExampleMonth = ({ text, setOption, option }) => (
        <Center>
            <Box maxW="400" mt={5}>
                <Select
                    selectedValue={option}
                    minWidth="100%"
                    accessibilityLabel="Choisir le mois"
                    placeholder={text}
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                    }}
                    InputLeftElement={
                        <Icon as={<MaterialIcons name="event" />} size={5} ml="2" color="muted.400" />
                    } 
                    mt={1}
                    onValueChange={(itemValue) => setOption(itemValue)}
                >
                    <Select.Item label="Janvier" value="1" />
                    <Select.Item label="Février" value="2" />
                    <Select.Item label="Mars" value="3" />
                    <Select.Item label="Avril" value="4" />
                    <Select.Item label="Mai" value="5" />
                    <Select.Item label="Juin" value="6" />
                    <Select.Item label="Juillet" value="7" />
                    <Select.Item label="Août" value="8" />
                    <Select.Item label="Septembre" value="9" />
                    <Select.Item label="Octobre" value="10" />
                    <Select.Item label="Novembre" value="11" />
                    <Select.Item label="Décembre" value="12" />
                </Select>
            </Box>
        </Center>
    );

    const handleVerifyPress = () => {
        if (month === "" || pdv === "") {
            setWarningVisible(true);
        } else {
            setButtonLoading(true);
            navigation.navigate(link, { month, pdv, adm });
            setButtonLoading(false);
        }
    };

    return (
        <NativeBaseProvider>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={onClose}
            >
                <Center style={styles.center}>
                    <Box style={styles.modal}>
                        <Text style={styles.title}>{rapportName}</Text>
                        {loading ? (
                            <Spinner size="lg" color="#FDC100" />
                        ) : (
                            <>
                                <ExampleMonth text={'Mois :'} setOption={setMonth} option={month} />
                                <Example text={'Point De Vente'} setOption={setPdv} option={pdv} />
                            </>
                        )}
                        <Center mt={10}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {buttonLoading ? (
                                    <Spinner size="lg" color="#FDC100" />
                                ) : (
                                    <>
                                        <TouchableOpacity
                                            onPress={handleVerifyPress}
                                            style={styles.btns}
                                        >
                                            <Text style={styles.btnText}>Vérifier</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={onClose}
                                            style={styles.btns}
                                        >
                                            <Text style={styles.btnText}>Fermer</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </Center>
                    </Box>
                </Center>
            </Modal>

            {/* Warning Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={warningVisible}
                onRequestClose={() => setWarningVisible(false)}
            >
                <Center style={styles.center}>
                    <Box style={styles.warningModal}>
                        <Text style={styles.warningTitle}>Avertissement</Text>
                        <Text style={styles.warningText}>Veuillez remplir tous les champs.</Text>
                        <TouchableOpacity
                            onPress={() => setWarningVisible(false)}
                            style={styles.btns}
                        >
                            <Text style={styles.btnText}>Fermer</Text>
                        </TouchableOpacity>
                    </Box>
                </Center>
            </Modal>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour overlay derrière le modal
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        width: "80%",
        height: "40%",
        borderWidth: 1,
        borderColor: '#FDC100',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 30,
        textAlign: 'center',
    },
    warningModal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        width: "80%",
        height: "20%",
        borderWidth: 1,
        borderColor: '#FDC100',
        alignItems: 'center',
    },
    warningTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    warningText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    btns: {
        backgroundColor: 'white', // Couleur de fond du bouton
        padding: 10,
        borderRadius: 5,
        width: 90,
        height: 50,
        marginTop: "0%",
        marginBottom: '10%',
        marginLeft: '2%',
        marginRight: '2%',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FDC100',
    },
    btnText: {
        color: '#FDC100', // Couleur du texte
        fontSize: 16,
        textAlign: "center"
    },
});

export default PopupRapport;
