import * as React from "react";
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, Modal } from "react-native";
import { NativeBaseProvider } from "native-base";
import Footer from './footer';
import PopupRapport from './PopupRapport';

const leftimage = require('../../../assets/icons8-right-50.png');


function ConsultationDesRapports() {
    const [showPopup, setShowPopup] = React.useState(false);
    const [popupType, setPopupType] = React.useState("");
    const [rapportName, setRapportName] = React.useState("hello");
    const [pdv, setPdv] = React.useState("");
    const [link, setLink] = React.useState("");

    const handleRowItemPress = (report) => {
        setPopupType(report.popupType);
        setRapportName(report.text);
        setLink(report.link);
        setShowPopup(true);
    };
    
    const reports = [
        { text: "Rapport Exposition", popupType: "expo" ,link:"RapportExpo"},
        { text: "Rapport Price Map", popupType: "priceMap",link:"RapportPriceMap"},
        { text: "Rapport Sell-Out", popupType: "sellOut" ,link:"RapportSellOut"},
        { text: "Rapport De Présence", popupType: "presence",link:"RapportDePresence"},
        { text: "Rapport Log", popupType: "log" ,link:"RapportLog"},
    ];
    return (
        <NativeBaseProvider>
            <View style={styles.view1}>
                <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 20 }}>Consultation Des Rapports :</Text>
                <View style={styles.view2}>
                    <Image
                        resizeMode="contain"
                        source={{
                            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/12f4aba34bd6fde10767af48f78f20f36401e32be5ece9adacbb2971412c1df1?apiKey=354f2f8c1f9f40aca64d3ce2e19fda26&",
                        }}
                        style={styles.image1}
                    />
                    <ScrollView>
                        {reports.map((report) => (
                            <View key={report.popupType} style={styles.row}>
                                <Text style={styles.text}>{report.text}</Text>
                                <TouchableOpacity onPress={() => handleRowItemPress(report)}>
                                    <Image
                                        resizeMode="contain"
                                        source={leftimage}
                                        style={styles.leftimage}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPopup}
                onRequestClose={() => setShowPopup(false)}
            >
                <PopupRapport
                    popupType={popupType}
                    onClose={() => setShowPopup(false)}
                    setPdv={setPdv}
                    pdv={pdv}
                    rapportName={rapportName}
                    link={link}
                />
            </Modal>
            <Footer />
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    alert: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textprop: {
        fontSize: 18,
        fontWeight: "600"
    },
    btns: {
        backgroundColor: '#FDC100', // Background color of the button
        padding: 10,
        borderRadius: 5,
        width: 150,
        marginTop: "5%",
    },
    btnText: {
        color: 'white', // Text color
        fontSize: 16,
        textAlign: "center"
    },
    inputs: {
        marginTop: '5%',
        marginBottom: '5%',
    },
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

export default ConsultationDesRapports;
