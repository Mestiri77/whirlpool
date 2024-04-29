import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const CreationDeCompte = () => {
  return (
    <View style={styles.creationDeCompte}>
      <Text style={styles.profile}>Profile</Text>
      <Image
        style={[
          styles.iconsaxbrokenarrowleft,
          styles.iconsaxbrokenarrowleftLayout,
        ]}
        contentFit="cover"
        source={require("../assets/iconsaxbrokenarrowleft.png")}
      />
      <Image
        style={styles.creationDeCompteChild}
        contentFit="cover"
        source={require("../assets/ellipse-36.png")}
      />
      <Image
        style={styles.creationDeCompteItem}
        contentFit="cover"
        source={require("../assets/ellipse-37.png")}
      />
      <Image
        style={styles.creationDeCompteInner}
        contentFit="cover"
        source={require("../assets/ellipse-50.png")}
      />
      <Image
        style={styles.iconsaxlinearaddsquare}
        contentFit="cover"
        source={require("../assets/iconsaxlinearaddsquare.png")}
      />
      <View style={[styles.rectangleView, styles.creationChildLayout]} />
      <View
        style={[styles.creationDeCompteChild1, styles.creationChildLayout]}
      />
      <View
        style={[styles.creationDeCompteChild2, styles.creationChildLayout]}
      />
      <View
        style={[styles.creationDeCompteChild3, styles.creationChildLayout]}
      />
      <View
        style={[styles.creationDeCompteChild4, styles.creationChildLayout]}
      />
      <Text style={[styles.fazil, styles.roleTypo]}>Fazil</Text>
      <Text style={[styles.fazzzil72gmailcom, styles.nTelephoneTypo]}>
        fazzzil72@gmail.com
      </Text>
      <Text
        style={[styles.motDePasse, styles.createTypo]}
      >{`Mot de passe `}</Text>
      <Text style={[styles.role, styles.roleTypo]}>Role</Text>
      <Text style={[styles.create, styles.createTypo]}>Create</Text>
      <Image
        style={[styles.iconsaxlinearuseradd, styles.iconsaxlineareditPosition]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearuseradd.png")}
      />
      <Image
        style={[styles.iconsaxlinearlock, styles.iconsaxlinearlockPosition]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearlock.png")}
      />
      <Image
        style={[styles.iconsaxlineartask, styles.iconsaxlineartaskPosition]}
        contentFit="cover"
        source={require("../assets/iconsaxlineartask.png")}
      />
      <Image
        style={[styles.iconsaxlinearedit, styles.iconsaxlineareditPosition]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearedit.png")}
      />
      <View
        style={[styles.creationDeCompteChild5, styles.creationChildLayout]}
      />
      <Text style={[styles.laghari, styles.roleTypo]}>Laghari</Text>
      <Image
        style={[
          styles.iconsaxlinearuseradd1,
          styles.iconsaxlinearedit1Position,
        ]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearuseradd.png")}
      />
      <Image
        style={[styles.iconsaxlinearedit1, styles.iconsaxlinearedit1Position]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearedit.png")}
      />
      <Image
        style={[styles.iconsaxlinearedit2, styles.icons8AtSign251Position]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearedit.png")}
      />
      <Image
        style={[styles.iconsaxlinearedit3, styles.iconsaxlinearlockPosition]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearedit.png")}
      />
      <Image
        style={[
          styles.iconsaxlineararrowdown2,
          styles.iconsaxlineartaskPosition,
        ]}
        contentFit="cover"
        source={require("../assets/iconsaxlineararrowdown2.png")}
      />
      <View
        style={[styles.creationDeCompteChild6, styles.creationChildLayout]}
      />
      <Text style={[styles.pointDeVente, styles.createTypo]}>
        Point de vente
      </Text>
      <Image
        style={[
          styles.iconsaxlineararrowdown21,
          styles.icons8Store5021Position,
        ]}
        contentFit="cover"
        source={require("../assets/iconsaxlineararrowdown2.png")}
      />
      <Image
        style={[
          styles.iconsaxlinearlogoutcurve,
          styles.iconsaxbrokenarrowleftLayout,
        ]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearlogoutcurve.png")}
      />
      <Image
        style={[styles.icons8AtSign251, styles.icons8AtSign251Position]}
        contentFit="cover"
        source={require("../assets/icons8atsign25-1.png")}
      />
      <View
        style={[styles.creationDeCompteChild7, styles.creationChildLayout]}
      />
      <Text style={[styles.nTelephone, styles.nTelephoneTypo]}>
        N° Telephone
      </Text>
      <Image
        style={[styles.iconsaxlinearedit4, styles.icons8Phone301Position]}
        contentFit="cover"
        source={require("../assets/iconsaxlinearedit.png")}
      />
      <Image
        style={[styles.icons8Store5021, styles.icons8Store5021Position]}
        contentFit="cover"
        source={require("../assets/icons8store50-2-1.png")}
      />
      <Image
        style={[styles.icons8Phone301, styles.icons8Phone301Position]}
        contentFit="cover"
        source={require("../assets/icons8phone30-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconsaxbrokenarrowleftLayout: {
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  creationChildLayout: {
    height: 54,
    width: 364,
    left: 32,
    position: "absolute",
  },
  roleTypo: {
    width: 113,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    lineHeight: 19,
    fontSize: FontSize.size_lg,
    left: 84,
    opacity: 0.4,
    color: Color.colorBlack,
    position: "absolute",
  },
  nTelephoneTypo: {
    width: 179,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    lineHeight: 19,
    fontSize: FontSize.size_lg,
    left: 84,
    opacity: 0.4,
    color: Color.colorBlack,
    position: "absolute",
  },
  createTypo: {
    textAlign: "left",
    lineHeight: 19,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  iconsaxlineareditPosition: {
    top: 243,
    opacity: 0.4,
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  iconsaxlinearlockPosition: {
    top: 560,
    opacity: 0.4,
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  iconsaxlineartaskPosition: {
    top: 643,
    opacity: 0.4,
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  iconsaxlinearedit1Position: {
    top: 323,
    opacity: 0.4,
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  icons8AtSign251Position: {
    top: 406,
    height: 24,
    width: 24,
    position: "absolute",
  },
  icons8Store5021Position: {
    top: 724,
    height: 24,
    width: 24,
    position: "absolute",
  },
  icons8Phone301Position: {
    top: 482,
    height: 24,
    width: 24,
    position: "absolute",
  },
  profile: {
    top: 37,
    left: 185,
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    position: "absolute",
  },
  iconsaxbrokenarrowleft: {
    top: 39,
    left: 41,
  },
  creationDeCompteChild: {
    top: 82,
    left: 153,
    width: 127,
    height: 127,
    position: "absolute",
  },
  creationDeCompteItem: {
    top: 79,
    left: 150,
    width: 133,
    height: 133,
    position: "absolute",
  },
  creationDeCompteInner: {
    top: 176,
    left: 246,
    width: 33,
    height: 33,
    position: "absolute",
  },
  iconsaxlinearaddsquare: {
    top: 183,
    left: 253,
    width: 20,
    height: 20,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleView: {
    top: 228,
    opacity: 0.4,
    backgroundColor: Color.colorLightgray,
    height: 54,
    width: 364,
    left: 32,
  },
  creationDeCompteChild1: {
    top: 391,
    opacity: 0.4,
    backgroundColor: Color.colorLightgray,
    height: 54,
    width: 364,
    left: 32,
  },
  creationDeCompteChild2: {
    top: 545,
    opacity: 0.4,
    backgroundColor: Color.colorLightgray,
    height: 54,
    width: 364,
    left: 32,
  },
  creationDeCompteChild3: {
    top: 628,
    opacity: 0.4,
    backgroundColor: Color.colorLightgray,
    height: 54,
    width: 364,
    left: 32,
  },
  creationDeCompteChild4: {
    top: 800,
    borderRadius: 5,
    backgroundColor: Color.colorGold_100,
    height: 54,
    width: 364,
    left: 32,
  },
  fazil: {
    top: 245,
  },
  fazzzil72gmailcom: {
    top: 408,
  },
  motDePasse: {
    top: 563,
    width: 152,
    height: 41,
    fontFamily: FontFamily.interRegular,
    left: 84,
    textAlign: "left",
    lineHeight: 19,
    fontSize: FontSize.size_lg,
    opacity: 0.4,
    color: Color.colorBlack,
  },
  role: {
    top: 645,
  },
  create: {
    top: 818,
    left: 191,
    color: Color.colorWhite,
    width: 62,
    textAlign: "left",
    lineHeight: 19,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  iconsaxlinearuseradd: {
    left: 46,
  },
  iconsaxlinearlock: {
    left: 46,
  },
  iconsaxlineartask: {
    left: 46,
  },
  iconsaxlinearedit: {
    left: 358,
  },
  creationDeCompteChild5: {
    top: 308,
    opacity: 0.4,
    backgroundColor: Color.colorLightgray,
    height: 54,
    width: 364,
    left: 32,
  },
  laghari: {
    top: 325,
  },
  iconsaxlinearuseradd1: {
    left: 46,
  },
  iconsaxlinearedit1: {
    left: 358,
  },
  iconsaxlinearedit2: {
    left: 358,
    opacity: 0.4,
    overflow: "hidden",
  },
  iconsaxlinearedit3: {
    left: 358,
  },
  iconsaxlineararrowdown2: {
    left: 358,
  },
  creationDeCompteChild6: {
    top: 709,
    opacity: 0.4,
    backgroundColor: Color.colorLightgray,
    height: 54,
    width: 364,
    left: 32,
  },
  pointDeVente: {
    top: 726,
    width: 125,
    fontFamily: FontFamily.interRegular,
    left: 84,
    textAlign: "left",
    lineHeight: 19,
    fontSize: FontSize.size_lg,
    opacity: 0.4,
    color: Color.colorBlack,
  },
  iconsaxlineararrowdown21: {
    left: 358,
    opacity: 0.4,
    overflow: "hidden",
  },
  iconsaxlinearlogoutcurve: {
    top: 815,
    left: 157,
  },
  icons8AtSign251: {
    left: 46,
  },
  creationDeCompteChild7: {
    top: 467,
    opacity: 0.4,
    backgroundColor: Color.colorLightgray,
    height: 54,
    width: 364,
    left: 32,
  },
  nTelephone: {
    top: 484,
  },
  iconsaxlinearedit4: {
    left: 358,
    opacity: 0.4,
    overflow: "hidden",
  },
  icons8Store5021: {
    left: 46,
  },
  icons8Phone301: {
    left: 40,
    opacity: 0.3,
  },
  creationDeCompte: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    width: "100%",
    height: 926,
    overflow: "hidden",
  },
});

export default CreationDeCompte;
