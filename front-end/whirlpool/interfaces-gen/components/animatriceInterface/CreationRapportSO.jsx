import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity,FlatList } from "react-native";
import { Input, Select, Box, Center, NativeBaseProvider, ScrollView } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import Header from './header';
import Footer from './footer';

function CreationRapportSO(){

    const [Ref, setRef] = React.useState("");


    const data = [
        { key: '1', col1: 'Row 1 Col 1', col2: ' 1', col3: 'Row 1 Col 3' },
        { key: '2', col1: 'Row 2 Col 1', col2: ' 2', col3: 'Row 2 Col 3' },
        { key: '3', col1: 'Row 3 Col 1', col2: ' 3', col3: 'Row 3 Col 3' },
        // Ajoutez plus de lignes si nécessaire
      ];
      
      const Table=()=>{
       return (
        <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>References</Text>
          <Text style={styles.headerCell}>Ventes</Text>
          <Text style={styles.headerCell}>Coriger</Text>
        </View>
        <ScrollView>
          {data.map((item) => (
            <View style={styles.row} key={item.key}>
             <TouchableOpacity style={styles.cell1}><Text style={styles.textcell1} >{item.col1}</Text></TouchableOpacity>
             <TouchableOpacity style={styles.cell}><Text style={styles.textcell} >{item.col2}</Text></TouchableOpacity>
             <TouchableOpacity style={styles.cell1}><Text style={styles.textcell1}>Coriger</Text></TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    )
      }

    const Example = ({ text }) => {
      return (
              <Center>
                <Box maxW="400" mt={3}>
                  <Select
                    selectedValue={Ref}
                    minWidth="280"
                    accessibilityLabel={text}
                    placeholder={text}
                    onValueChange={(itemValue) => setRef(itemValue)}
                  >
                    <Select.Item label="aaaaa" value="aaaaa" />
                    <Select.Item label="aaaaa" value="aaaaa" />
                    <Select.Item label="aaaaa" value="aaaaa" />
                  </Select>
                </Box>
              </Center>
            );
      };
    
    return(
        <NativeBaseProvider>
            <Header />
            <View style={styles.container}>
                <Example text={'Categories'}/>
                <Table />
                <TouchableOpacity onPress={() => {}} style={styles.btns}>
          <Text style={styles.btnText}>Valider</Text>
        </TouchableOpacity>
            </View>
            
            <Footer />
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 80,
        marginTop:-550
      },
      tableContainer: {
        marginTop: -50,
        width:'100%'
      },
      tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      headerCell: {
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: 'bold',
        margin:5,
        padding:10,
        backgroundColor: '#f0f0f0',
        width:'30%',
        borderRadius:5
      },
      row: {
        flexDirection: 'row',
        paddingVertical: 8,
      },
      cell: {
        flex: 1,
        textAlign: 'center',
        backgroundColor:'#D0D3D4',
        borderRadius:5,
        padding:8,
        margin:2
      },
      cell1: {
        flex: 1,
        borderRadius:5,
        padding:8,
        backgroundColor:'#FDC100',
        margin:2
      },
      textcell1:{
        color:'white',
        padding:5,
        textAlign: 'center',
        fontSize:16
      },
      textcell:{
        padding:5,
        textAlign: 'center',
        fontSize:16
      },
      btns: {
        backgroundColor: '#FDC100', // Background color of the button
        padding: 10,
        borderRadius: 5,
        width:150,
        marginTop:"5%",
      },
      btnText: {
        color: 'white', // Text color
        fontSize: 16,
        textAlign:"center"
      },
})
export default CreationRapportSO