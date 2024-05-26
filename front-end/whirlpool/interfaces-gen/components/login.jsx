import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

const Divider = () => (
  <View style={styles.divider} />

);
const port = '192.168.248.6';
const InputField = ({ label, placeholder, isPassword, onChangeText }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={isPassword}
      autoCapitalize="none"
      onChangeText={onChangeText}
    />
  </>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
 const [anim,setAnim]=useState({})

  const handleLogin = async () => {
    if (!email || !password || !selectedValue) {
      Alert.alert("Error", "Please fill in all fields and select a role");
      return;
    }

    try {
      const response = await fetch("http://"+port+":3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to appropriate screen based on role
        if (selectedValue === "Admin") {
          navigation.navigate("WelcomeAdmin");
        } else if (selectedValue === "Manager") {

          
          navigation.navigate("WelcomeManager");
        } else if (selectedValue === "Animateur") {
          const animResponse = await axios.get(`http://${port}:3000/api/users/animateur`);
          let ani = animResponse.data.filter((e) => e.email === email);
              navigation.navigate("WelcomeAnime", { ani: ani[0] });
        }
      } else {
        Alert.alert("Error", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <InputField label="Email" placeholder="Enter your email" isPassword={false} onChangeText={setEmail} />
        <Divider />
        <InputField label="Password" placeholder="Enter your password" isPassword={true} onChangeText={setPassword} />
        <Divider />
        <View style={styles.roles}>
          <Text>Veuillez choisir votre role :</Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 170 }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Animateur" value="Animateur" />
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Manager" value="Manager" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roles: {
    marginTop: 10,
  },
  container: {
    borderRadius: 20,
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 422,
    flexDirection: "column",
    alignItems: "stretch",
  },
  header: {
    backgroundColor: "#FDC100",
    width: "100%",
    height: '40%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  headerText: {
    color: "#FFF",
    fontSize: 48,
    width: '95%',
  },
  formContainer: {
    borderRadius: 15,
    backgroundColor: "#FFF",
    padding: '10%',
  },
  label: {
    color: "#000",
    marginTop: 20,
  },
  input: {
    marginTop: 4,
    padding: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ADADAD",
  },
  loginButton: {
    backgroundColor: "#FDC100",
    borderRadius: 50,
    marginTop: 36,
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default LoginScreen;
