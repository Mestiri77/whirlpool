import * as React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

function MyComponent() {
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d50063e53114387007d73e3669c39fb1faf929afb64a2f37326c26f3de8d835b?",
          }}
          style={styles.image1}
        />
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b95533f3e535771d354c233f6acf7c047f00298593ed39be84ee4ff1e9c70c76?",
          }}
          style={styles.image2}
        />
      </View>
      <View style={styles.view3}>
        <View style={styles.view4}>
          <View style={styles.view5}>
            <Text>
              Hi <Text style={styles.span}>👋</Text>,
            </Text>
          </View>
          <View style={styles.view6}>
            <Text>Admin</Text>
          </View>
        </View>
        <View style={styles.view7}>
          <View style={styles.view8}>
            <View style={styles.view9}>
              <Text>
                Création de {"\n"}compte
              </Text>
            </View>
            <Image
              resizeMode="auto"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cfa723a438fddb86d9c2cb11a178689f17efba5ff98a1825a58a00fad7a9ca8?",
              }}
              style={styles.image3}
            />
          </View>
          <View style={styles.view10}>
            <View style={styles.view11}>
              <Text>
                Création de point de {"\n"}vente
              </Text>
            </View>
            <Image
              resizeMode="auto"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e025b6fe43362b4f8f09159a51f121335f497eb2be23c3eb9814253ebe1ba3ad?",
              }}
              style={styles.image4}
            />
          </View>
        </View>
        <View style={styles.view12}>
          <View style={styles.view13}>
            <View style={styles.view14}>
              <Text>
                Création {"\n"}d’articles
              </Text>
            </View>
            <Image
              resizeMode="auto"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ebb391935703f40d45cfbf35156a39dfcb77ec888c1261669c0d8803b4b820f4?",
              }}
              style={styles.image5}
            />
          </View>
          <View style={styles.view15}>
            <Text>
              Consulteation
              {"\n"}des {"\n"}rapports
            </Text>
          </View>
        </View>
        <View style={styles.view16}>
          <Text>Recent Activities</Text>
        </View>
        <View style={styles.view17}>
          <View style={styles.view18}>
            <Image
              resizeMode="auto"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/59707073450ee982d1215e75a42a5d6a566b3cc1ef741f3a332c9ba6f3a97de5?",
              }}
              style={styles.image6}
            />
            <View style={styles.view19}>
              <Text>
                Consulteation des {"\n"}rapports
              </Text>
            </View>
          </View>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e238c05a9dd6fd93571f2252711baba5cab8cd221f8511dc90a4dea763b45216?",
            }}
            style={styles.image7}
          />
        </View>
      </View>
      <View style={styles.view20}>
        <View style={styles.view21}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/625e5458a8e438a3af915c34f836967e91760f5fb90b860a4368a11ba74a28ec?",
            }}
            style={styles.image8}
          />
          <View style={styles.view22}>
            <Text>Log out</Text>
          </View>
        </View>
        <View style={styles.view23}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/9ecad7895d4b8c4a6e516ba834105ed164cf7473de9b1b79a0e22d56e666271a?",
            }}
            style={styles.image9}
          />
          <View style={styles.view24}>
            <Text>Home</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    borderRadius: 30,
    backgroundColor: "#FFF",
    maxWidth: 360,
    paddingTop: 9,
    flexDirection: "column",
    alignItems: "stretch",
  },
  view2: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image1: {
    width: 130,
    aspectRatio: 2.08,
  },
  image2: {
    width: 24,
    aspectRatio: 1,
  },
  view3: {
    marginTop: 15,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: 24,
  },
  view4: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  view5: {
    color: "#FFCE38",
    fontSize: 16,
    fontFamily: "Nunito, sans-serif",
  },
  view6: {
    color: "#263238",
    fontSize: 14,
    fontFamily: "Nunito, sans-serif",
  },
  view7: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 21,
  },
  view8: {
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#FFF",
    flexDirection: "column",
    padding: 27,
  },
  view9: { fontFamily: "Nunito, sans-serif" },
  image3: { width: 90, aspectRatio: 1.1 },
  view10: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    flexDirection: "column",
    padding: 28,
  },
  view11: {
    fontFamily: "Nunito, sans-serif",
    alignSelf: "flex-start",
  },
  image4: {
    width: 78,
    aspectRatio: 0.94,
  },
  view12: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 23,
  },
  view13: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    flexDirection: "column",
    padding: 27,
  },
  view14: {
    fontFamily: "Nunito, sans-serif",
  },
  image5: {
    width: 49,
    aspectRatio: 0.85,
  },
  view15: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: "28px 16px 46px",
  },
  view16: {
    color: "#263238",
    alignSelf: "stretch",
    marginTop: 36,
    fontSize: 14,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "700",
  },
  view17: {
    borderRadius: 10,
    backgroundColor: "#FFCC30",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 17px",
    marginBottom: 20,
  },
  view18: { flexDirection: "row", alignItems: "center" },
  image6: {
    backgroundColor: "#FFF",
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  view19: {
    fontFamily: "Nunito, sans-serif",
    marginLeft: 9,
  },
  image7: {
    width: 30,
    aspectRatio: 1,
  },
  view20: {
    backgroundColor: "#000",
    alignItems: "flex-start",
    padding: "24px 40px",
  },
  view21: {
    flexDirection: "row",
    alignItems: "center",
  },
  image8: {
    width: 35,
    aspectRatio: 1.45,
  },
  view22: {
    fontFamily: "Inter, sans-serif",
    marginTop: 7,
  },
  view23: {
    flexDirection: "row",
    alignItems: "center",
  },
  image9: {
    borderColor: "#FFF",
    borderWidth: 2,
    width: 26,
    aspectRatio: 1.18,
  },
  view24: {
    fontFamily: "Inter, sans-serif",
    marginTop: 8,
  },
});

export default MyComponent;
