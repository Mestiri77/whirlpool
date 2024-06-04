import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NativeBaseProvider, Center, Box, Select, CheckIcon } from "native-base";
import Header from './header';
import Footer from './footer';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import port from "../port";

function RapportDePresence() {
  const route = useRoute();
  const { month, pdv } = route.params;
  const [pres, setPres] = useState([]);
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");


  const fetchPresence = async (pdv) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/presences/pdvName/${pdv}`);
      console.log(response.data);
      setPres(response.data);
    } catch (error) {
      console.error('Error fetching presence:', error);
    }
  };

  const getUser = async (id) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/user/user/${id}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const exportToExcel = async () => {
    const data = [
      ["Animatrice", "Check in", "Check out", "Position GPS"],
      ...pres.map(presence => [
        user.name,
        presence.checkin,
        presence.checkout,
        presence.position
      ])
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapport Présence");
  
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const uri = FileSystem.cacheDirectory + 'rapport_presence.xlsx';
    await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(uri);
  };

  useEffect(() => {
    fetchPresence(pdv);
  }, [pdv]);

  useEffect(() => {
    if (pres.length > 0) {
      getUser(pres[0].Users_idusers);
    }
  }, [pres]);

  const Example = ({ text }) => (
    <Center>
      <Box maxW="400">
        <Select
          selectedValue={date}
          minWidth="100%"
          accessibilityLabel="Choose Service"
          placeholder={text}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setDate(itemValue)}
        >
          <Select.Item label="AM" value="AM" />
          <Select.Item label="PM" value="PM" />
        </Select>
      </Box>
    </Center>
  );

  const Tableaux = () => (
    <View style={{ marginTop: 20 }}>
      <View style={styles.container2}>
        {/* Première ligne */}
        <View style={styles.row}>
          <View style={styles.cell}><Text>Animatrice</Text></View>
          <View style={styles.cell}><Text>Check in</Text></View>
          <View style={styles.cell}><Text>Check out</Text></View>
          <View style={styles.cell}><Text>Position GPS</Text></View>
        </View>

        {/* Contenu dynamique basé sur les présences */}
        {pres.map((presence, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.cell1}><Text>{user.name}</Text></View>
            <View style={styles.cell1}><Text style={styles.textcell1}>{presence.checkin}</Text></View>
            <View style={styles.cell1}><Text>{presence.checkout}</Text></View>
            <View style={styles.cell1}><Text>{presence.position}</Text></View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Header />
        <Center flex={1} mt={'-140%'}>
          <Text style={styles.title}>Rapport De Présence</Text>
          <View style={styles.content}>
            <Example text={'Time AM/PM'} />
          </View>
        </Center>
        <ScrollView style={styles.scrollView}>
          {Tableaux()}
        </ScrollView>
        <Center>
          <TouchableOpacity onPress={exportToExcel} style={styles.btns}>
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
  container2: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D0D3D4',
    maxWidth: 95,
    minWidth: 95
  },
  cell1: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0D3D4',
    borderWidth: 0.5,
    borderColor: 'black',
    maxWidth: 95,
    minWidth: 95
  },
  scrollView: {
    flex: 1,
    padding: 20,
    marginTop: -200
  },
  btns: {
    backgroundColor: '#FDC100',
    padding: 10,
    borderRadius: 5,
    width: 150,
    marginTop: "5%",
    marginBottom: '10%',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center"
  },
});

export default RapportDePresence;
