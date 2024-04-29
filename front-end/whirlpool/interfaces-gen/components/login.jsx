import React ,{ useState } from "react";
import { StyleSheet, View,Text, TextInput, TouchableOpacity } from "react-native";
import { CheckBox } from '@rneui/themed';
const Divider = () => (
  <View style={styles.divider} />
);

const InputField = ({ label, placeholder, isPassword }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={isPassword}
      autoCapitalize="none"
    />
  </>
);

const LoginScreen = () => {
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <InputField style={styles.inputs} label="Email" placeholder="Enter your email" isPassword={false} />
        <Divider />
        <InputField label="Password" placeholder="Enter your password" isPassword={true} />
        <Divider />
        <View style={styles.rememberForgotContainer}>
        <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
         />
          <Text style={styles.rememberMeText}>Stay logged in?</Text>
        </View>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height:'40%', 
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  headerText: {
    color: "#FFF",
    fontSize: 48,
    width: '95%'
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
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  rememberMeText: {
    fontSize: 12,
    color: "#707070",
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#707070",
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