import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

console.disableYellowBox = true; // Pour masquer tous les avertissements jaunes
function Start() {

  return (
    <View style={styles.view1}>
      <Image
        resizeMode="auto"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5eabcf1f56010dd8f011a0187337088d522cc501a4b1ac85ce4475eb6ec27508?apiKey=354f2f8c1f9f40aca64d3ce2e19fda26&",
        }}
        style={styles.image1}
      />
      <Image
        resizeMode="auto"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/653906d8723a7b1c34a9a4f4d68d47196e733bec982738e9d91beb2b6d2d1a05?apiKey=354f2f8c1f9f40aca64d3ce2e19fda26&",
        }}
        style={styles.image2}
      />
      <View style={styles.view2}>
        <Text>
          You can log in if you have been introduced as an operator by the
          branch manager
        </Text>
      </View>
      <View style={styles.view3} />
      <View style={styles.view4}>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5e7d96c3527520ce55c2f9e048fe715111e9307bef02fea0543af329280d6a2?apiKey=354f2f8c1f9f40aca64d3ce2e19fda26&",
          }}
          style={styles.image3}
        />
        <View style={styles.view5}>
          <Text>Version 1.0.0 Developed Aziz & Salah</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    borderRadius: 30,
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 360,
    flexDirection: "column",
    alignItems: "center",
    color: "#C6C6C6",
    fontWeight: "700",
    textAlign: "center",
  },
  image1: {
    alignSelf: "stretch",
    position: "relative",
    width: "100%",
    aspectRatio: "1.16",
  },
  image2: {
    position: "relative",
    marginTop: 54,
    width: 171,
    maxWidth: "100%",
    aspectRatio: "2.27",
  },
  view2: {
    marginTop: 27,
    font: "12px ",
  },
  view3: {
    borderRadius: 8,
    backgroundColor: "#FFCE38",
    marginTop: 26,
    width: 248,
    flexShrink: 0,
    height: 48,
  },
  view4: {
    alignSelf: "stretch",
    display: "flex",
    marginTop: 33,
    alignItems: "stretch",
    fontSize: 10,
  },
  image3: {
    position: "relative",
    width: 150,
    flexShrink: 0,
    maxWidth: "100%",
    aspectRatio: "1.37",
  },
  view5: {
    alignSelf: "start",
    marginTop: 82,
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "auto",
  },
});


export default Start;