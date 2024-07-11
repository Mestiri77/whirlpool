import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NativeBaseProvider, Center, Box, Select, CheckIcon } from "native-base";
import Header from './header';
import Footer from './footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import port from "../port";

function RapportLog() {
  const route = useRoute();
  const { adm, month, pdv } = route.params;
  const [date, setDate] = useState(""); 
  const [pdvs, setPdvs] = useState(null);
  const [pres, setPres] = useState([]);
  const [log, setLog] = useState([]);
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

  const getPresence = async (pdvId) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/presences/presences`);
      const presences = response.data.filter(e => e.PDV_idPDV === pdvId);
      setPres(presences);
    } catch (error) {
      console.error('Error fetching presence:', error);
    }
  };

  const fetchLog = async (presences) => {
    try {
      const response = await axios.get(`http://${port}:3000/api/logs/logs`);
      const logs = response.data.filter(log => 
        presences.some(pres => pres.idPresence === log.Presence_idPresence && new Date(log.createdAt).getMonth() === month - 1)
      );
      setLog(logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const exportToExcel = async () => {
    const data = [
      ["Date", "Time", "Activite"],
      ...log.map(logEntry => [
        new Date(logEntry.createdAt).toLocaleDateString(),
        new Date(logEntry.createdAt).toLocaleTimeString(),
        logEntry.messageAc
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapport Log");

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const uri = FileSystem.cacheDirectory + 'rapport_log.xlsx';
    await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(uri);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPdvs(pdv);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pdvs) {
      const fetchPresenceData = async () => {
        try {
          await getPresence(pdvs.idPDV);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchPresenceData();
    }
  }, [pdvs]);

  useEffect(() => {
    if (pres.length > 0) {
      const fetchLogData = async () => {
        try {
          await fetchLog(pres);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchLogData();
    }
  }, [pres]);

  const Tableaux = () => (
    <View style={{ marginTop: 20 }}>
      <View style={styles.container2}>
        <View style={styles.row}>
          <View style={styles.cell}><Text>Date</Text></View>
          <View style={styles.cell}><Text>Time</Text></View>
          <View style={styles.cell3}><Text>Activite</Text></View>
        </View>
        {log.map((logEntry, index) => (
          <View style={styles.row} key={index}>
            <View style={styles.cell1}><Text>{new Date(logEntry.createdAt).toLocaleDateString()}</Text></View>
            <View style={styles.cell1}><Text>{new Date(logEntry.createdAt).toLocaleTimeString()}</Text></View>
            <View style={styles.cell2}><Text>{logEntry.messageAc}</Text></View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <NativeBaseProvider>
      <Image resizeMode="contain" source={WHIRLPOOL_LOGO} style={styles.image12} />
      <View style={styles.container}>
        <Header />
        <Center flex={1} mt={'-140%'}>
          <Text style={styles.title}>Rapport Log</Text>
        </Center>
        <ScrollView style={styles.scrollView}>
          {Tableaux()}
        </ScrollView>
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
  image12: {
    width: 125,
    height: 95,
    position: "absolute",
    top: 0,
    left: 15,
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
    borderBottomWidth: 0.2,
    borderColor: 'black',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
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
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'black',
    maxWidth: 95,
    minWidth: 95,
  },
  cell2: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    backgroundColor: '#D0D3D4',
    borderColor: 'black',
    maxWidth: "50%",
    minWidth: "50%"
  },
  cell3: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: '#D0D3D4',
    maxWidth: "50%",
    minWidth: "50%"
  },
  totalRow: {
    borderTopWidth: 1,
    borderColor: 'black',
  },
  totalCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcell2: {
    color: 'white',
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

export default RapportLog;
