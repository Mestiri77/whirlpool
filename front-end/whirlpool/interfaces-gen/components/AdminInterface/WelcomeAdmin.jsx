import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity,ScrollView  } from "react-native";
import Footer from './footer'
const image01=require('../../../assets/image1+.png')
const image02=require('../../../assets/image2.png')
const image03=require('../../../assets/image3.png')
const image04=require('../../../assets/image4.png')
const image05=require('../../../assets/fleche.png')



function WelcomeAdmin() {

  const [load,setLoad]=React.useState(true)

  const [historique,setHistorique]=React.useState([])

  const hundlehistorique = (zone) => {
    setLoad(!load)
    setHistorique((prevHistorique) => [...prevHistorique, zone]);
  };

  React.useEffect(() => {
  }, [load]);

    return (
      <>
        <ScrollView >
      <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Text style={styles.textEmoji}>Hi 👋,</Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.textAdmin}>Admin</Text>
        </View>
      </View>
      <View style={styles.view5}>
        <TouchableOpacity onPress={() => hundlehistorique({ name: 'Création de compte', link: 'link_to_creation_compte',image:image01  })}>
        <View style={styles.view6}>
          <View style={styles.view7}>
            <Text style={styles.textCreation}>Création de compte</Text>
          </View>
          <Image
            resizeMode="contain"
            source={image01}
            style={styles.image1}
          />
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => hundlehistorique({ name: 'Création de point de vente', link: 'link_to_creation_point_vente',image:image02 })}>
        <View style={styles.view8}>
          <View style={styles.view9}>
            <Text style={styles.textCreation}>Création de point de vente</Text>
          </View>
          <Image
            resizeMode="contain"
            source={image02}
            style={styles.image2}
          />
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.view10}>
        <TouchableOpacity onPress={() => hundlehistorique({ name: "Création d'articles", link: 'link_to_creation_articles',image:image04 })}>
        <View style={styles.view11}>
          <View style={styles.view12}>
            <Text style={styles.textCreation}>Création d'articles</Text>
          </View>
          <Image
            resizeMode="contain"
            source={image04}
            style={styles.image3}
          />
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => hundlehistorique({ name: 'Consultation des rapports', link: 'link_to_consultation_rapports',image:image03  })}>
        <View style={styles.view13}>
        <View style={styles.view12}>
            <Text style={styles.textCreation}>
            Consultation des rapports
            </Text>
        </View>
        <Image
            resizeMode="contain"
            source={image03}  // Replace with the appropriate image source
            style={styles.image03}  // Ensure this style matches your other image styles
        />
        </View>
        </TouchableOpacity >
      </View>
      <View style={styles.view14}>
        <Text style={styles.textRecentActivities}>Recent Activities</Text>
      </View>
      {historique.map((item, index) => (
        <View key={index} style={styles.view15}>
          <View style={styles.view16}>
            <Image resizeMode="contain" source={item.image} style={styles.image4} />
            <View style={styles.view17}>
              <Text style={styles.textCreation1}>{item.name}</Text>
            </View>
          </View>
          <Image resizeMode="contain" source={image05} style={styles.image5} />
        </View>
      ))}
    </View>
      </ScrollView>
      <Footer/>
      </>
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
    height:150,
    margin:5
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
    width:170
  },
  view7: {
    marginBottom: 8,
  },
  textCreation: {
    fontSize: 16,
    color: "black",
  },
  textCreation1:{
    fontSize: 16,
    color: "white",

  },
  image1: {
    width: 95,
    height: 95,
    position:"absolute",
    top:75,
    left:-15
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
    width:170,

  },
  view9: {
    marginBottom: 8,
  },
  image2: {
    width: 78,
    height: 78,
    position:"absolute",
    top:82,
    right:-15

  },
  view10: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    height:150,
    margin:2
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
    width:170
  },
  view12: {
    marginBottom: 8,
  },
  image3: {
    width: 68,
    height: 68,
    position:"absolute",
    top:90,
    left:-5
  },
  image03:{
    width: 88,
    height: 88,
    position:"absolute",
    top:80,
    right:-20
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
    width:170
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
    width:360,
    marginTop:5,
    marginBottom:20
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

export default WelcomeAdmin;
