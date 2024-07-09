import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Footer({ adm }) {
  const navigation = useNavigation();
  const [refresh, setRefresh] = React.useState(false);

  const handleHomePress = () => {
    setRefresh(!refresh);
    navigation.navigate('WelcomeManager', { adm ,refresh: !refresh});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={styles.item}>
          <FontAwesome name="sign-out" size={24} color="#FFF" />
          <Text style={styles.text}>Log out</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHomePress}>
        <View style={styles.item}>
          <FontAwesome name="home" size={24} color="#FFF" />
          <Text style={styles.text}>Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    marginLeft: 5,
  },
});

export default Footer;
