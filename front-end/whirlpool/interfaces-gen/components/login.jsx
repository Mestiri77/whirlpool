import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const Login = () => {
  return (
    <View style={[styles.login, styles.loginBg]}>
      <Image
        style={[styles.path3948Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/path3948.png")}
      />
      <Image
        style={[styles.vectorIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector.png")}
      />
      <Image
        style={[styles.vectorIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector.png")}
      />
      <View style={styles.loginPosition}>
        <View style={[styles.loginColor, styles.loginPosition]}>
          <Image
            style={styles.loginColorChild}
            contentFit="cover"
            source={require("../assets/group-3931.png")}
          />
          <View style={styles.loginColorItem} />
          <View style={styles.groupParent}>
            <View style={[styles.ellipseParent, styles.ellipseLayout]}>
              <Image
                style={[styles.ellipseParent, styles.ellipseLayout]}
                contentFit="cover"
                source={require("../assets/ellipse-3932.png")}
              />
              <View style={[styles.image101, styles.imageLayout]} />
            </View>
            <View style={[styles.ellipseGroup, styles.ellipseLayout]}>
              <Image
                style={[styles.ellipseParent, styles.ellipseLayout]}
                contentFit="cover"
                source={require("../assets/ellipse-3932.png")}
              />
              <View style={[styles.image102, styles.imageLayout]} />
            </View>
          </View>
          <View style={styles.loginColorInner}>
            <View>
              <View>
                <Text style={styles.email}>Email</Text>
                <View style={styles.enterYourEmailParent}>
                  <Text style={styles.enterYourEmail}>Enter your email</Text>
                  <View style={styles.frameChild} />
                </View>
              </View>
              <View style={styles.frameGroup}>
                <View>
                  <Text style={styles.email}>Password</Text>
                  <View style={styles.enterYourEmailParent}>
                    <View style={styles.enterYourPasswordParent}>
                      <Text style={styles.enterYourEmail}>
                        Enter your password
                      </Text>
                      <Image
                        style={styles.vectorIcon2}
                        contentFit="cover"
                        source={require("../assets/vector1.png")}
                      />
                    </View>
                    <View style={styles.frameChild} />
                  </View>
                </View>
                <View style={styles.groupContainer}>
                  <View style={styles.stayLoggedInParent}>
                    <Text
                      style={[styles.stayLoggedIn, styles.stayLoggedInTypo]}
                    >
                      Stay logged in?
                    </Text>
                    <View style={styles.groupInner} />
                  </View>
                  <Text style={styles.stayLoggedInTypo}>Forgot Password?</Text>
                </View>
              </View>
              <View style={styles.groupWrapper}>
                <View style={styles.rectangleLayout}>
                  <View
                    style={[styles.rectangleView, styles.rectangleLayout]}
                  />
                  <Text style={[styles.login1, styles.loginTypo]}>Login</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={[styles.login2, styles.loginTypo]}>Login</Text>
          <Text style={[styles.login2, styles.loginTypo]}>Login</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBg: {
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  loginPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  ellipseLayout: {
    width: 40,
    top: 0,
    height: 40,
    position: "absolute",
  },
  imageLayout: {
    height: 19,
    width: 19,
    top: 11,
    position: "absolute",
  },
  stayLoggedInTypo: {
    color: Color.colorDimgray,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.quicksandRegular,
    textAlign: "left",
  },
  rectangleLayout: {
    height: 50,
    width: 319,
  },
  loginTypo: {
    color: Color.colorWhite,
    fontFamily: FontFamily.quicksandBold,
    textAlign: "left",
    fontWeight: "700",
    position: "absolute",
  },
  path3948Icon: {
    height: "20.89%",
    width: "50.59%",
    top: "76.9%",
    right: "136.9%",
    bottom: "2.22%",
    left: "-87.49%",
  },
  vectorIcon: {
    height: "2.64%",
    width: "4.74%",
    top: "92.21%",
    right: "18.48%",
    bottom: "5.15%",
    left: "76.78%",
  },
  loginColorChild: {
    top: -95,
    left: -12,
    width: 480,
    height: 380,
    position: "absolute",
  },
  loginColorItem: {
    top: 259,
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    width: 422,
    height: 553,
    left: 0,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  ellipseParent: {
    left: 0,
  },
  image101: {
    left: 39,
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  image102: {
    left: 10,
  },
  ellipseGroup: {
    left: 71,
  },
  groupParent: {
    top: 701,
    left: 146,
    width: 111,
    display: "none",
    height: 40,
    position: "absolute",
  },
  email: {
    fontFamily: FontFamily.nunitoBold,
    color: Color.colorBlack,
    textAlign: "left",
    fontWeight: "700",
    fontSize: FontSize.size_lg,
  },
  enterYourEmail: {
    fontSize: FontSize.size_mini,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.quicksandRegular,
    textAlign: "left",
  },
  frameChild: {
    borderStyle: "solid",
    borderColor: Color.colorDarkgray,
    borderTopWidth: 1,
    height: 1,
    marginTop: 5,
    width: 320,
  },
  enterYourEmailParent: {
    marginTop: 20,
  },
  vectorIcon2: {
    width: 16,
    height: 10,
    marginLeft: 152,
  },
  enterYourPasswordParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  stayLoggedIn: {
    left: 22,
    top: 0,
    position: "absolute",
  },
  groupInner: {
    top: 1,
    borderRadius: 2,
    backgroundColor: "#eee",
    width: 15,
    height: 15,
    left: 0,
    position: "absolute",
  },
  stayLoggedInParent: {
    width: 107,
    height: 16,
  },
  groupContainer: {
    justifyContent: "space-between",
    marginTop: 18,
    flexDirection: "row",
    width: 320,
  },
  frameGroup: {
    marginTop: 36,
  },
  rectangleView: {
    borderRadius: 50,
    backgroundColor: "#fdc100",
    top: 0,
    position: "absolute",
    left: 0,
  },
  login1: {
    top: 13,
    left: 136,
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
    fontFamily: FontFamily.quicksandBold,
  },
  groupWrapper: {
    justifyContent: "center",
    marginTop: 36,
    alignItems: "center",
  },
  loginColorInner: {
    top: 307,
    left: 51,
    alignItems: "center",
    position: "absolute",
  },
  login2: {
    top: 112,
    left: 26,
    fontSize: FontSize.size_29xl,
  },
  loginColor: {
    borderRadius: Border.br_xl,
    shadowColor: "rgba(137, 84, 0, 0.13)",
    shadowOffset: {
      width: 28,
      height: 33,
    },
    shadowRadius: 62,
    elevation: 62,
    shadowOpacity: 1,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  login: {
    borderRadius: 30,
    flex: 1,
    height: 757,
    width: "100%",
    overflow: "hidden",
  },
});

export default Login;
