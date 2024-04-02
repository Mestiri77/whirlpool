import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

function Login() {
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <Text>Login</Text>
      </View>
      <View style={styles.view3}>
        <Text>Email</Text>
      </View>
      <View style={styles.view4}>
        <Text>Enter your email</Text>
      </View>
      <View style={styles.view5} />
      <View style={styles.view6}>
        <Text>Password</Text>
      </View>
      <View style={styles.view7}>
        <View style={styles.view8}>
          <Text>Enter your password</Text>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/c01f578c0e06eea688cb7a592ffb7e79b824395a1a304ffb18adfc8e5aaf4d42?apiKey=354f2f8c1f9f40aca64d3ce2e19fda26&",
          }}
          style={styles.image1}
        />
      </View>
      <View style={styles.view9} />
      <View style={styles.view10}>
        <View style={styles.view11}>
          <View style={styles.view12} />
          <View style={styles.view13}>
            <Text>Stay logged in?</Text>
          </View>
        </View>
        <View style={styles.view14}>
          <Text>Forgot Password?</Text>
        </View>
      </View>
      <View style={styles.view15}>
        <Text>Login</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    borderRadius: 20,
    boxShadow: "28px 33px 62px 20px rgba(137, 84, 0, 0.13)",
    backgroundColor: "#FFF",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 20px 80px",
  },
  view2: {
    backgroundColor: "rgba(253, 193, 0, 1)",
    alignSelf: "stretch",
    width: "100%",
    alignItems: "start",
    color: "#FFF",
    whiteSpace: "nowrap",
    justifyContent: "center",
    padding: "125px 26px 92px",
    font: "48px Quicksand, sans-serif ",
  },
  view3: {
    color: "#000",
    fontFamily: "Nunito, sans-serif",
    marginTop: 22,
  },
  view4: {
    color: "#ADADAD",
    marginTop: 20,
    font: "400 15px Quicksand, sans-serif ",
  },
  view5: {
    borderColor: "rgba(173, 173, 173, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ADADAD",
    marginTop: 4,
    width: 320,
    flexShrink: 0,
    maxWidth: "100%",
    height: 1,
  },
  view6: {
    color: "#000",
    fontFamily: "Nunito, sans-serif",
    marginTop: 36,
  },
  view7: {
    alignItems: "stretch",
    display: "flex",
    marginTop: 20,
    width: "100%",
    maxWidth: 320,
    paddingRight: 9,
    gap: 20,
    fontSize: 15,
    color: "#ADADAD",
    fontWeight: "400",
    justifyContent: "space-between",
  },
  view8: {
    fontFamily: "Quicksand, sans-serif",
  },
  image1: {
    fill: "#ADADAD",
    position: "relative",
    width: 16,
    flexShrink: 0,
    margin: "auto 0",
    aspectRatio: "1.45",
  },
  view9: {
    borderColor: "rgba(173, 173, 173, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ADADAD",
    marginTop: 4,
    width: 320,
    flexShrink: 0,
    maxWidth: "100%",
    height: 1,
  },
  view10: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginTop: 18,
    width: "100%",
    maxWidth: 320,
    gap: 20,
    fontSize: 12,
    color: "#707070",
    fontWeight: "400",
  },
  view11: { display: "flex", alignItems: "stretch", gap: 7, padding: "1px 0" },
  view12: {
    borderRadius: 2,
    backgroundColor: "#EEE",
    width: 15,
    flexShrink: 0,
    height: 15,
  },
  view13: {
    fontFamily: "Quicksand, sans-serif",
    margin: "auto 0",
  },
  view14: {
    fontFamily: "Quicksand, sans-serif",
  },
  view15: {
    fontFamily: "Quicksand, sans-serif",
    borderRadius: 50,
    backgroundColor: "#FDC100",
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    color: "#FFF",
    whiteSpace: "nowrap",
    justifyContent: "center",
    margin: "36px 0 45px",
    padding: "17px 60px",
  },
});

export default Login