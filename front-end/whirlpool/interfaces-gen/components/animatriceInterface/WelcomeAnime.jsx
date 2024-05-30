import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { Switch, HStack, Center, NativeBaseProvider } from "native-base";
import Header from './header';
import Footer from './footer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const image01 = require('../../../assets/image1+.png');
const image02 = require('../../../assets/image2.png');
const image03 = require('../../../assets/image3.png');
const image04 = require('../../../assets/image4.png');
const image05 = require('../../../assets/fleche.png');

const port = "192.168.248.6";

function WelcomeAnime({ route }) {
  const { ani } = route.params;
  const navigation = useNavigation();

  const [load, setLoad] = React.useState(true);
  const [historique, setHistorique] = React.useState([]);
  const [checkOn, setCheckOn] = React.useState('');
  const [checkOff, setCheckOff] = React.useState('');
  const [status, setStatus] = React.useState(false);

  const checkIn = {
    checkin: checkOn,
    status: true,
    Users_idusers: ani.id
  };

  const checkOut = {
    checkout: checkOff,
    status: false
  };

  const hundlehistorique = (zone) => {
    setLoad(!load);
    setHistorique((prevHistorique) => [...prevHistorique, zone]);
  };

  const presence = async () => {
    if (status) {
      setCheckOn(new Date());
      try {
        const response = await axios.post(`http://${port}:3000/api/presences/presences/checkin`, checkIn);
      } catch (error) {
        console.error('Error checking in:', error);
      }
    } else {
      setCheckOff(new Date());
      try {
        const response = await axios.post(`http://${port}:3000/api/presences/presences/checkout`, checkOut);
      } catch (error) {
        console.error('Error checking out:', error);
      }
    }
  };

  const Example = () => {
    return (
      <HStack alignItems="center" space={4} ml={9}>
        <Text style={{ color: status ? "#FDC100" : "#D0D3D4", fontSize: 18 }}>
          {status ? "On ligne" : "Off ligne"}
        </Text>
        <Switch
          size="sm"
          isChecked={status}
          onTrackColor="#FDC100"
          offTrackColor="#D0D3D4"
          onToggle={() => {
            setStatus(!status);
            presence();
          }}
        />
      </HStack>
    );
  };

  React.useEffect(() => {}, [load]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Example />
        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text style={styles.textEmoji}>Bonjour 👋,</Text>
            </View>
            <View style={styles.view4}>
              <Text style={styles.textAdmin}>{ani.name}</Text>
            </View>
          </View>
          <View style={styles.view10}>
            <TouchableOpacity onPress={() => { hundlehistorique({ name: "Création d'articles", link: 'link_to_creation_articles', image: image03 }); navigation.navigate('CreationRapportSO') }}>
              <View style={styles.view11}>
                <View style={styles.view12}>
                  <Text style={styles.textCreation}>Mes Rapports Sell-out</Text>
                </View>
                <Image resizeMode="contain" source={image03} style={styles.image3} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { hundlehistorique({ name: 'Consultation des rapports', link: 'link_to_consultation_rapports', image: image03 }); navigation.navigate('CreationRapportExpo') }}>
              <View style={styles.view13}>
                <View style={styles.view12}>
                  <Text style={styles.textCreation}>Mes Rapports Exposition</Text>
                </View>
                <Image resizeMode="contain" source={image03} style={styles.image03} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.view14}>
            <Text style={styles.textRecentActivities}>Recent Activities</Text>
          </View>
          {historique.map((item, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.view15}>
                <View style={styles.view16}>
                  <Image resizeMode="contain" source={item.image} style={styles.image4} />
                  <View style={styles.view17}>
                    <Text style={styles.textCreation1}>{item.name}</Text>
                  </View>
                </View>
                <Image resizeMode="contain" source={image05} style={styles.image5} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  view1: {
    marginTop: 15,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  view2: {
    alignItems: "stretch",
    marginBottom: 15,
    flexDirection: "row",
  },
  view3: {
    marginBottom: 5,
  },
  textEmoji: {
    fontSize: 16,
    color: "#FFCE38",
  },
  view4: {},
  textAdmin: {
    fontSize: 14,
    color: "#263238",
  },
  view5: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    height: 150,
    margin: 5,
  },
  view6: {
    borderRadius: 10,
    shadowColor: "#4F4F4F",
    shadowOffset: { width: -0.5, height: 2 },
    shadowOpacity: 0.16,
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
    marginRight: 8,
    width: 170,
  },
  view7: {
    marginBottom: 8,
  },
  textCreation: {
    fontSize: 16,
    color: "black",
  },
  textCreation1: {
    fontSize: 16,
    color: "white",
  },
  image1: {
    width: 95,
    height: 95,
    position: "absolute",
    top: 75,
    left: -15,
  },
  view8: {
    borderRadius: 10,
    shadowColor: "#4F4F4F",
    shadowOffset: { width: -0.5, height: 2 },
    shadowOpacity: 0.16,
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
    marginLeft: 8,
    width: 170,
  },
  view9: {
    marginBottom: 8,
  },
  image2: {
    width: 78,
    height: 78,
    position: "absolute",
    top: 82,
    right: -15,
  },
  view10: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    height: 150,
    margin: 2,
  },
  view11: {
    borderRadius: 10,
    shadowColor: "#4F4F4F",
    shadowOffset: { width: -0.5, height: 2 },
    shadowOpacity: 0.16,
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
    marginRight: 8,
    width: 170,
  },
  view12: {
    marginBottom: 8,
  },
  image3: {
    width: 88,
    height: 88,
    position: "absolute",
    top: 80,
    left: -30,
  },
  image03: {
    width: 88,
    height: 88,
    position: "absolute",
    top: 80,
    right: -20,
  },
  view13: {
    borderRadius: 10,
    shadowColor: "#4F4F4F",
    shadowOffset: { width: -0.5, height: 2 },
    shadowOpacity: 0.16,
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
  },
  view14: {
    marginTop: 36,
    alignSelf: "stretch",
    marginBottom: 16,
  },
  textRecentActivities: {
    fontSize: 14,
    color: "#263238",
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "700",
  },
  view15: {
    borderRadius: 10,
    backgroundColor: "#FFCC30",
    alignSelf: "stretch",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 360,
    marginTop: 5,
    marginBottom: 20,
  },
  view16: {
    flexDirection: "row",
    alignItems: "center",
  },
  image4: {
    backgroundColor: "#FFF",
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  view17: {
    marginLeft: 9,
  },
  image5: {
    width: 30,
    height: 30,
  },
});

export default WelcomeAnime;
