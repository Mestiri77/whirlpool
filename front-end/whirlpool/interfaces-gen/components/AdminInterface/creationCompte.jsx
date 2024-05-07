import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

const  MyComponent =() =>{
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/12f4aba34bd6fde10767af48f78f20f36401e32be5ece9adacbb2971412c1df1?",
          }}
          style={styles.image1}
        />
        <View style={styles.view3}>
          <View style={styles.view4}>
            <Text>Profile</Text>
          </View>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b1d8cf665d15efcc15b25657696bef6e0186ff9779ad614faaff0376f77f6963?",
            }}
            style={styles.image2}
          />
        </View>
      </View>
      <View style={styles.view5}>
        <View style={styles.view6}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2be2655cd832b3fd42b209acf251c3d2c309012d4785a46cbc051b16a20fd039?",
            }}
            style={styles.image3}
          />
          <View style={styles.view7}>
            <Text>Fazil</Text>
          </View>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/33f85355583ffe3121af81caa6b3798a30a9861efd083c0d447fb42078677f67?",
          }}
          style={styles.image4}
        />
      </View>
      <View style={styles.view8}>
        <View style={styles.view9}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2be2655cd832b3fd42b209acf251c3d2c309012d4785a46cbc051b16a20fd039?",
            }}
            style={styles.image5}
          />
          <View style={styles.view10}>
            <Text>Laghari</Text>
          </View>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/fb8046ee6500f45fb522e29f519a36dffdb9966af8ef62a565c3bb5d8101b4a0?",
          }}
          style={styles.image6}
        />
      </View>
      <View style={styles.view11}>
        <View style={styles.view12}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea8c3561ff18b427ac19fec293d2661f1adca8e61586a42fd2ed7ee4d30b5e51?",
            }}
            style={styles.image7}
          />
          <View style={styles.view13}>
            <Text>fazzzil72@gmail.com</Text>
          </View>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/fb8046ee6500f45fb522e29f519a36dffdb9966af8ef62a565c3bb5d8101b4a0?",
          }}
          style={styles.image8}
        />
      </View>
      <View style={styles.view14}>
        <View style={styles.view15}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6c408fe5426a312660e8b50f074f7b570002d2284b1c5adf021f8ee6221baeb1?",
            }}
            style={styles.image9}
          />
          <View style={styles.view16}>
            <Text>N° Telephone</Text>
          </View>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/fb8046ee6500f45fb522e29f519a36dffdb9966af8ef62a565c3bb5d8101b4a0?",
          }}
          style={styles.image10}
        />
      </View>
      <View style={styles.view17}>
        <View style={styles.view18}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/62c8f6a66ba658ee423070750c245c6789afa22881aef67d7f44e07765906e01?",
            }}
            style={styles.image11}
          />
          <View style={styles.view19}>
            <Text>Mot de passe </Text>
          </View>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/fb8046ee6500f45fb522e29f519a36dffdb9966af8ef62a565c3bb5d8101b4a0?",
          }}
          style={styles.image12}
        />
      </View>
      <View style={styles.view20}>
        <View style={styles.view21}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c368c9d6832b1584f37a5df07bdde5d7f93ad35b548c0848c63b211a309eb0b?",
            }}
            style={styles.image13}
          />
          <View style={styles.view22}>
            <Text>Role</Text>
          </View>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e95a0eebe5637b2c09b13a218c8a2cadb456b43dae512cacba44fd7fbf7870e?",
          }}
          style={styles.image14}
        />
      </View>
      <View style={styles.view23}>
        <View style={styles.view24}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6a0492280f35652134ea2aa1392ffda56619ffbdd9a782d440a5202082645e39?",
            }}
            style={styles.image15}
          />
          <View style={styles.view25}>
            <Text>Point de vente</Text>
          </View>
        </View>
        <Image
          resizeMode="auto"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e95a0eebe5637b2c09b13a218c8a2cadb456b43dae512cacba44fd7fbf7870e?",
          }}
          style={styles.image16}
        />
      </View>
      <View style={styles.view26}>
        <View style={styles.view27}>
          <Image
            resizeMode="auto"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/da8076d23922fa615fca929cc7214c13d50dc20da537c82b9735569a4e1e5fd1?",
            }}
            style={styles.image17}
          />
          <View style={styles.view28}>
            <Text>Create</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    backgroundColor: "#F9F9F9",
    display: "flex",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    fontSize: 18,
    color: "#000",
    fontWeight: "400",
    margin: "0 auto",
    padding: "39px 32px 72px",
  },
  view2: {
    display: "flex",
    alignItems: "start",
    gap: 20,
    fontSize: 20,
    fontWeight: "500",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  image1: {
    fill: "#000",
    position: "relative",
    width: 24,
    flexShrink: 0,
    aspectRatio: "1",
  },
  view3: {
    display: "flex",
    marginTop: 4,
    flexDirection: "column",
    alignItems: "center",
  },
  view4: { fontFamily: "Inter, sans-serif" },
  image2: {
    strokeWidth: 2,
    borderColor: "rgba(253, 193, 0, 1)",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: "50%",
    position: "relative",
    marginTop: 19,
    width: 137,
    aspectRatio: "1",
  },
  view5: {
    backgroundColor: "#D0D3D4",
    display: "flex",
    marginTop: 14,
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    whiteSpace: "nowrap",
    justifyContent: "space-between",
    padding: "15px 14px",
  },
  view6: { display: "flex", alignItems: "stretch", gap: 14 },
  image3: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view7: {
    fontFamily: "Inter, sans-serif",
    margin: "auto 0",
  },
  image4: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view8: {
    backgroundColor: "#D0D3D4",
    display: "flex",
    marginTop: 26,
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    whiteSpace: "nowrap",
    justifyContent: "space-between",
    padding: "15px 14px",
  },
  view9: { display: "flex", alignItems: "stretch", gap: 14 },
  image5: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view10: { fontFamily: "Inter, sans-serif" },
  image6: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view11: {
    backgroundColor: "#D0D3D4",
    display: "flex",
    marginTop: 29,
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    whiteSpace: "nowrap",
    justifyContent: "space-between",
    padding: "15px 14px",
  },
  view12: { display: "flex", alignItems: "stretch", gap: 14 },
  image7: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view13: {
    fontFamily: "Inter, sans-serif",
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "auto",
    margin: "auto 0",
  },
  image8: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view14: {
    backgroundColor: "#D0D3D4",
    display: "flex",
    marginTop: 22,
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    justifyContent: "space-between",
    padding: "15px 11px",
  },
  view15: { display: "flex", alignItems: "stretch", gap: 20 },
  image9: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view16: {
    fontFamily: "Inter, sans-serif",
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "auto",
  },
  image10: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view17: {
    backgroundColor: "#D0D3D4",
    display: "flex",
    marginTop: 24,
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    justifyContent: "space-between",
    padding: "15px 14px",
  },
  view18: { display: "flex", alignItems: "stretch", gap: 14 },
  image11: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view19: {
    fontFamily: "Inter, sans-serif",
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "auto",
  },
  image12: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view20: {
    backgroundColor: "#D0D3D4",
    display: "flex",
    marginTop: 29,
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    whiteSpace: "nowrap",
    justifyContent: "space-between",
    padding: "15px 14px",
  },
  view21: { display: "flex", alignItems: "stretch", gap: 14 },
  image13: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view22: {
    fontFamily: "Inter, sans-serif",
    margin: "auto 0",
  },
  image14: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view23: {
    backgroundColor: "#D0D3D4",
    display: "flex",
    marginTop: 27,
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    justifyContent: "space-between",
    padding: "15px 14px",
  },
  view24: { display: "flex", alignItems: "stretch", gap: 14 },
  image15: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view25: {
    fontFamily: "Inter, sans-serif",
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "auto",
    margin: "auto 0",
  },
  image16: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view26: {
    borderRadius: 5,
    backgroundColor: "#FDC100",
    display: "flex",
    marginTop: 37,
    width: "100%",
    alignItems: "center",
    color: "#FFF",
    fontWeight: "500",
    whiteSpace: "nowrap",
    justifyContent: "center",
    padding: "15px 60px",
  },
  view27: { display: "flex", alignItems: "stretch", gap: 10 },
  image17: { position: "relative", width: 24, flexShrink: 0, aspectRatio: "1" },
  view28: {
    fontFamily: "Inter, sans-serif",
    margin: "auto 0",
  },
});
export default MyComponent;

