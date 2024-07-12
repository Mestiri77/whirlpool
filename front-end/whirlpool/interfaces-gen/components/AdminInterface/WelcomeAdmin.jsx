import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Footer from './footer';
import { useNavigation, useRoute } from '@react-navigation/native';

const image01 = require('../../../assets/image1+.png');
const image02 = require('../../../assets/image2.png');
const image03 = require('../../../assets/image3.png');
const image04 = require('../../../assets/image4.png');
const image05 = require('../../../assets/fleche.png');
const WHIRLPOOL_LOGO = require('../../../assets/WHIRLPOOL_LOGO.png');

function WelcomeAdmin() {
  const navigation = useNavigation();
  const route = useRoute();
  const { adm } = route.params;
  const [historique, setHistorique] = React.useState([]);
  const [loading, setLoading] = React.useState(false); // État pour contrôler le chargement

  const hundlehistorique = (zone) => {
    setLoading(true); // Afficher l'indicateur de chargement

    // Utiliser setTimeout pour simuler un délai de 3 secondes avant de naviguer
    setTimeout(() => {
      setHistorique((prevHistorique) => [...prevHistorique, zone]);
      setLoading(false); // Masquer l'indicateur de chargement après 3 secondes
      navigation.navigate(zone.link, { adm });
    }, 1000); // 3000 ms = 3 secondes
  };

  return (
    <>
      <ScrollView>
        <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />

        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text style={styles.textEmoji}>Hi 👋,</Text>
            </View>
            <View style={styles.view4}>
              <Text style={styles.textAdmin}>{adm.name}</Text>
            </View>
          </View>
          <View style={styles.view5}>
            <TouchableOpacity
              onPress={() => hundlehistorique({ name: 'Création de compte', link: 'CreationCompte', image: image01 })}
            >
              <View style={styles.view6}>
                <View style={styles.view7}>
                  <Text style={styles.textCreation}>Création de compte</Text>
                </View>
                <Image resizeMode="contain" source={image01} style={styles.image1} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => hundlehistorique({ name: 'Création de point de vente', link: 'Creationpdv', image: image02 })}
            >
              <View style={styles.view8}>
                <View style={styles.view9}>
                  <Text style={styles.textCreation}>Création de point de vente</Text>
                </View>
                <Image resizeMode="contain" source={image02} style={styles.image2} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.view10}>
            <TouchableOpacity
              onPress={() => hundlehistorique({ name: "Création d'articles", link: 'CreationArt', image: image04 })}
            >
              <View style={styles.view11}>
                <View style={styles.view12}>
                  <Text style={styles.textCreation}>Création d'articles</Text>
                </View>
                <Image resizeMode="contain" source={image04} style={styles.image3} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => hundlehistorique({ name: 'Consultation des rapports', link: 'ConsultRapports', image: image03 })}
            >
              <View style={styles.view13}>
                <View style={styles.view12}>
                  <Text style={styles.textCreation}>Consultation des rapports</Text>
                </View>
                <Image resizeMode="contain" source={image03} style={styles.image03} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.view14}>
            <Text style={styles.textRecentActivities}>Recent Activities</Text>
          </View>
          {historique.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate(item.link,{adm})}>
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

      {/* Afficher l'indicateur de chargement conditionnellement */}
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loadingIndicator]}>
          <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.loadingLogo} />
          
          <ActivityIndicator size="large" color="#FFCC30" />
        </View>
      )}

      <Footer adm={adm}/>
    </>
  );
}

const styles = StyleSheet.create({
  view1: {
    marginTop: 85,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loadingLogo: {
    width: 125,
    height: 95,
  },
  view2: {
    alignItems: "stretch",
    marginBottom: 15,
    flexDirection: "row"
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
  image12: {
    width: 125,
    height: 95,
    position: "absolute",
    top: 0,
    left: 15,
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
    width: 68,
    height: 68,
    position: "absolute",
    top: 90,
    left: -5,
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
  loadingIndicator: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#263238",
  },
});

export default WelcomeAdmin;
