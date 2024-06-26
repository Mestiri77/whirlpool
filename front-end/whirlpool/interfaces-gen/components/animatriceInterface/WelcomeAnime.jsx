import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { Switch, HStack, Center, NativeBaseProvider } from "native-base";
import Header from './header';
import Footer from './footer';
import { useNavigation,useRoute } from '@react-navigation/native';
import axios from 'axios';
import port from '../port'

const image01 = require('../../../assets/image1+.png');
const image02 = require('../../../assets/image2.png');
const image03 = require('../../../assets/image3.png');
const image04 = require('../../../assets/image4.png');
const image05 = require('../../../assets/fleche.png');
const WHIRLPOOL_LOGO=require('../../../assets/WHIRLPOOL_LOGO.png')


function WelcomeAnime() {
  const route = useRoute();
  const { ani } = route.params;
  const navigation = useNavigation();
  const [load, setLoad] = React.useState(true);

  const [historique, setHistorique] = React.useState([]);
  const [lastpres,setLastpres]= React.useState(null);
  const [allpres,setAllpres]=React.useState([])
  const [alluser,setAllusers]=React.useState([])


  const [checkOn, setCheckOn] = React.useState('');
  const [checkOff, setCheckOff] = React.useState('');

  const [status, setStatus] = React.useState(Boolean);

  const [city,setCity]= React.useState("");

  const [iduser,setIdUser]= React.useState(ani.idusers);
  const [idpdv,setIdpdv]= React.useState(ani.PDV_idPDV);

console.log('heerrrree',ani);


 const onligne={
  datePr:formatDateWithoutTime(new Date()),
  checkin:new Date().toLocaleTimeString(),
  checkout:null,
  position:city,
  status:false,
  Users_idusers:iduser,
  PDV_idPDV:idpdv
 }

 const offligne={
  datePr:formatDateWithoutTime(new Date()),
  timecheckout:new Date().toLocaleTimeString(),
  status:true,
 }

//  const datalog={
//   messageAc:,
//   dateAc:, 
//   TimeAc:
//  }

 function formatDateWithoutTime(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("fr-FR", options);
}
 const handleCityChange = (newCity) => {
  setCity(newCity);
};
  const hundlehistorique = (zone,message) => {
    setLoad(!load);
    logHistory(message)
    setHistorique((prevHistorique) => [...prevHistorique, zone]);
  };

  const Allpresence=async()=>{
    try{
      const response = await axios.get(`http://${port}:3000/api/presences/presences`);
      setAllpres(response.data)
    }
    catch (error) {
      console.error('Error handling getallpresence:', error);
    }
  }
  const Allusers=async()=>{
    try{
      const response = await axios.get("http://"+port+":3000/api/users/animateur")
      setAllusers(response.data)
    }
    catch (error) {
      console.error('Error handling getallAnnime:', error);
    }
  }


  const logHistory= async (message)=>{
    try{
        await axios.post("http://"+port+":3000/api/logs/logs",{messageAc:message,dateAc:formatDateWithoutTime(new Date()),TimeAc:new Date().toLocaleTimeString(),Presence_idPresence:lastpres})
    }
    catch (error) {
      console.error('Error handling Log:', error);
    }
  }
  
  const getlastidpresence=async(userIdd,pdvIdd)=>{
    try{
      console.log(userIdd,pdvIdd);
      const response = await axios.post(`http://${port}:3000/api/presences/presence/latest`, {
        userId:userIdd ,
        pdvId: pdvIdd
      });
      console.log("hello",response.data.idPresence);
      setLastpres(response.data.idPresence)
      console.log("hello2",response.data.status);

      setStatus(response.data.status)
    }
    catch (error) {
      console.error('Error handling lastpres:', error);
    }
  }

  const presence = async () => {
    try {
      if (status) {
        const response = await axios.post(`http://${port}:3000/api/presences/presences`, onligne);
        setLastpres(response.data.idPresence);
      } else {
        if (lastpres) {
          await axios.put(`http://${port}:3000/api/presences/presences/checkout/${lastpres}`, offligne);
        } else {
          console.error('Latest presence ID is invalid');
        }
      }
    } catch (error) {
      console.error('Error handling presence:', error);
    }
  };
  



  const Example = () => {
    return (
      <HStack alignItems="center" space={4} ml={9}>
        <Text style={{ color: !status ? "#FDC100" : "#D0D3D4", fontSize: 18 }}>
          {status ? "Off ligne" : "On ligne"}
        </Text>
        <Switch
          size="sm"
          isChecked={!status}
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

  React.useEffect(() => {
    getlastidpresence(ani.idusers,ani.PDV_idPDV)
    Allpresence()
    Allusers()
  }, [load]);

  return (
    <NativeBaseProvider>
            <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />

      <ScrollView style={{marginTop:10}}>
        <Header onCityChange={handleCityChange} />
        <Example />
        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text style={styles.textEmoji}>Bonjour 👋,</Text>
            </View>
            <View style={styles.view4}>
              <Text style={styles.textAdmin}>{ani.name} {ani.lastname}</Text>
            </View>
          </View>
          <View style={styles.view10}>
            <TouchableOpacity onPress={() => { hundlehistorique({ name: "Mes Rapports Sell-Out", link: 'CreationRapportSO', image: image03 },"Création d'articles"); navigation.navigate('CreationRapportSO',{ ani }) }}>
              <View style={styles.view11}>
                <View style={styles.view12}>
                  <Text style={styles.textCreation}>Mes Rapports Sell-out</Text>
                </View>
                <Image resizeMode="contain" source={image03} style={styles.image3} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { hundlehistorique({ name: 'Mes Rapports Exposition', link: 'CreationRapportExpo', image: image03 },"Consultation des rapports"); navigation.navigate('CreationRapportExpo',{ ani }) }}>
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
            <TouchableOpacity key={index} onPress={() => navigation.navigate(item.link)}>
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
      <Footer ani={ani} />
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
