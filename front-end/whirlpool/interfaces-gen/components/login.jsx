import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import port from './port';

const Divider = () => <View style={styles.divider} />;

const InputField = ({ label, placeholder, isPassword, onChangeText }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={isPassword}
      autoCapitalize="none"
      onChangeText={(text) => onChangeText(text.toLowerCase())} // Convertir en minuscules ici
    />
  </>
);

const LoginScreen = ({ navigation }) => {
  console.disableYellowBox = true; // Pour masquer tous les avertissements jaunes

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // État pour l'indicateur de chargement

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true); // Démarrer l'indicateur de chargement

    try {
      const response = await fetch(`http://${port}:3000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const { role } = data;
        console.log(role);

        // Navigate to appropriate screen based on role
        if (role === "admin") {
          const adminResponse = await axios.get(`http://${port}:3000/api/users/admin`);
          let adm = adminResponse.data.filter((e) => e.email === email);
          navigation.navigate("WelcomeAdmin", { adm: adm[0] });
        } else if (role === "manager") {
          const adminResponse = await axios.get(`http://${port}:3000/api/users/manager`);
          let adm = adminResponse.data.filter((e) => e.email === email);
          navigation.navigate("WelcomeManager", { adm: adm[0] });
        } else if (role === "animatrice") {
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
    } finally {
      setLoading(false); // Arrêter l'indicateur de chargement
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
        {loading ? ( // Afficher l'indicateur de chargement si loading est true
          <ActivityIndicator size="large" color="#FDC100" style={styles.loadingIndicator} />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 422,
    height: '100%',
    flexDirection: "column",
    alignItems: "stretch",
  },
  header: {
    backgroundColor: "#FDC100",
    width: "100%",
    height: '35%',
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
  loadingIndicator: {
    marginTop: 36,
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
