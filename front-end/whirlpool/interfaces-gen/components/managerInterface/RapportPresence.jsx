import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NativeBaseProvider, Center, Box, Select, CheckIcon, Spinner } from "native-base";
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
  const { adm, month, pdv } = route.params;
  const [pdvs, setPdvs] = useState({});
  const [pres, setPres] = useState([]);
  const [users, setUsers] = useState({});
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const WHIRLPOOL_LOGO = require('../../../assets/WHIRLPOOL_LOGO.png');

  const getPdvs = async (pdv) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/pdvs/getId/${pdv}`);
      setPdvs(response.data);
    } catch (error) {
      console.error('Error fetching pdvs:', error);
    }
  };

  const getUsers = async (userIds) => {
    try {
      const responses = await Promise.all(userIds.map(id => axios.get(`http://${port}:3000/api/user/users/${id}`)));
      const usersData = responses.reduce((acc, response) => {
        acc[response.data.idusers] = response.data;
        return acc;
      }, {});
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getPresence = async () => {
    try {
      const response = await axios.get(`http://${port}:3000/api/presences/presences`);
      const presences = response.data.filter(e => e.PDV_idPDV === pdvs.idPDV && new Date(e.createdAt).getMonth() === month - 1);
      setPres(presences);
      const userIds = [...new Set(presences.map(p => p.Users_idusers))];
      await getUsers(userIds);
      setIsLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.error('Error fetching presence:', error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const exportToExcel = async () => {
    const data = [
      ["Animatrice", "Check in", "Check out", "Position GPS"],
      ...pres.map(presence => [
        users[presence.Users_idusers]?.name,
        formatTime(presence.checkin),
        formatTime(presence.checkout),
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
    const fetchData = async () => {
      await getPdvs(pdv);
    };
    fetchData();
  }, [pdv]);

  useEffect(() => {
    if (pdvs.idPDV) {
      getPresence();
    }
  }, [pdvs]);

  const filterPresences = (date, pres) => {
    if (date === "AM") {
      return pres.filter(presence => presence.checkin.includes('AM'));
    } else if (date === "PM") {
      return pres.filter(presence => presence.checkin.includes('PM'));
    }
    return pres;
  };

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

  const Tableaux = () => {
    const filteredPresences = filterPresences(date, pres);

    return (
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
          {filteredPresences.map((presence, index) => (
            <View key={index} style={styles.row}>
              <View style={[styles.cell1, !presence.status ? styles.cellFail : styles.cellSuccess]}>
                <Text style={styles.textcell1}>{users[presence.Users_idusers]?.name}</Text>
              </View>
              <View style={[styles.cell1, !presence.status ? styles.cellFail : styles.cellSuccess]}><Text style={styles.textcell1}>{(presence.checkin)}</Text></View>
              <View style={[styles.cell1, !presence.status ? styles.cellFail : styles.cellSuccess]}><Text style={styles.textcell1}>{(presence.checkout)}</Text></View>
              <View style={[styles.cell1, !presence.status ? styles.cellFail : styles.cellSuccess]}><Text style={styles.textcell1}>{presence.position}</Text></View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />
      <View style={styles.container}>
        <Header />
        <Center flex={1} mt={'-140%'}>
          <Text style={styles.title}>Rapport De Présence</Text>
          <View style={styles.content}>
            <Example text={'Time AM/PM'} />
          </View>
        </Center>
        {isLoading ? (
          <Center flex={1}>
            <Spinner size="lg" color="#FDC100"/>
          </Center>
        ) : (
          <ScrollView style={styles.scrollView}>
            <Tableaux />
          </ScrollView>
        )}
        <Center>
          <TouchableOpacity onPress={exportToExcel} style={styles.btns}>
            <Text style={styles.btnText}>Exporter</Text>
          </TouchableOpacity>
        </Center>
        <Footer adm={adm} />
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
  image12: {
    width: 125,
    height: 95,
    position: "absolute",
    top: 0,
    left: 15,
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D0D3D4',
    maxWidth: 95,
    minWidth: 95,
  },
  cellSuccess: {
    backgroundColor: '#0EC320',
  },
  cellFail: {
    backgroundColor: '#FF8372',
  },
  textcell1: {
    color: 'white',
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
    minWidth: 95,
  },
  scrollView: {
    flex: 1,
    padding: 20,
    marginTop: -200,
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
    textAlign: "center",
  },
});

export default RapportDePresence;
