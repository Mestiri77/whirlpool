import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const InterfacesAdmin = () => {
  return (
    <View style={styles.interfacesAdmin}>
      <Image
        style={[styles.path3948Icon, styles.groupIconLayout]}
        contentFit="cover"
        source={require("../assets/path3948.png")}
      />
      <View style={styles.parent}>
        <Text style={styles.text}>Recent Activities</Text>
        <View style={styles.ellipseParent}>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../assets/ellipse-92.png")}
          />
          <Text style={styles.youHaveChecked}>{`Consulteation des 
rapports`}</Text>
          <Image
            style={styles.frameItem}
            contentFit="cover"
            source={require("../assets/group-33537.png")}
          />
        </View>
        <Image
          style={[styles.groupIcon, styles.groupIconLayout]}
          contentFit="cover"
          source={require("../assets/group.png")}
        />
      </View>
      <View
        style={[
          styles.crationDarticlesWrapper,
          styles.interfacesAdminItemShadowBox,
        ]}
      >
        <Text style={[styles.crationDarticles, styles.crationClr]}>{`Création 
d’articles`}</Text>
      </View>
      <Image
        style={[styles.interfacesAdminChild, styles.groupIconLayout]}
        contentFit="cover"
        source={require("../assets/group-33587.png")}
      />
      <View
        style={[styles.interfacesAdminInner, styles.mobinaSadatParentLayout]}
      >
        <View style={[styles.mobinaSadatParent, styles.text1Position]}>
          <Text style={[styles.mobinaSadat, styles.text1Typo]}>Admin</Text>
          <Text style={[styles.text1, styles.text1Typo]}>
            <Text style={styles.hi}>{`Hi `}</Text>
            <Text style={styles.text2}>{`👋 `}</Text>
            <Text style={styles.hi}>,</Text>
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.interfacesAdminItem,
          styles.interfacesAdminItemShadowBox,
        ]}
      />
      <Text
        style={[styles.consulteationDesRapports, styles.crationClr]}
      >{`Consulteation
des 
rapports`}</Text>
      <Image
        style={[styles.groupIcon1, styles.groupIconLayout]}
        contentFit="cover"
        source={require("../assets/group1.png")}
      />
      <View style={[styles.crationDeCompteWrapper, styles.frameViewShadowBox]}>
        <Text
          style={[styles.crationDarticles, styles.crationClr]}
        >{`Création de 
compte`}</Text>
      </View>
      <Image
        style={styles.userProfileSignIconFrontS}
        contentFit="cover"
        source={require("../assets/userprofilesigniconfrontsidewithwhitebackgroundremovebgpreview-1.png")}
      />
      <View style={[styles.frameView, styles.frameViewShadowBox]} />
      <Image
        style={styles.dShopIllustrationFreePng1Icon}
        contentFit="cover"
        source={require("../assets/3dshopillustrationfreepng-1.png")}
      />
      <Text
        style={[styles.crationDePoint, styles.text1Typo]}
      >{`Création de point de 
vente`}</Text>
      <Image
        style={styles.whirlpoolCorporation8986logoIcon}
        contentFit="cover"
        source={require("../assets/whirlpoolcorporation8986logowik-1.png")}
      />
      <Image
        style={[styles.iconlycurvednotification, styles.groupIconLayout]}
        contentFit="cover"
        source={require("../assets/iconlycurvednotification.png")}
      />
      <Image
        style={styles.ellipseIcon}
        contentFit="cover"
        source={require("../assets/ellipse-68.png")}
      />
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <View
          style={[styles.iconsaxbrokenhome2, styles.icons8LogOut322Layout]}
        />
        <Text style={[styles.home, styles.homeTypo]}>Home</Text>
        <Text style={[styles.logOut, styles.homeTypo]}>Log out</Text>
        <Image
          style={[styles.vectorIcon, styles.groupIconLayout]}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
        <Image
          style={[styles.icons8LogOut322, styles.icons8LogOut322Layout]}
          contentFit="cover"
          source={require("../assets/icons8logout32-2.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  interfacesAdminItemShadowBox: {
    height: 133,
    shadowOpacity: 1,
    elevation: 16,
    shadowRadius: 16,
    shadowOffset: {
      width: -0.5,
      height: 2,
    },
    shadowColor: "rgba(79, 79, 79, 0.16)",
    top: 279,
    borderRadius: Border.br_3xs,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  crationClr: {
    color: Color.colorGray,
    fontSize: FontSize.size_base,
  },
  mobinaSadatParentLayout: {
    height: 22,
    width: 98,
    position: "absolute",
  },
  text1Position: {
    marginLeft: -49,
    top: 0,
    left: "50%",
  },
  text1Typo: {
    fontFamily: FontFamily.nunitoBold,
    textAlign: "left",
    fontWeight: "700",
    position: "absolute",
  },
  frameViewShadowBox: {
    top: 123,
    height: 133,
    shadowOpacity: 1,
    elevation: 16,
    shadowRadius: 16,
    shadowOffset: {
      width: -0.5,
      height: 2,
    },
    shadowColor: "rgba(79, 79, 79, 0.16)",
    borderRadius: Border.br_3xs,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  groupChildLayout: {
    height: 87,
    width: 428,
    position: "absolute",
  },
  icons8LogOut322Layout: {
    height: 24,
    width: 24,
    position: "absolute",
  },
  homeTypo: {
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
    lineHeight: 17,
    fontSize: FontSize.size_3xs,
    top: 52,
    color: Color.colorWhite,
    position: "absolute",
  },
  path3948Icon: {
    height: "20.88%",
    width: "50.61%",
    top: "76.89%",
    right: "136.89%",
    bottom: "2.23%",
    left: "-87.5%",
  },
  text: {
    marginLeft: -156,
    fontFamily: FontFamily.openSansBold,
    textAlign: "left",
    fontWeight: "700",
    color: Color.colorDarkslategray,
    fontSize: FontSize.size_sm,
    top: 0,
    left: "50%",
    position: "absolute",
  },
  frameChild: {
    top: 20,
    width: 64,
    height: 64,
    left: 16,
    position: "absolute",
  },
  youHaveChecked: {
    marginLeft: -67,
    width: 176,
    height: 51,
    color: Color.colorWhite,
    fontFamily: FontFamily.nunitoExtraBold,
    fontWeight: "800",
    fontSize: FontSize.size_base,
    top: 25,
    textAlign: "left",
    left: "50%",
    position: "absolute",
  },
  frameItem: {
    top: 41,
    left: 265,
    width: 30,
    height: 30,
    position: "absolute",
  },
  ellipseParent: {
    top: 35,
    backgroundColor: "#ffcc30",
    height: 104,
    borderRadius: Border.br_3xs,
    left: 0,
    width: 312,
    position: "absolute",
    overflow: "hidden",
  },
  groupIcon: {
    height: "38.85%",
    width: "14.1%",
    top: "41.73%",
    right: "78.85%",
    bottom: "19.42%",
    left: "7.05%",
  },
  parent: {
    marginLeft: -157,
    top: 444,
    height: 139,
    width: 312,
    left: "50%",
    position: "absolute",
  },
  crationDarticles: {
    top: 24,
    fontFamily: FontFamily.nunitoExtraBold,
    fontWeight: "800",
    color: Color.colorGray,
    textAlign: "left",
    position: "absolute",
    left: 16,
  },
  crationDarticlesWrapper: {
    left: 25,
    width: 143,
  },
  interfacesAdminChild: {
    height: "7.98%",
    width: "13.53%",
    top: "49.85%",
    right: "80.86%",
    bottom: "42.17%",
    left: "5.61%",
  },
  mobinaSadat: {
    marginLeft: 6,
    color: Color.colorDarkslategray,
    top: 0,
    fontFamily: FontFamily.nunitoBold,
    fontSize: FontSize.size_sm,
    left: "50%",
  },
  hi: {
    fontSize: FontSize.size_base,
  },
  text2: {
    fontSize: FontSize.size_sm,
  },
  text1: {
    color: "#ffce38",
    marginLeft: -49,
    top: 0,
    left: "50%",
  },
  mobinaSadatParent: {
    height: 22,
    width: 98,
    position: "absolute",
  },
  interfacesAdminInner: {
    marginLeft: -47,
    top: 84,
    left: "50%",
  },
  interfacesAdminItem: {
    left: 184,
    width: 138,
  },
  consulteationDesRapports: {
    top: 303,
    left: 200,
    width: 107,
    fontFamily: FontFamily.nunitoExtraBold,
    fontWeight: "800",
    color: Color.colorGray,
    textAlign: "left",
    position: "absolute",
  },
  groupIcon1: {
    height: "14.44%",
    width: "18.89%",
    top: "44.53%",
    right: "7.31%",
    bottom: "41.03%",
    left: "73.81%",
  },
  crationDeCompteWrapper: {
    left: 20,
    width: 143,
  },
  userProfileSignIconFrontS: {
    marginLeft: -173,
    top: 186,
    width: 90,
    height: 82,
    left: "50%",
    position: "absolute",
  },
  frameView: {
    left: 179,
    width: 138,
  },
  dShopIllustrationFreePng1Icon: {
    top: 185,
    left: 257,
    width: 78,
    height: 83,
    position: "absolute",
  },
  crationDePoint: {
    top: 147,
    left: 195,
    width: 84,
    color: Color.colorGray,
    fontSize: FontSize.size_base,
  },
  whirlpoolCorporation8986logoIcon: {
    top: 9,
    left: 5,
    width: 130,
    height: 63,
    position: "absolute",
  },
  iconlycurvednotification: {
    height: "3.3%",
    width: "6.67%",
    top: "3.44%",
    right: "5.56%",
    bottom: "93.26%",
    left: "87.78%",
  },
  ellipseIcon: {
    left: 330,
    width: 6,
    height: 6,
    top: 26,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorBlack,
    left: 0,
    width: 428,
    top: 0,
  },
  iconsaxbrokenhome2: {
    left: 100,
    top: 25,
    width: 24,
    overflow: "hidden",
  },
  home: {
    left: 320,
  },
  logOut: {
    left: 65,
  },
  vectorIcon: {
    height: "22.99%",
    width: "4.67%",
    top: "32.18%",
    right: "19.63%",
    bottom: "44.83%",
    left: "75.7%",
  },
  icons8LogOut322: {
    left: 71,
    top: 26,
  },
  rectangleParent: {
    top: 640,
    left: -30,
  },
  interfacesAdmin: {
    borderRadius: Border.br_11xl,
    flex: 1,
    width: "100%",
    height: 727,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
});

export default InterfacesAdmin;
