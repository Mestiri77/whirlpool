import * as React from "react";
import {FlatList,ScrollView,View,StyleSheet,Image,Text,TouchableOpacity,} from "react-native";
import { CheckIcon,Input, Divider,Heading, Button, Select, Box, Center, NativeBaseProvider,Stack, Icon,Skeleton, VStack,} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';

const leftimage = require('../../../assets/icons8-right-50.png'); 
const downicon = require('../../../assets/icons8-down-50.png')

function CreationArticle(){
const [creatArt,setCreatArt]=React.useState(false)
const [modifArt,setModifArt]=React.useState(false)
const [showpop,setShowpop]=React.useState(false);
const [validmodif,setValidmodif]=React.useState(false)
const [modifRef,setModifRef]=React.useState("")
const [oneRef,setOneRef]=React.useState("Reférence")

    function RowItem({ text, truc,settruc,settruc2}) {
        if(settruc2==""){
            return (
                <View style={styles.row}>
                  <Text style={styles.text}>{text}</Text>
                  <TouchableOpacity onPress={() => {settruc(!truc),console.log(truc,text)}}>
                    <Image
                      resizeMode="contain"
                      source={truc ? downicon : leftimage}
                      style={styles.leftimage}
                    />
                  </TouchableOpacity>
                </View>
              );
        }
        else{
        return (
          <View style={styles.row}>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={() => {settruc(!truc),settruc2(true),console.log(truc,text)}}>
              <Image
                resizeMode="contain"
                source={truc ? downicon : leftimage}
                style={styles.leftimage}
              />
            </TouchableOpacity>
          </View>
          
        );
    }
      }
      const Example = ({text}) => {
        const [service, setService] = React.useState("");
        return <Center>
            <Box maxW="400">
              <Select selectedValue={service} minWidth="240" accessibilityLabel={text} placeholder={text} _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            </Box>
          </Center>;
      };

      const RenderInput= (text,modif)=>{
        if(modif==true){
          return(
            <Stack space={4} w="50%" alignItems="center" mt="5%">
            <Input 
              w={{
                base: "75%",
                md: "25%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder={text}
              onChangeText={item=>setNompdv(item)}
            />
           
          </Stack>
          )
        }
        return(
            <Stack space={4} w="100%" alignItems="center" mt="2%">
            <Input 
              w={{
                base: "75%",
                md: "25%"
              }} 
              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
              } 
              placeholder={text}
              onChangeText={item=>setNompdv(item)}
            />
           
          </Stack>
        )
      }
      const renderPopup=()=>{
        return(
                  <View style={{marginTop:'20%'}}>
                  <Center flex={1} px="3">
                  <Center w="100%">
        <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
        borderColor: "coolGray.500"
        }} _light={{
        borderColor: "coolGray.200"
        }}>
          <Center flex={1} px="3" mt="2">
          <Text style={styles.textprop}>Choisir la réfèrence :</Text>
          </Center>

          <Example text={'Référence'} />
          <Stack mb="8" mt="1" direction={{
          base: "row",
          md: "row"
        }} space={2} mx={{
          base: "auto",
          md: "0",
        }}>
            <Button size="sm" variant="outline" borderColor="#FDC100" _text={{ color: '#FDC100' }} 
            onPress={()=> {setShowpop(false)}}
            >
              Valider
            </Button>
            <Button size="sm" variant="outline" borderColor="#D0D3D4" _text={{ color: '#D0D3D4' }}
            onPress={()=> {setShowpop(false),setModifArt(false)}}
            >
              Annuler
            </Button>
          </Stack>
        </VStack>
        </Center>;
        </Center>
        </View>
          )
      }
      const renderform=(text)=>{
        if(text=="Créer un nouveau article"){
            return(

                <View style={styles.inputs}>
                <Center flex={1} px="3">
                <Example text={"Reference"}/>
                <Example text={"Marque"} />
                {RenderInput('couleur')}
                <Example text={"categorie"}/>
                <Example text={"Type de Capacité"}/>
                {RenderInput('Type de Capacite')}
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
        <Text style={styles.btnText}>Valideé</Text>
      </TouchableOpacity>
            </Center>
            </View>
            )
        }
        else if(showpop){
            return(
              renderPopup()
            )
        }
        else if (!showpop){
          return(
            <View>
              <Stack mb="4" mt="8" direction={{
                        base: "row",
                        md: "row"
                      }} space={2} mx={{
                        base: "auto",
                        md: "0",
                      }}>              
                {RenderInput('Reference',true)}
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
        <Text style={styles.btnText}>Modifier</Text>
      </TouchableOpacity>
              </Stack>

              <Stack mb="4" mt="1" direction={{
                        base: "row",
                        md: "row"
                      }} space={2} mx={{
                        base: "auto",
                        md: "0",
                      }}>              
                {RenderInput('Marque',true)}
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
        <Text style={styles.btnText}>Modifier</Text>
      </TouchableOpacity>
              </Stack>
              <Stack mb="4" mt="1" direction={{
                        base: "row",
                        md: "row"
                      }} space={2} mx={{
                        base: "auto",
                        md: "0",
                      }}>              
                {RenderInput('Coleur',true)}
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
        <Text style={styles.btnText}>Modifier</Text>
      </TouchableOpacity>
              </Stack>
              <Stack mb="4" mt="1" direction={{
                        base: "row",
                        md: "row"
                      }} space={2} mx={{
                        base: "auto",
                        md: "0",
                      }}>              
                {RenderInput('Capaciter',true)}
                <TouchableOpacity onPress={() =>{}} style={styles.btns}>
        <Text style={styles.btnText}>Modifier</Text>
      </TouchableOpacity>
              </Stack>
        </View>
          )
        }
      }

    return (
        <NativeBaseProvider>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <Image
              resizeMode="contain"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/12f4aba34bd6fde10767af48f78f20f36401e32be5ece9adacbb2971412c1df1?apiKey=354f2f8c1f9f40aca64d3ce2e19fda26&",
              }}
              style={styles.image1}
            />
         <ScrollView>
            <RowItem text="Créer un nouveau article" truc={creatArt} settruc={setCreatArt} settruc2={""} />
            {creatArt&&renderform("Créer un nouveau article")}
            <RowItem text="Modifier un article" truc={modifArt} settruc={setModifArt} settruc2={setShowpop} />
            {modifArt&&renderform()}
          </ScrollView>
          </View>
    
        </View>
        </NativeBaseProvider>
      );
    }
      const styles = StyleSheet.create({
        textprop:{
            fontSize: 18,
            fontWeight:"600"
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
        inputs:{
          marginTop:'5%',
          marginBottom:'5%',
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
            })

export default CreationArticle;